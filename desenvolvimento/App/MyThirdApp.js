var PTM_RATIO = 16;
var MyThirdApp = cc.Layer.extend(
{   _jetSprite:null,
    world:null,
    playerBody:null,
    flyingVelocity:0,
    rotationAmount:0,
    _groundElements:null,
    _groundManager:null,
    _velocity:-0.5,
    ctor:function(){

	flyingVelocity = 0;
	this._jetSprite = new JetSprite();
	rotationAmount = 0;
	this._groundElements = new Array();
	
	var b2Vec2 = Box2D.Common.Math.b2Vec2
		, b2BodyDef = Box2D.Dynamics.b2BodyDef
		, b2Body = Box2D.Dynamics.b2Body
		, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
		, b2World = Box2D.Dynamics.b2World
		, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	    , b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
        
    var screenSize = cc.Director.getInstance().getWinSize();
        //UXLog(L"Screen width %0.2f screen height %0.2f",screenSize.width,screenSize.height);



        // Construct a world object, which will hold and simulate the rigid bodies.
        this.world = new b2World(new b2Vec2(0, -12), true);
        this.world.SetContinuousPhysics(true);

        //setup debug draw
        var debugDraw = new b2DebugDraw();
        debugDraw.SetSprite(document.getElementById("gameCanvas2").getContext("2d"));
        debugDraw.SetDrawScale(PTM_RATIO);
        debugDraw.SetFillAlpha(0.8);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
	
        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        var bodyDef = new b2BodyDef;

        //create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(20, 2);
	    this.world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	
        this.addNewSpriteWithCoords(cc.p(120, screenSize.height - 200));   

        this._groundManager = new GroundManager(this.world,this);
	
	
	this.scheduleUpdate();

    },
    init:function(){
	this._super();    
	
        this._jetSprite.schedule(function()
            {
                this.setRotation(playerBody.GetLinearVelocity().y * -1);
            });
        return true;
    },
    addNewSpriteWithCoords:function (p) {
     
	this.setTouchEnabled(true);
	this.setKeyboardEnabled(true);

	var sprite = this._jetSprite;

        this.addChild(sprite);

        sprite.setPosition(cc.p(p.x, p.y));

        // Define the dynamic body.
        //Set up a 1m squared box in the physics world
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        bodyDef.userData = sprite;
	bodyDef.bullet = true;
        playerBody = this.world.CreateBody(bodyDef);

	
        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        //dynamicBox.SetAsBox(0.5, 0.5);//These are mid points for our 1m box
	dynamicBox.SetAsBox(3, 3);

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        playerBody.CreateFixture(fixtureDef);

    },
    addNewSprite:function (vertices,position,upsidedown) {
	
	var p = position;
	
	var sprite = new GroundSprite();
	//var radio = PTM_RATIO*side;
	//var vertices = [cc.p(-radio, radio), cc.p(radio, PTM_RATIO*1),cc.p(radio, -radio),cc.p(-radio,-radio)];
	var verticesInPixel = new Array();
	for(var i in vertices){
	    var vert = vertices[i];
	    verticesInPixel.push(cc.p(vert.x*PTM_RATIO,vert.y*PTM_RATIO));
	}
	sprite.setVertices(verticesInPixel);
        this.addChild(sprite);
	
	var height = Math.max(verticesInPixel[2].y,verticesInPixel[3].y);
	if(upsidedown)
	    p.y = p.y - height;
	else
	    p.y = p.y + height;
        sprite.setPosition(cc.p(p.x, p.y));

        
        var b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        bodyDef.userData = sprite;
        var body = this.world.CreateBody(bodyDef);

        var dynamicBox = new b2PolygonShape();
	   dynamicBox.SetAsVector(vertices);

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 10.0;
        fixtureDef.friction = 0;
	   //fixtureDef.isSensor = true;
        body.CreateFixture(fixtureDef);
	
	this._groundElements.push(body);

    },
    onEnter:function(){
        this._super();
    },
    onKeyDown:function(e){
	    flyingVelocity = 80;
    },
    onKeyUp:function(e){
	   flyingVelocity = 0;
    },
    update:function (dt) {

        this._groundManager.update(this._velocity-(flyingVelocity/150));
        //It is recommended that a fixed time step is used with Box2D for stability
        //of the simulation, however, we are using a variable time step here.
        //You need to make an informed choice, the following URL is useful
        //http://gafferongames.com/game-physics/fix-your-timestep/

        var velocityIterations = 8;
        var positionIterations = 1;

        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        this.world.Step(dt, velocityIterations, positionIterations);

        


        //Iterate over the bodies in the physics world
        for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
	
            if (b.GetUserData() != null) {
                //Synchronize the AtlasSprites position and rotation with the corresponding body
                var myActor = b.GetUserData();
                myActor.setPosition(cc.p(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO));
                //myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
                //console.log(b.GetAngle());
            }
        }

        this.world.DrawDebugData();
	
	if(playerBody.GetLinearVelocity().y < 3.5)
	    playerBody.ApplyImpulse(cc.p(0,flyingVelocity),playerBody.GetPosition());
    }
});



MyThirdAppScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new MyThirdApp();
		layer.init();
		this.addChild(layer);
	}
})
