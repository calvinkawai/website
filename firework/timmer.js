var myClock = setInterval(clock(), 1000);

function clock() {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();

	if (h < 12) {
		h = "0" + h;
	}

	if (m < 10) {
		m = "0" + m;
	}

	document.getElementById("clock").innerHTML = h + ":" + m;
}