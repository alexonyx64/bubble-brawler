//declare all global variables
var xc, yc;		//positional coordinates
var bubble, n;		//fighter object array
var namei, title, PA;		//kill feed
var regen;		//options bar HTML elements

function setup() {		//setup
	createCanvas(800, 700);		//setting up space
	background(0);
	xc = width/2;
	yc = height/2;
			//basic graphics setup
	ellipseMode(RADIUS);
	angleMode(DEGREES);
			//defining start values of important functional variables
	bubble = [];
	n = 0;
	regen = 0;
			//options bar HTML elements
	rgtoggle = createCheckbox('health regeneration', false);		//health regen toggle
	rgtoggle.position(0, height-rgtoggle.height);
	rgtoggle.changed(rgoption);
			//kill feed fighter tag construction arrays
	namei = ['Antoine', 'Bjork', 'Christine', 'Dalu', 'Evua', 'Faramir', 'Gorax', 'Helga', 'Irex', 'Jotun', 'Kalus', 'Lilian', 'Mulan', 'Nektann', 'Osmond', 'Philip', 'Quinticious', 'Radagast', 'Slivel', 'Tarix', 'Uxar', 'Vezon', 'William', 'Xatha', 'Yeet', 'Zaktan'];
	title = ['Angry', 'Brutal', 'Careless', 'Devilish', 'Eloquent', 'Fiery', 'Great', 'Hungry', 'Icy', 'Jolly', 'Keen', 'Lively', 'Magnificent', 'Nasty', 'Overbearing', 'Pitiful', 'Quixotic', 'Radiant', 'Sly', 'Terrible', 'Ultimate', 'Very Good at Fighting', 'Xenodochial', 'Youthful', 'Zealous'];
			//kill feed initial setup
	PA = 'Click!';
}

function draw() {		//draw function
	background(0);		//arena graphics
	killfeed();
	fill(0, 225, 100);
	rect(0, height-rgtoggle.height, width, rgtoggle.height);
	for (var i = 0; i < n; i++) {		//bubble graphics and interaction checks
		if (bubble[i].spawn === 1) {
			bubble[i].display();
			bubble[i].move();
			bubble[i].hitcheck(i);
			bubble[i].deathcheck(i);
			if (regen === 1) {
				if (bubble[i].hp < bubble[i].mh) {
					bubble[i].hp = bubble[i].hp+1;
				}
			}
		}
	}
}

function mousePressed() {		//bubble spawn function
	if (mouseY < height-rgtoggle.height) {
			bubble[n] = new newBubble();
			PA = bubble[n].tag+' has entered the arena!';		//kill feed notification
			n++;
	}
}

function killfeed() {		// kill feed graphics
	strokeWeight(5);
	stroke(255, 50, 50);
	fill(0);
	rect(0, 0, width, 40);
	textAlign(CENTER);
	textSize(30);
	fill(255);
	noStroke();
	text(PA, xc, 30);
}

function newBubble()  {		//bubble object
	this.x = mouseX;		//movement and graphics stats
	this.y = mouseY;
	this.xstep = random(-3,3);
	this.ystep = random(-3,3);
	this.radius = random(5, 100);
	this.r = random(255);
	this.g = random(255);
	this.b = random(255);
	
	this.hp = random(10, 1000);		// functional stats
	this.mh = this.hp;
	this.hb = map(this.hp, 0, this.mh, 0, 359);
	this.pow = random(1, 10);
	this.spawn = 1;
	
	this.n = random(namei);		//kill feed stats
	this.t = random(title);
	this.tag = this.n+' the '+this.t;
	this.attackertag = undefined;
	
	this.display = function() {		// graphics
		strokeWeight(5);
		stroke(this.r, this.g, this.b);
		fill(0);
		noFill();
		ellipse(this.x, this.y, this.radius, this.radius);		//outline
		stroke(255, 50, 50);
		ellipse(this.x, this.y, this.radius-5, this.radius-5);		//health bar
		stroke(0, 255, 100);
		this.hb = map(this.hp, 0, this.mh, 0, 359);
		arc(this.x, this.y, this.radius-5, this.radius-5, 0, this.hb);
	}
	
	this.move = function() {		//movement
		this.x = this.x+this.xstep;
		this.y = this.y+this.ystep;
	
		if (this.x < 0 || this.x > width) {
			this.xstep = this.xstep*(-1);
		}
	
		if (this.y < 0 || this.y > height) {
			this.ystep = this.ystep*(-1);
		}
	}
	
	this.hitcheck = function(I) {		//hitcheck function
		for(var j = 0; j < n; j++) {
			var ff = false;
			if (I === j) {		//friendly fire check; so bubbles don't damage themselves
				ff = true;
			}
			if (ff === false) {
				if (bubble[j].spawn === 1) {		//death check; so bubbles don't take damage from the ghosts of dead bubbles
					if (dist(this.x, this.y, bubble[j].x, bubble[j].y) < this.radius+bubble[j].radius){
						this.hp = this.hp-bubble[j].pow;
						this.attackertag = bubble[j].tag;		//attacker tracking function; for the kill feed
					}
				}
			}
		}
	}
	
	this.deathcheck = function(I) {		//death check and death event
		if (this.hp < 0) {
			this.spawn = 0;		//marks bubble as dead so they don't affect other bubbles
			PA = this.attackertag+' has slain '+this.tag+'!';		//kill feed notification
		}
	}
}

function rgoption() {		//health regen toggle
	if (this.checked()) {
		regen = 1;
	} else {
		regen = 0;
	}
}
