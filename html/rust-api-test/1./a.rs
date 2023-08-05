Certainly! Here are some examples of Rust libraries for HTTP servers that support async/await syntax:

- **tiny-http**: Here's an example of how to use tiny-http:

```rust
use std::io::Read;
use tiny_http::{Method, Request, Response, Server};

async fn main() {
	let server = Server::http("0.0.0.0:8000").unwrap();
	for request in server.incoming_requests() {
		match request.method() {
			&Method::Get => {
				let mut content = String::new();
				request.as_reader().read_to_string(&mut content).unwrap();
				let response = Response::from_string(content);
				request.respond(response).unwrap();
			}
			_ => {
				request.respond(Response::from_string("Unsupported method")).unwrap();
			}
		}
	}
}
```

- **tide**: Here's an example of how to use tide:

```rust
use tide::{Request, Response};

async fn hello_world(req: Request<()>) -> tide::Result {
	Ok(Response::new(200).body_string("Hello, world!"))
}

#[async_std::main]
async fn main() -> tide::Result<()> {
	let mut app = tide::new();
	app.at("/").get(hello_world);
	app.listen("127.0.0.1:8080").await?;
	Ok(())
}
```

- **hyper**: Here's an example of how to use hyper:

```rust
use hyper::{Body, Request, Response, Server};
use hyper::service::{make_service_fn, service_fn};

async fn hello_world(_req: Request<Body>) -> Result<Response<Body>, hyper::Error> {
	Ok(Response::new(Body::from("Hello, World!")))
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
	let addr = ([127, 0, 0, 1], 3000).into();

	let make_svc = make_service_fn(|_conn| async {
		Ok::<_, hyper::Error>(service_fn(hello_world))
	});

	let server = Server::bind(&addr).serve(make_svc);

	println!("Listening on http://{}", addr);

	server.await?;

	Ok(())
}
```

I hope this helps!
