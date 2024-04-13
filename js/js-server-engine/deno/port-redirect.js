

// written by AI ( Phind V7 Model )
// https://www.phind.com/search?cache=w84954838ej67417ehq3pybu


const server = Deno.listen({ port: 8080 });

for await (const conn of server) {
	handle(conn);
}

async function handle(conn) {
	const targetConn = await Deno.connect({ port: 8081 });

	const buf = new Uint8Array(1024);

	// Forward data from the incoming connection to the target connection
	const handleIncoming = async () => {
		while (true) {
			try {
				const bytesRead = await conn.read(buf);
				if (bytesRead === null) {
					break;
				}
				const message = new TextDecoder().decode(buf.subarray(0, bytesRead));

				//console.log("Received message:", message);

				await targetConn.write(new TextEncoder().encode(message));
			} catch (err) {
				//console.error("Error forwarding data:", err);
				break;
			}
		}
	};

	// Forward data from the target connection to the incoming connection
	const handleOutgoing = async () => {
		while (true) {
			try {
				const bytesRead = await targetConn.read(buf);
				if (bytesRead === null) {
					break;
				}
				const message = new TextDecoder().decode(buf.subarray(0, bytesRead));

				//console.log("Received message from target:", message);

				await conn.write(new TextEncoder().encode(message));
			} catch (err) {
				//console.error("Error forwarding data:", err);
				break;
			}
		}
	};

	// Run both loops concurrently
	await Promise.all([handleIncoming(), handleOutgoing()]);

	targetConn.close();
	conn.close();
}
