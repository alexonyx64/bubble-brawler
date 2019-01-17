var xc, yc, bubble, n, namei, title;
// Antoine, Bjork, Christine, Dalu, Evua, Faramir, Gorax, Helga, Irex, Jotun, Kalus, Lilian, Mulan, Nektann, Osmond, Philip, Quinticious, Radagast, Slivel, Tarix, Uxar, Vezon, William, Xatha, Yeet, Zaktan
// Angry, Brutal, Careless, Devilish, Eloquent, Fiery, Great, Hungry, Icy, Jolly, Keen, Lively, Magnificent, Nasty, Overbearing, Pitiful, Quixotic, Radiant, Sly, Terrible, Ultimate, Very Good at Fighting, Xenodochial, Yoten, Zealous

function setup() {
	createCanvas(800, 700);
	background(0)
	xc = width/2;
	yc = height/2;
	n = 0;
	bubble = [];
	namei = ['Antoine', 'Bjork', 'Christine', 'Dalu', 'Evua', 'Faramir', 'Gorax', 'Helga', 'Irex', 'Jotun', 'Kalus', 'Lilian', 'Mulan', 'Nektann', 'Osmond', 'Philip', 'Quinticious', 'Radagast', 'Slivel', 'Tarix', 'Uxar', 'Vezon', 'William', 'Xatha', 'Yeet', 'Zaktan'];
	title = ['Angry', 'Brutal', 'Careless', 'Devilish', 'Eloquent', 'Fiery', 'Great', 'Hungry', 'Icy', 'Jolly', 'Keen', 'Lively', 'Magnificent', 'Nasty', 'Overbearing', 'Pitiful', 'Quixotic', 'Radiant', 'Sly', 'Terrible', 'Ultimate', 'Very Good at Fighting', 'Xenodochial', 'Yoten', 'Zealous'];
	ellipseMode(RADIUS);
	angleMode(DEGREES);
}

function draw() {
	background(0);
	for (var i = 0; i < n; i++) {
		if (bubble[i].spawn === 1) {
			bubble[i].display();
			bubble[i].move();
			bubble[i].hitcheck(i);
			bubble[i].deathcheck(i);
		}
	}
}

function mousePressed() {
	bubble[n] = new newBubble();
	print(bubble[n].tag+' has entered the arena!');
	n++;
}

function newBubble()  {
	this.x = mouseX;
	this.y = mouseY;
	this.xstep = random(-3,3);
	this.ystep = random(-3,3);
	this.radius = random(5, 100);
	this.r = random(255);
	this.g = random(255);
	this.b = random(255);
	this.hp = random(10, 1000);
	this.mh = this.hp;
	this.hb = map(this.hp, 0, this.mh, 0, 359);
	this.pow = random(1, 10);
	this.spawn = 1;
	this.n = random(namei);
	this.t = random(title);
	this.tag = this.n+' the '+this.t;
	this.attackertag = undefined;
	
	this.display = function() {
		strokeWeight(5);
		stroke(this.r, this.g, this.b);
		fill(0);
		noFill();
		ellipse(this.x, this.y, this.radius, this.radius);
		stroke(255, 50, 50);
		ellipse(this.x, this.y, this.radius-5, this.radius-5);
		stroke(0, 255, 100);
		this.hb = map(this.hp, 0, this.mh, 0, 359);
		arc(this.x, this.y, this.radius-5, this.radius-5, 0, this.hb);
	}
	
	this.move = function() {
		this.x = this.x+this.xstep;
		this.y = this.y+this.ystep;
	
		if (this.x < 0 || this.x > width) {
			this.xstep = this.xstep*(-1);
		}
	
		if (this.y < 0 || this.y > height) {
			this.ystep = this.ystep*(-1);
		}
	}
	
	this.hitcheck = function(I) {
		for(var j = 0; j < n; j++) {
			var ff = false;
			if (I === j) {
				ff = true;
			}
			if (ff === false) {
				if (bubble[j].spawn === 1) {
					if (dist(this.x, this.y, bubble[j].x, bubble[j].y) < this.radius+bubble[j].radius){
						this.hp = this.hp-bubble[j].pow;
						this.attackertag = bubble[j].tag;
					}
				}
			}
		}
	}
	
	this.deathcheck = function(I) {
		if (this.hp < 0) {
			this.spawn = 0;
			print(this.attackertag+' has slain '+this.tag+'!');
		}
	}
}
