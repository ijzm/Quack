Quack.MainMenu = function (game) {};

var music;
var playbutton;
var levelselectorbutton;
var helpbutton;
var creditsbutton;
var menubutton;
var credits;
var help;

Quack.MainMenu.prototype = {

	preload: function () {
	},

	create: function () {	
		
		music = this.add.audio('menumusic');
		music.loopFull();
		
		this.game.add.sprite(0, 0, 'bg');
		
		this.camera.y = 0;
		this.camera.x = 0;
		
		playbutton = this.add.button(this.game.width/2,this.game.height/2, "playbutton", this.playTheGame,this);
		playbutton.anchor.x = 0.5;
		playbutton.anchor.y = 0.5;			
	},

		update: function () {
	},
		playTheGame: function(){
			console.log("PLAY");
			this.state.start("Game");
	},

};
