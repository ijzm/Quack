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
		
		this.game.add.sprite(0, 0, 'bgmenu');
		
		this.camera.y = 0;
		this.camera.x = 0;
		
		playbutton = this.add.button(780,350, "playbutton", this.playTheGame,this);
		playbutton.anchor.x = 1;
		playbutton.anchor.y = 1;			
	},

		update: function () {
	},
		playTheGame: function(){
			console.log("PLAY");
			this.state.start("Game");
	},

};
