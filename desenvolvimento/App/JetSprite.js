var JetSprite = cc.Sprite.extend({
    ctor:function(){	
        this.setTag("player");
        this.setZOrder(CE.Z_ORDER[2]);
    },
    draw:function(){
		this._super();

		cc.renderContext.fillStyle = "rgba(0,0,0,1)";
	    cc.renderContext.strokeStyle = "rgba(0,0,0,1)";
	    var side = 30;
	    cc.drawingUtil.drawPoly([cc.p(-side,-side),cc.p(side,-side),cc.p(side,side),cc.p(-side,side)], 3, true, true);    
    }
});