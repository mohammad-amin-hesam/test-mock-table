export function trunc(s: string, n: number) {
	if (s) {
		return s.length > n ? s.substr(0, n - 1) + "..." : s;
	} else {
		return "";
	}
}
