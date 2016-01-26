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
var nextFire2 = 0;

var scoretext;
var canmove;
var speed = 150;

var random = true;

var collects;
var starcollects;
var sindex;

var sheepgroup;
var endings;
var enemiesAlive;
var sloc;
var water;

var cam;
var walln;
var walls;
var walle;
var wallw;


sheep = function (index, game, player, xpos, ypos) {
	this.game = game;
	this.health = 2;
	this.player = player;
	this.alive = true;

	this.sheep = game.add.sprite(xpos, ypos, "sheep");
	console.log(this.sheep.x)
		//this.sheep.anchor.set(0.5); 
	this.sheep.name = index.toString();
	this.game.physics.enable(this.sheep, Phaser.Physics.ARCADE);
	//this.sheep.body.collideWorldBounds = true;
};

sheep.prototype.damage = function () {

	this.health -= 1;

	if (this.health <= 0) {
		this.alive = false;
		this.sheep.kill();

		return true;
	}

	return false;

};

sheep.prototype.update = function () {
	this.sheep.body.velocity.x = 200;
	//console.log(this.sheep.x)
}

Quack.Game.prototype = {

	preload: function () {},

	create: function () {

		cam = this.add.sprite(0, 0, "cam");
		walln = this.add.sprite(-2, -2, "wall2");
		walls = this.add.sprite(-2, this.game.height + 2, "wall2");
		walle = this.add.sprite(this.game.width + 2, -2, "wall1");
		wallw = this.add.sprite(-2, -2, "wall1");

		walln.fixedToCamera = true;
		walls.fixedToCamera = true;
		walle.fixedToCamera = true;
		wallw.fixedToCamera = true;

		this.physics.startSystem(Phaser.Physics.ARCADE);
		collects = 0;
		starcollects = 0;
		sindex = 0;

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
		if (playerspawn == null) {
			playerspawn = map.searchTileIndex(55);
			water = true;
		}
		player = this.add.sprite(playerspawn.x * 35 + 35 / 2, playerspawn.y * 35 + 35 / 2, "player");
		player.anchor.x = 0.5;
		player.anchor.y = 0.5;
		map.replace(6, 1, playerspawn.x, playerspawn.y, 1, 1)
		this.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;

		if (coop) {
			player2spawn = map.searchTileIndex(7);
			if (player2spawn == null) {
				player2spawn = map.searchTileIndex(56);
			}
			player2 = this.add.sprite(player2spawn.x * 35 + 35 / 2, player2spawn.y * 35 + 35 / 2, "player2");
			player2.anchor.x = 0.5;
			player2.anchor.y = 0.5;
			map.replace(7, 1, player2spawn.x, player2spawn.y, 1, 1);
			this.physics.arcade.enable(player2);
			player2.body.collideWorldBounds = true;
		} else {
			player2spawn = map.searchTileIndex(7);
			map.replace(7, 1, player2spawn.x, player2spawn.y, 1, 1)
		}





		map.setCollisionBetween(4, 4);
		map.setCollisionBetween(8, 8);
		map.setCollisionBetween(20, 20);
		map.setTileIndexCallback(2, this.collect, this);
		map.setTileIndexCallback(3, this.collect, this);
		map.setTileIndexCallback(5, this.pickbullets, this);
		map.setTileIndexCallback(10, this.win, this);
		map.setTileIndexCallback(19, this.pickkey, this);

		//WATER!
		map.setCollisionBetween(53, 53);
		map.setCollisionBetween(57, 57);
		map.setTileIndexCallback(51, this.collect, this);
		map.setTileIndexCallback(52, this.collect, this);
		map.setTileIndexCallback(54, this.pickbullets, this);
		map.setTileIndexCallback(58, this.win, this);




		bullets = this.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet', 0, false);
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);

		endings = this.add.group()
		map.createFromTiles(10, 10, "redending", layer, endings);
		map.createFromTiles(11, 11, "blueending", layer, endings);
		endings.forEach(function (sprite) {
			sprite.y -= 14;
			sprite.x -= 10;
		}, this);

		if (water) {
			while (map.searchTileIndex(53, collects, false, layer) !== null) {
				collects++;
			}
		} else {
			while (map.searchTileIndex(2, collects, false, layer) !== null) {
				collects++;
			}
		}

		if (water) {
			while (map.searchTileIndex(54, starcollects, false, layer) !== null) {
				starcollects++;
			}
		} else {
			while (map.searchTileIndex(3, starcollects, false, layer) !== null) {
				starcollects++;
			}
		}
		console.log(collects)
		console.log(starcollects);
		collects += starcollects;

		sheepgroup = [];

		while (map.searchTileIndex(17, sindex, false, layer) !== null) {
			sloc = map.searchTileIndex(17, sindex, false, layer);
			sheepgroup.push(new sheep(sindex, this.game, player, sloc.x, sloc.y));
			sindex++;
			//map.replace(17, 1, sloc.x, sloc.y, 1, 1, layer);
		}

	},

	update: function () {
		if (coop) {
			cam.x = (player.x + player2.x) / 2
			cam.y = (player.y + player2.y) / 2
		} else {
			cam.x = player.x;
			cam.y = player.y;
		}
		player.bringToTop();
		var cursors = this.input.keyboard.createCursorKeys();
		var wasd = {
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			space: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
			f: this.input.keyboard.addKey(Phaser.Keyboard.F),
		};
		if (cursors.up.isDown) {
			player.frame = 3;
		}
		if (cursors.down.isDown) {
			player.frame = 1;
		}
		if (cursors.left.isDown) {
			player.frame = 2;
		}
		if (cursors.right.isDown) {
			player.frame = 0;
		}
		switch (player.frame) {
		case 0:
			player.body.velocity.x = speed;
			player.body.velocity.y = 0;
			player.y = this.math.snapTo(player.y, 35, 35 / 2);
			break;
		case 1:
			player.body.velocity.y = speed;
			player.body.velocity.x = 0;
			player.x = this.math.snapTo(player.x, 35, 35 / 2);
			break;
		case 2:
			player.body.velocity.x = -speed;
			player.body.velocity.y = 0;
			player.y = this.math.snapTo(player.y, 35, 35 / 2);
			break;
		case 3:
			player.body.velocity.y = -speed;
			player.body.velocity.x = 0;
			player.x = this.math.snapTo(player.x, 35, 35 / 2);
			break;
		}
		if (!(cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown)) {
			player.body.velocity.x = 0;
			player.body.velocity.y = 0;
			player.y = this.math.snapTo(player.y, 35, 35 / 2)
			player.x = this.math.snapTo(player.x, 35, 35 / 2)
		}
		if (wasd.space.isDown) {
			this.fire();
			//			this.fire2();
		}
		//p2

		if (coop) {
			player2.bringToTop();
			if (wasd.up.isDown) {
				player2.frame = 3;
			}
			if (wasd.down.isDown) {
				player2.frame = 1;
			}
			if (wasd.left.isDown) {
				player2.frame = 2;
			}
			if (wasd.right.isDown) {
				player2.frame = 0;
			}
			switch (player2.frame) {
			case 0:
				player2.body.velocity.x = speed;
				player2.body.velocity.y = 0;
				player2.y = this.math.snapTo(player2.y, 35, 35 / 2);
				break;
			case 1:
				player2.body.velocity.y = speed;
				player2.body.velocity.x = 0;
				player2.x = this.math.snapTo(player2.x, 35, 35 / 2);
				break;
			case 2:
				player2.body.velocity.x = -speed;
				player2.body.velocity.y = 0;
				player2.y = this.math.snapTo(player2.y, 35, 35 / 2);
				break;
			case 3:
				player2.body.velocity.y = -speed;
				player2.body.velocity.x = 0;
				player2.x = this.math.snapTo(player2.x, 35, 35 / 2);
				break;
			}
			if (!(wasd.up.isDown || wasd.down.isDown || wasd.left.isDown || wasd.right.isDown)) {
				player2.body.velocity.x = 0;
				player2.body.velocity.y = 0;
				player2.y = this.math.snapTo(player2.y, 35, 35 / 2);
				player2.x = this.math.snapTo(player2.x, 35, 35 / 2);
			}
			if (wasd.f.isDown) {
				this.fire2();
			}
			this.physics.arcade.collide(player2, layer);

			if (this.checkOverlap(player, player2)) {
				player.body.velocity.x = 0;
				player.body.velocity.y = 0;

				player2.body.velocity.x = 0;
				player2.body.velocity.y = 0;
			}

			if (this.checkOverlap(player, walln)) {
				if (player.body.velocity.y < 0) {
					player.body.velocity.y = 0
				}
			}
			if (this.checkOverlap(player, walle)) {
				if (player.body.velocity.x > 0) {
					player.body.velocity.x = 0;
				}
			}
			if (this.checkOverlap(player, walls)) {
				if (player.body.velocity.y > 0) {
					player.body.velocity.y = 0
				}
			}
			if (this.checkOverlap(player, wallw)) {
				if (player.body.velocity.x < 0) {
					player.body.velocity.x = 0;
				}
			}
			if (this.checkOverlap(player2, walln)) {
				if (player2.body.velocity.y < 0) {
					player2.body.velocity.y = 0
				}
			}
			if (this.checkOverlap(player2, walle)) {
				if (player2.body.velocity.x > 0) {
					player2.body.velocity.x = 0;
				}
			}
			if (this.checkOverlap(player2, walls)) {
				if (player2.body.velocity.y > 0) {
					player2.body.velocity.y = 0
				}
			}
			if (this.checkOverlap(player2, wallw)) {
				if (player2.body.velocity.x < 0) {
					player2.body.velocity.x = 0;
				}
			}

		}
		this.camera.follow(cam);
		this.physics.arcade.collide(player, layer);


		bullets.forEach(this.destroyblock, this, true)

		for (var i = 0; i < sheepgroup.length; i++) {

			sheepgroup[i].update();
		}

	},

	render: function () {},

	collect: function (sprite, tile) {
		tile.index = 1;
		layer.dirty = true;
		collects--
		console.log(collects);

	},
	pickbullets: function (sprite, tile) {
		tile.index = 1;
		layer.dirty = true;
		canshoot = true;
	},
	destroyblock: function (sprite) {
		var test = map.getTile(layer.getTileX(sprite.x), layer.getTileY(sprite.y), layer);
		if (!(test == null)) {
			if (test.index == 4) {
				map.putTile(1, layer.getTileX(sprite.x), layer.getTileY(sprite.y), layer);
				layer.dirty = true;
				sprite.x = -10;
			}
			if (test.index == 8) {
				sprite.x = -10;
			}
		}
	},

	win: function () {
		if (collects <= 0) {
			this.game.state.start("GameOver");
			level++;
		}
	},
	pickkey: function (sprite) {
		var keyblock = 0;
		var blockfound;
		map.putTile(1, layer.getTileX(sprite.x), layer.getTileY(sprite.y), layer);
		while (map.searchTileIndex(20, keyblock, false, layer) !== null) {
			blockfound = map.searchTileIndex(20, keyblock, false, layer);
			map.putTile(1, blockfound.x, blockfound.y, layer);
			layer.dirty = true;
		}
	},


	fire: function () {
		if (canshoot) {
			if (this.time.now > nextFire && bullets.countDead() > 0) {
				nextFire = this.time.now + fireRate;
				var bullet = bullets.getFirstExists(false);
				bullet.reset(player.x - 1, player.y - 2);
				if (player.frame === 0) {
					bullet.body.velocity.x = 200;
					bullet.body.velocity.y = 0
					bullet.angle = 0;
				}
				if (player.frame === 1) {
					bullet.body.velocity.x = 0
					bullet.body.velocity.y = 200
					bullet.angle = 90;
				}
				if (player.frame === 2) {
					bullet.body.velocity.x = -200
					bullet.body.velocity.y = 0
					bullet.angle = 0;
				}
				if (player.frame === 3) {
					bullet.body.velocity.x = 0
					bullet.body.velocity.y = -200
					bullet.angle = 90;
				}
			}
		}
	},

	fire2: function () {
		if (coop) {
			if (canshoot) {
				if (this.time.now > nextFire2 && bullets.countDead() > 0) {
					nextFire2 = this.time.now + fireRate;
					var bullet2 = bullets.getFirstExists(false);
					bullet2.reset(player2.x - 1, player2.y - 2);
					if (player2.frame === 0) {
						bullet2.body.velocity.x = 200;
						bullet2.body.velocity.y = 0
						bullet2.angle = 0;
					}
					if (player2.frame === 1) {
						bullet2.body.velocity.x = 0
						bullet2.body.velocity.y = 200
						bullet2.angle = 90;
					}
					if (player2.frame === 2) {
						bullet2.body.velocity.x = -200
						bullet2.body.velocity.y = 0
						bullet2.angle = 0;
					}
					if (player2.frame === 3) {
						bullet2.body.velocity.x = 0
						bullet2.body.velocity.y = -200
						bullet2.angle = 90;
					}
				}
			}
		}
	},

	checkOverlap: function (spriteA, spriteB) {

		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();

		return Phaser.Rectangle.intersects(boundsA, boundsB);

	},
};