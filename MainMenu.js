Quack.MainMenu = function (game) {};

var music;
var playbutton;
var levelselectorbutton;
var helpbutton;
var creditsbutton;
var menubutton;
var credits;
var help;
var coopbutton;

Quack.MainMenu.prototype = {

	preload: function () {
	},

	create: function () {	
		
		music = this.add.audio('menumusic');
		music.loopFull();
		
		this.game.add.sprite(0, 0, 'bg');
		
		this.camera.y = 0;
		this.camera.x = 0;
		
		playbutton = this.add.button(60,this.game.height/2, "playbutton", this.playTheGame,this);
		playbutton.anchor.x = 0.5;
		playbutton.anchor.y = 0.5;		
		
		coopbutton = this.add.button(60,this.game.height/2 + 50, "playbutton", this.coop,this);
		coopbutton.anchor.x = 0.5;
		coopbutton.anchor.y = 0.5;		
	},

		update: function () {
	},
		playTheGame: function(){
			console.log("PLAY");
			this.state.start("Game");
	},
			coop: function(){
			console.log("PLAY 2p");
				coop = true;
			this.state.start("Game");
	},

};
