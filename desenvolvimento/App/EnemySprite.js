var EnemySprite = cc.Sprite.extend({
    body: null,
    state: 0,
    ctor: function(p_body){
        this.body = p_body;
        this.setTag("Ground");
        this.setZOrder(CE.Z_ORDER[2]);
    },
    update: function(){
    	this.setPosition(cc.pMult(this.body.GetPosition(),CE.PTM_RATIO));
    },
    draw: function(){
		this._super();

		cc.renderContext.fillStyle = "rgba(0,0,0,1)";
	    cc.renderContext.strokeStyle = "rgba(255,255,255,1)";
	    var side = 30;
	    cc.drawingUtil.drawPoly([cc.p(-side,-side),cc.p(side,-side),cc.p(side,side),cc.p(-side,side)], 3, true, true);    
    }
});