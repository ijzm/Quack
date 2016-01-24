Quack.Preloader = function (game) {  //declare the Preloader function

	this.background = null;

	this.ready = false;
	
};

Quack.Preloader.prototype = {

	preload: function () {
		//Images
		this.load.image('playbutton', 'assets/playbutton.png');
		this.load.image('bg', 'assets/bg.png');
		this.load.image('redending', 'assets/redending.png');
		
		this.load.image('bullet', 'assets/bullet.png');
		
		this.load.image('sheep', 'assets/sheep.png');
		
		this.load.spritesheet('player', 'assets/player.png', 35, 35);
		//Music/Sounds
		this.load.audio('menumusic', 'assets/menumusic.ogg');
		//Tilemaps and Tiles
		this.load.tilemap('0', 'maps/0.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('1', 'maps/1.json', null, Phaser.Tilemap.TILED_JSON);
		
		this.load.image('tiles', 'assets/tiles.png');

		this.time.advancedTiming = true;
		
		
	},

		create: function () {
	},

		update: function () {

		//checking whether the music is ready to be played before proceeding to the Main Menu.
		if (this.cache.isSoundDecoded('menumusic') && this.ready == false){
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};