#!/usr/bin/env -S deno run --allow-net --allow-env

import { FastCGIServer } from "https://deno.land/x/fcgi/mod.ts";



let server = Deno.listen({ port: 8080 });

for await (let conn of server) {
	handleConn(conn);
}

async function handleConn(conn) {
	let httpConn = Deno.serveHttp(conn);

	for await (let requestEvent of httpConn) {
		let url = new URL(requestEvent.request.url);
		let path = url.pathname;

		console.log("Received request with path:", path);

		let targetPort = 8082; // Default to 8082

		if (path.startsWith("/path1")) {
			targetPort = 8081;
		}

		let targetConn = await Deno.connect({ port: targetPort });

		// Forward the request headers to the target connection
		let headers = new Headers(requestEvent.request.headers);
		headers.set("x-forwarded-for", requestEvent.request.headers.get("x-forwarded-for") || requestEvent.request.conn.remoteAddr.hostname);

		let request = new Request(requestEvent.request.url, {
			method: requestEvent.request.method,
			headers: headers,
		});

		// Forward the request to the target connection
		await targetConn.write(new TextEncoder().encode(request.toString()));

		// Handle the response from the target connection
		let response = await fetch(request);

		// Forward the response to the client
		await requestEvent.respondWith(new Response(response.body, {
			status: response.status,
			headers: response.headers,
		}));

		targetConn.close();
	}
}
