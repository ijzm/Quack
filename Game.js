Quack.Game = function (game) {};

var player;
var playerspawn;

var player2;
var player2spawn;

var map;
var layer;
var canshoot;

var bullets;
var fireRate = 200;
var nextFire = 0;

var scoretext;
var canmove;
var speed = 150;

var random = true;

var collects;

var sheepgroup;
var endings;
Quack.Game.prototype = {

	preload: function () {
	},

	create: function () {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		collects = 0;
		
			map = this.add.tilemap(level.toString());		
			map.addTilesetImage('tiles', 'tiles');
			layer = map.createLayer('main');
			layer.resizeWorld();
		
		canshoot = false;
		canmove = true;
		
//		this.tick = this.game.time.create(false);
//		this.tick.loop(5000, this.randomize, this);
//		this.tick.start();
		

		
		playerspawn = map.searchTileIndex(6);
		player = this.add.sprite(playerspawn.x*35 + 35/2,playerspawn.y*35+35/2, "player");
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		map.replace(6, 1, playerspawn.x, playerspawn.y, 1, 1)
		this.physics.arcade.enable(player);
		
		if(coop){
			player2spawn = map.searchTileIndex(7);
			player2 = this.add.sprite(player2spawn.x*35 + 35/2,player2spawn.y*35+35/2, "player2");
			player2.anchor.x = 0.5;
			player2.anchor.y = 0.5;
			map.replace(7, 1, player2spawn.x, player2spawn.y, 1, 1)
			this.physics.arcade.enable(player2);
		}
		
		
		
		
		
		map.setCollisionBetween(4, 4);
		map.setCollisionBetween(8, 8);
		map.setTileIndexCallback(2, this.collect, this);
		map.setTileIndexCallback(3, this.collect, this);
		map.setTileIndexCallback(5, this.pickbullets, this);
		map.setTileIndexCallback(10, this.win, this);
		
		
		
		
		bullets = this.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet', 0, false);
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);
		
		sheepgroup = this.add.group();
		sheepgroup.enableBody = true;
		sheepgroup.physicsBodyType = Phaser.Physics.ARCADE;
		map.createFromTiles(17, 1, "sheep", layer, sheepgroup);
		
		endings = this.add.group()
		map.createFromTiles(10, 10, "redending", layer, endings);
		map.createFromTiles(11, 11, "blueending", layer, endings);
		endings.forEach(function(sprite){sprite.y -=14;}, this);
		
		while(map.searchTileIndex(2, collects, false, layer) !== null){
			collects++;
		}
	},

	update: function () {
		
		sheepgroup.forEachAlive(this.ai_sheep, this);
		
		var cursors = this.input.keyboard.createCursorKeys();
		var wasd = {
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			shift: this.input.keyboard.addKey(Phaser.Keyboard.shiftKey),
			space: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
		};
		if (wasd.up.isDown) {
			player.frame = 3;
		} if (wasd.down.isDown) {
			player.frame = 1;		
		} if (wasd.left.isDown) {
			player.frame = 2;
		} if (wasd.right.isDown) {			
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
		if(!(wasd.up.isDown || wasd.down.isDown || wasd.left.isDown || wasd.right.isDown)){
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
			player.y = this.math.snapTo(player.y, 35, 35/2)
			player.x = this.math.snapTo(player.x, 35, 35/2)
		}
		if(wasd.space.isDown){
			this.fire();
		}
		//p2
		
		if(coop){

			if (cursors.up.isDown) {
				player2.frame = 3;
			} if (cursors.down.isDown) {
				player2.frame = 1;		
			} if (cursors.left.isDown) {
				player2.frame = 2;
			} if (cursors.right.isDown) {			
				player2.frame = 0;	
			} 
			switch(player2.frame){
				case 0:
					player2.body.velocity.x = speed;
					player2.body.velocity.y = 0;
					player2.y = this.math.snapTo(player2.y, 35, 35/2);				
					break;
				case 1:
					player2.body.velocity.y = speed;
					player2.body.velocity.x = 0;
					player2.x = this.math.snapTo(player2.x, 35, 35/2);	
					break;
				case 2:
					player2.body.velocity.x = -speed;
					player2.body.velocity.y = 0;
					player2.y = this.math.snapTo(player2.y, 35, 35/2);
					break;
				case 3:
					player2.body.velocity.y = -speed;
					player2.body.velocity.x = 0;
					player2.x = this.math.snapTo(player2.x, 35, 35/2);
					break;
			}	
			if(!(cursors.up.isDown|| cursors.down.isDown || cursors.left.isDown || cursors.right.isDown)){
				player2.body.velocity.x = 0;
				player2.body.velocity.y = 0;
				player2.y = this.math.snapTo(player2.y, 35, 35/2)
				player2.x = this.math.snapTo(player2.x, 35, 35/2)
			}2
			if(wasd.space.isDown){
				//this.fire2();
			}
			this.physics.arcade.collide(player2, layer);
		}
		this.camera.follow(player);
		this.physics.arcade.collide(player, layer);
		
		
		bullets.forEach(this.destroyblock, this, true)
		
	},
	
	render: function(){
	},
	
	collect: function(sprite, tile){
		tile.index = 1;
		layer.dirty = true;
		collects--
		console.log(collects);
			
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
	
	win: function(){
		if(collects <= 0){
			console.log("TEST")
			this.game.state.start("GameOver");
			level++;
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

