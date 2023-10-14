export default function Element_prototype_parents() {
	return Array.from(function*(v) {
		for (; v ; v = v.parentElement) {
			yield v;
		}
	}(this));
};
