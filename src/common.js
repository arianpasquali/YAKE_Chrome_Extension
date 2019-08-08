function loadOptions() {
	if ("undefined" != typeof localStorage) {
		document.getElementById("number").value = localStorage.getItem("number");
		document.getElementById("colorForeground").value = localStorage.getItem("foreground") || "#000000";
	}
}

function saveOptions() {
	if ("undefined" != typeof localStorage) {
		localStorage.setItem("number", document.getElementById("number").value);
		localStorage.setItem("foreground", document.getElementById("colorForeground").value);
	}
}
