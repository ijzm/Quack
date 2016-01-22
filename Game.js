Quack.Game = function (game) {};

var player;
var playerspawn;

var map;
var layer;
var canshoot;

var bullets;
var fireRate = 200;
var nextFire = 0;

var scoretext;

Quack.Game.prototype = {

	preload: function () {
	},

	create: function () {
		canshoot = false; 
		
		map = this.add.tilemap('00');
		map.addTilesetImage('tiles', 'tiles');
		layer = map.createLayer('main');
		layer.resizeWorld();
		
		playerspawn = map.searchTileIndex(6);
		console.log(map.searchTileIndex(2))
		player = this.add.sprite(playerspawn.x*35,playerspawn.y*35, "player");
		map.replace(6, 1, playerspawn.x, playerspawn.y, 1, 1)
		
		map.setCollisionBetween(4, 4);
		map.setCollisionBetween(8, 8);
		map.setTileIndexCallback(2, this.collect, this);
		map.setTileIndexCallback(3, this.collect, this);
		map.setTileIndexCallback(5, this.pickbullets, this);
		//map.setTileIndexCallback(4, this.destroyblock, this);
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.enable(player);
		
		bullets = this.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet', 0, false);
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);
	},

	update: function () {
		
		
		var cursors = this.input.keyboard.createCursorKeys();
		var wasd = {
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			space: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
		};
		if (wasd.up.isDown || cursors.up.isDown) {
			player.body.velocity.y = -150;
			player.frame = 3;
		} else if (wasd.down.isDown || cursors.down.isDown) {
			player.body.velocity.y = 150;
			player.frame = 1;
		} else {
			player.body.velocity.y = 0;
		}
		if (wasd.left.isDown || cursors.left.isDown) {
			player.body.velocity.x = -150;
			player.frame = 2;
		} else if (wasd.right.isDown || cursors.right.isDown) {
			player.body.velocity.x = 150;
			player.frame = 0;		
		} else {
			player.body.velocity.x = 0;
		}
		if(wasd.space.isDown){
			this.fire();
		}
		this.camera.follow(player);
		this.physics.arcade.collide(player, layer);
		//this.physics.arcade.collide(bullets, layer);
		
		bullets.forEach(this.destroyblock, this, true)
	},
	
	render: function(){
	},
	
	collect: function(sprite, tile){
		tile.index = 1;
		layer.dirty = true;
			
	},
	pickbullets: function(sprite, tile){
		tile.index = 1;
		layer.dirty = true;
		canshoot = true;
	},
	destroyblock: function(sprite){
		var test = map.getTile(layer.getTileX(sprite.x),layer.getTileY(sprite.y), layer);
		if (!(test == null)){
			if(test.index == 4){
				map.putTile(1, layer.getTileX(sprite.x), layer.getTileY(sprite.y), layer);
				layer.dirty = true;
				sprite.x = -10;
			}
			if(test.index == 8){
				sprite.x = -10;
			}
		}
	},
	
	fire: function(){
		if(canshoot){
			if (this.time.now > nextFire && bullets.countDead() > 0){
				nextFire = this.time.now + fireRate;
				var bullet = bullets.getFirstExists(false);
				//bullet.reset(player.x + player.width/2, player.y+player.height/2);
				if(player.frame === 0){
					bullet.reset(player.x + player.width, player.y+player.height/2);
					bullet.body.velocity.x = 200;
					bullet.body.velocity.y = 0
					bullet.angle = 0;					
				}
				if(player.frame === 1){
					bullet.reset(player.x + player.width/2, player.y+player.height);
					bullet.body.velocity.x = 0
					bullet.body.velocity.y = 200 
					bullet.angle = 90;					
				}
				if(player.frame === 2){
					bullet.reset(player.x, player.y+player.height/2);
					bullet.body.velocity.x = -200
					bullet.body.velocity.y = 0
					bullet.angle = 0;					
				}
				if(player.frame === 3){
					bullet.reset(player.x + player.width/2, player.y);
					bullet.body.velocity.x = 0
					bullet.body.velocity.y = -200
					bullet.angle = 90;
				}				
			}
		}
	},
	

};

