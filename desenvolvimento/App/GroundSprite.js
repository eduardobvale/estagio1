var JetSprite = cc.Sprite.extend({
    ctor:function(){
	this._verticalVelocity = 5;
        this.initWithFile("images/jet.png");
	this.setPosition(new cc.Point(150,150));
    },
    draw:function(){
	this._super();
	cc.renderContext.fillStyle = "rgba(255,255,255,1)";
        cc.renderContext.strokeStyle = "rgba(255,255,255,1)";
        cc.drawingUtil.drawLine(cc.p(0, 0), cc.p(100, 100));

    }
    
});