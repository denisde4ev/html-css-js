
function FG2A(It) {
apply(target, that, inputs) { // TODO this line
	return new Promise(function(resolve, reject) {
		let generator = Reflect.apply(target, that, inputs) // TODO this line
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
}
}
if (typeof module !== 'undefined') module.exports.FG2A = FG2A;
