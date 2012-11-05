var LightingOverlay = cc.Sprite.extend({
	lighting1:null,
	darkmask:null,
	light1:null,
	position:cc.p(0,0),
    ctor:function(){	
        this.setZOrder(CE.Z_ORDER[1]);

        var screenSize = cc.Director.getInstance().getWinSize();
        this.setPosition(cc.p(0,screenSize.height));

		var Lamp = illuminated.Lamp
		, Vec2 = illuminated.Vec2
		, Lighting = illuminated.Lighting
		, DiscObject =illuminated.DiscObject
		, RectangleObject = illuminated.RectangleObject
		, DarkMask = illuminated.DarkMask ;

		this.light1 = new Lamp({
		position: new Vec2(250, 250),
		color: '#990F0F',
		distance: 300,
		radius: 20,
		samples: 1
		});

		this.lighting1 = new Lighting({
		light: this.light1
		});

		this.darkmask = new DarkMask({ lights: [this.light1] });

		var screenSize = cc.Director.getInstance().getWinSize();
		this.lighting1.compute(screenSize.width, screenSize.height);
		this.darkmask.compute(screenSize.width, screenSize.height);
    },
    draw:function(){
		this._super();

		var ctx = cc.renderContext;
		var screenSize = cc.Director.getInstance().getWinSize();	
		
		this.light1.position.x = this.position.x;
		this.light1.position.y = screenSize.height - this.position.y;

		

		this.lighting1.compute(screenSize.width, screenSize.height);
		this.darkmask.compute(screenSize.width, screenSize.height);

  		ctx.globalCompositeOperation = "lighter";
		this.lighting1.render(ctx);

		ctx.globalCompositeOperation = "source-over";
		this.darkmask.render(ctx);
    }
});