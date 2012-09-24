var JetSprite = cc.Sprite.extend({
    ctor:function(){
	this._verticalVelocity = 5;
        this.initWithFile("images/jet.png");
	this.setPosition(new cc.Point(150,150));
    }
});