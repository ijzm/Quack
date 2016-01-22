Quack.GameOver = function (game) {};


Quack.GameOver.prototype = {

	preload: function () {
	},

	create: function () {	
		this.game.add.sprite(0, 0, 'bgmenu');
		
		this.add.text(this.game.width/2,0, "Score: " + score, {
        	font: "60px Arial",
        	fill: "#FFFFFF",
			stroke: '#000000',
			strokeThickness: 3,
		});
		
		this.add.button(780,350, "playbutton", this.playTheGame,this);		
	},

		update: function () {
	},
		playTheGame: function(){
			console.log("PLAY");
			this.state.start("Game");
	},

};
