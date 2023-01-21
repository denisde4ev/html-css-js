
// src: https://github.com/DanielHerr/Async-Await/blob/gh-pages/asyncawait.js
function FG2A(generatorsource) {
	return new Proxy(generatorsource, {
		apply(target, that, inputs) {
			return new Promise(function(resolve, reject) {
				let generator = Reflect.apply(target, that, inputs)
				function proceed(type = "next" || "throw", input) {
					try {
						let result
						if(type == "throw") {
							result = generator.throw(input)
						} else {
							result = generator.next(input)
						}
						if(result.done) {
							resolve(result.value)
						} else {
							Promise.resolve(result.value).then(function(result) {
								proceed("next", result)
							}).catch(function(error) {
								proceed("throw", error)
							})
						}
					} catch(error) {
						reject(error)
					}
				}
				proceed("next");
			});
		},
		get(target, key) {
			if(key == "toString") {
				return function() { return generatorsource.toString().replace("function*", "async function"); };
			} else {
				return Reflect.get(target, key);
			}
		}
	});
}
