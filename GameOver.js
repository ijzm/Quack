Quack.GameOver = function (game) {};


Quack.GameOver.prototype = {

	preload: function () {
	},

	create: function () {	
		this.game.add.sprite(0, 0, 'bg');
		
		this.add.button(0,0, "playbutton", this.playTheGame,this);		
	},

		update: function () {
	},
		playTheGame: function(){
			console.log("PLAY");
			this.state.start("Game");
	},

};
