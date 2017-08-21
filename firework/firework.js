var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.5;

var c = canvas.getContext('2d');

var colors = ["rgba(67, 196, 232,", "rgba(162, 232, 255,", "rgba(31, 175, 232,", "rgba(22, 180, 255,"];

// listener

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.5;

	init();
})

// initial position
function Particles(x, y, normalV) {
	this.x = x;
	this.y = y;
	this.normalV = normalV;
	this.angle = Math.random() * Math.PI * 2;
	this.alpha = 1;
	this.color = colors[Math.floor(Math.random() * 4)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
		c.fillStyle = this.color + this.alpha + ")";
		c.fill();
	}

	this.update = function() {
		this.y = this.y + this.normalV * Math.cos(this.angle);
		this.x = this.x + this.normalV * Math.sin(this.angle);
		this.alpha = this.alpha - (Math.random() * 0.05);
		this.draw();
	}

}

function Fire() {
	this.x = Math.random() * canvas.width;
	this.y = canvas.height - 10;
	this.gravity = 0.5;
	this.speed = Math.random() * 5 + 10;
	this.exploded = [];
	this.alpha = 1;
	this.done = false;
	this.color = colors[Math.floor(Math.random() * 4)];
	this.explosion = false;

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
		c.fillStyle = this.color + this.alpha + ")";
		c.fill();
	}

	this.update = function() {
		this.y = this.y - this.speed;
		this.speed = this.speed - this.gravity;
		this.alpha = this.alpha - 0.025;
		if (this.done == false && this.alpha <= 0) {
			//console.log("reach here")
			var normalV = Math.random() * 4 + 1;
			for (var i = 0; i<100; i++) {
				this.exploded.push(new Particles(this.x, this.y, normalV));
			}
			this.done = true;
		} else if (this.done == false && this.alpha > 0) {
			this.draw();
		} else if (this.done == true) {
			for (var j = 0; j<this.exploded.length; j++) {
				this.exploded[j].update();
			}
		}
	}
}

var fireWorks = [];

function init() {
	if (fireWorks.length > 20) {
		fireWorks = [];
	}
	fireWorks.push(new Fire());
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth, innerHeight);
	for (var i = 0; i < fireWorks.length; i++) {
		fireWorks[i].update();
	}
	if (Math.random() < 0.05) {
		init();
	}
}

init();
animate();