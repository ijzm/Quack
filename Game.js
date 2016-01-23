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
var canmove;
var speed = 150;
level = 0;
Quack.Game.prototype = {

	preload: function () {
	},

	create: function () {
			console.log(level)
			map = this.add.tilemap(level.toString());		
			map.addTilesetImage('tiles', 'tiles');
			layer = map.createLayer('main');
			layer.resizeWorld();
		
		canshoot = false;
		canmove = true;
		
		this.timer1 = this.game.time.create(false);
		this.timer1.loop(400, function(){canmove = true}, this);
		this.timer1.start();
		

		
		playerspawn = map.searchTileIndex(6);
		console.log(map.searchTileIndex(2))
		player = this.add.sprite(playerspawn.x*35 + 35/2,playerspawn.y*35+35/2, "player");
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		map.replace(6, 1, playerspawn.x, playerspawn.y, 1, 1)
		
		map.setCollisionBetween(4, 4);
		map.setCollisionBetween(8, 8);
		map.setTileIndexCallback(2, this.collect, this);
		map.setTileIndexCallback(3, this.collect, this);
		map.setTileIndexCallback(5, this.pickbullets, this);
		
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
		
		console.log(map.tilesets)
	},

	update: function () {
		
		
		var cursors = this.input.keyboard.createCursorKeys();
		var wasd = {
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			shift: this.input.keyboard.addKey(Phaser.Keyboard.shiftKey),
			space: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
		};
		if (wasd.up.isDown || cursors.up.isDown) {
			player.frame = 3;
		} if (wasd.down.isDown || cursors.down.isDown) {
			player.frame = 1;		
		} if (wasd.left.isDown || cursors.left.isDown) {
			player.frame = 2;
		} if (wasd.right.isDown || cursors.right.isDown) {			
			player.frame = 0;	
		} 
		switch(player.frame){
			case 0:
				player.body.velocity.x = speed;
				player.body.velocity.y = 0;
				player.y = this.math.snapTo(player.y, 35, 35/2);				
				break;
			case 1:
				player.body.velocity.y = speed;
				player.body.velocity.x = 0;
				player.x = this.math.snapTo(player.x, 35, 35/2);	
				break;
			case 2:
				player.body.velocity.x = -speed;
				player.body.velocity.y = 0;
				player.y = this.math.snapTo(player.y, 35, 35/2);
				break;
			case 3:
				player.body.velocity.y = -speed;
				player.body.velocity.x = 0;
				player.x = this.math.snapTo(player.x, 35, 35/2);
				break;
		}
		
		if(!(wasd.up.isDown || cursors.up.isDown || wasd.down.isDown || cursors.down.isDown || wasd.left.isDown || cursors.left.isDown || wasd.right.isDown || cursors.right.isDown)){
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
			player.y = this.math.snapTo(player.y, 35, 35/2)
			player.x = this.math.snapTo(player.x, 35, 35/2)
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
				bullet.reset(player.x, player.y);
				if(player.frame === 0){
					bullet.body.velocity.x = 200;
					bullet.body.velocity.y = 0
					bullet.angle = 0;					
				}
				if(player.frame === 1){
					bullet.body.velocity.x = 0
					bullet.body.velocity.y = 200 
					bullet.angle = 90;					
				}
				if(player.frame === 2){
					bullet.body.velocity.x = -200
					bullet.body.velocity.y = 0
					bullet.angle = 0;					
				}
				if(player.frame === 3){
					bullet.body.velocity.x = 0
					bullet.body.velocity.y = -200
					bullet.angle = 90;
				}				
			}
		}
	},
	

};

