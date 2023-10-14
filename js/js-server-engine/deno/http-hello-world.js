#!/usr/bin/env -S deno run --allow-net --allow-env


const PORT = Deno.env.get('PORT') || '8080'
var SERVER = Deno.listen({ port: PORT });

console.log(`HTTP server is running on http://localhost:${PORT}/`);


// TODO: consider if its worth it to optimize, now it seems like for every group of requests will await untill all starts
// but idk for good alternative for `for await (` ... f*k async
for await (const conn of server) {
	const httpConn = Deno.serveHttp(conn);
	(async _ => {
		for await (const requestEvent of httpConn) {
			requestHandler(
				requestEvent.request,
				'deno-event',
				requestEvent
			).then(res =>
				requestEvent.respondWith(res)
			);
		}
	})();
}
//for await (const conn of server) {
//	const httpConn = Deno.serveHttp(conn);
//	(async _ => {
//		for await (const requestEvent of httpConn) {
//			requestHandler(
//				requestEvent.request,
//				'deno-event',
//				requestEvent
//			).then(res =>
//				requestEvent.respondWith(res)
//			);
//		}
//	})();
//}
//


async function requestHandler(req, type, denoEvent) {
	//console.log(req);
	var url = new URL(req.url);

	// req.headers.get("Accept") // todo: respect request's Accept header

	if (url.pathname === '/') {
		var name = url.searchParams.get('name');
		if (name) {
			return new Response(`Hi, ${name}!`);
		}
		return new Response('Hello, World!');
	}

	return new Response("Not Found", { status: 404 });
}
