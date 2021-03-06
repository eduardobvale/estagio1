(function () {
	var d = document;
	var c = {
		COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
		box2d:true,
		showFPS:true,
		frameRate:30,
		tag:'gameCanvas', //the dom element to run cocos2d on
		engineDir:'../cocos2d/',
		appFiles:[
			'config/GameConfig.js',
			'MyThirdApp.js',
			'Player.js',
			'Enemy.js',
			'EnemySprite.js',
			'EnemyManager.js',
			'JetSprite.js',
			'GroundSprite.js',
			'GroundManager.js',
			'MainMenu.js',
			'GameOver.js',
			'Box2DHelper.js',
			'LightingOverlay.js']
	};
	window.addEventListener('DOMContentLoaded', function () {
		//first load engine file if specified
		var s = d.createElement('script');
		s.src = c.engineDir + 'platform/jsloader.js';
		d.body.appendChild(s);
		s.c = c;
		s.id = 'cocos2d-html5';
		//else if single file specified, load singlefile

	});
})();