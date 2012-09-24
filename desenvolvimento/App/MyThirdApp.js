var PTM_RATIO = 32;
var MyThirdApp = cc.Layer.extend(
{   _jetSprite:null,
    world:null,
    playerBody:null,
    flyingVelocity:0,
    ctor:function(){
	flyingVelocity = 0;
	
	var b2Vec2 = Box2D.Common.Math.b2Vec2
		, b2BodyDef = Box2D.Dynamics.b2BodyDef
		, b2Body = Box2D.Dynamics.b2Body
		, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
		, b2World = Box2D.Dynamics.b2World
		, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	    
	var screenSize = cc.Director.getInstance().getWinSize();
        //UXLog(L"Screen width %0.2f screen height %0.2f",screenSize.width,screenSize.height);


        // Construct a world object, which will hold and simulate the rigid bodies.
        this.world = new b2World(new b2Vec2(0, -10), true);
        this.world.SetContinuousPhysics(true);
	
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
	
        this.addNewSpriteWithCoords(cc.p(screenSize.width / 2, screenSize.height / 2));
	
	this.scheduleUpdate();

    },
    init:function(){
	this._super();
        return true;
    },
    addNewSpriteWithCoords:function (p) {
     
	this._jetSprite = new JetSprite();
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
        playerBody = this.world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(0.5, 0.5);//These are mid points for our 1m box

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.3;
        playerBody.CreateFixture(fixtureDef);

    },
    onEnter:function(){
        this._super();
    },
    onKeyDown:function(e){
        
	if(flyingVelocity < 0.25)
	    flyingVelocity += 0.05;
    },
    onKeyUp:function(e){
	flyingVelocity = 0.01;
    },
    update:function (dt) {
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
                myActor.setRotation(-1 * cc.RADIANS_TO_DEGREES(b.GetAngle()));
                //console.log(b.GetAngle());
            }
        }

	
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
