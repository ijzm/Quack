Quack.Preloader = function (game) {  //declare the Preloader function

	this.background = null;

	this.ready = false;
	
};

Quack.Preloader.prototype = {

	preload: function () {
		//Images
		this.load.image('playbutton', 'assets/playbutton.png');
		this.load.image('bg', 'assets/bg.png');
		this.load.image('logo', 'assets/logo.png');
		this.load.image('redending', 'assets/redending.png');
		this.load.image('blueending', 'assets/blueending.png');
		
		this.load.image('bullet', 'assets/bullet.png');
		
		this.load.image('sheep', 'assets/sheep.png');
		
		this.load.spritesheet('player', 'assets/player.png', 33, 33);
		this.load.spritesheet('player2', 'assets/player2.png', 33, 33);
		//Music/Sounds
		this.load.audio('menumusic', 'assets/menumusic.mp3');
		this.load.audio('ingame', 'assets/ingame.mp3');
		//Tilemaps and Tiles
		this.load.tilemap('0', 'maps/0.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('1', 'maps/1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('2', 'maps/2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('3', 'maps/3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('4', 'maps/4.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('5', 'maps/5.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('6', 'maps/6.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('7', 'maps/7.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('8', 'maps/8.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('9', 'maps/9.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('10', 'maps/10.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('11', 'maps/11.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('12', 'maps/12.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('13', 'maps/13.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('14', 'maps/14.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('15', 'maps/15.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('16', 'maps/16.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('17', 'maps/17.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('18', 'maps/18.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('19', 'maps/19.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('20', 'maps/20.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('21', 'maps/21.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('22', 'maps/22.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('23', 'maps/23.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('24', 'maps/24.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('25', 'maps/25.json', null, Phaser.Tilemap.TILED_JSON);

		
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