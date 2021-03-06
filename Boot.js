var Quack = {}; //declare the object that will hold all game states
var clicks = 0; // basic global variables
var playmusic = true; //global toggle to control music play across states
var playsound = true;
var desktop;

var score = 0;
var lastscore = 0;
var level = 0;

var coop = false;


/*if(! localStorage.getItem('myItemKey')){
	level = 0;
	localStorage.setItem('myItemKey', level.toString());
} else {
	level = localStorage.getItem('myItemKey');
}*/
Quack.Boot = function (game) { //declare the boot state

};

Quack.Boot.prototype = {

	preload: function () {
		//load assets for the loading screen
		//this.load.image('preloaderBackground', 'assets/preloadbck.png');
		//this.load.image('loadingbar', 'assets/loadingbar.png');

	},

	create: function () {

		this.state.start('Preloader'); //start the Preloader state
		if (this.game.device.desktop) {
			desktop = 1;
		} else {
			desktop = 0;
			// aspect ratio with letterboxing if needed
			this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
			this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVertically = true;
		}

	}
};