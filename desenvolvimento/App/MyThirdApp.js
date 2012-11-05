
var MyThirdApp = cc.Layer.extend({   
    world:null,
    player:null,
    flyingVelocity:0,
    _groundManager:null,
    _velocity:-1.6,
    _boost: -0.5,
    label: null,
    enemyManager: null,
    ctor:function(){
        this.setKeyboardEnabled(true);
        flyingVelocity = 240;
    },
    init:function(){
	   
        this._super();  

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
        this.world = new b2World(new b2Vec2(0, -80), true);
        this.world.SetContinuousPhysics(true);

        var fixDef = new b2FixtureDef;
        fixDef.density = 1.0;
        fixDef.friction = 0.5;
        fixDef.restitution = 0.2;

        var bodyDef = new b2BodyDef;




        //Criando Player
        var jetSprite = new JetSprite();
        this.addChild(jetSprite);

        var playerBody = Box2DHelper.CreateBody(this.world, 6);
        playerBody.SetUserData(jetSprite);

        player = new Player(playerBody);
        player.body.SetPosition(cc.p(20,25));

        // Testando Enemy
        this.enemyManager = new EnemyManager(this, this.world);
        
        this.schedule( this.addEnemy, 1.5 );

        this.label = cc.LabelTTF.create("0", "Helvetica", 72);
            this.label.setColor({r:0,g:0,b:0});
            this.label.setPosition(cc.p(200,300));
        this.addChild(this.label);

        //Criando Luzes
        this.lightingOverlay = new LightingOverlay();
        this.addChild(this.lightingOverlay);

        //Gorund Manager
        this._groundManager = new GroundManager(this.world,this);

        //Listerner
        var b2Listener = Box2D.Dynamics.b2ContactListener;

        //Add listeners for contact
        var listener = new b2Listener;

        var self = this;

        listener.BeginContact = function(contact) {

            var sprA = contact.GetFixtureA().GetBody().GetUserData();
            var sprB = contact.GetFixtureB().GetBody().GetUserData();

            if( (sprA && sprA.getTag() == "Ground") || (sprB && sprB.getTag() == "Ground")){
                self.onDeath();
            }
                
        }

        listener.EndContact = function(contact) {
            // console.log(contact.GetFixtureA().GetBody().GetUserData());
        }

        listener.PostSolve = function(contact, impulse) {

        }

        listener.PreSolve = function(contact, oldManifold) {
            // PreSolve
        }

        this.world.SetContactListener(listener);

        this.scheduleUpdate();

    
    },
    onEnter:function(){
        this._super();
    },
    onKeyDown:function (e) {
        CE.KEYS[e] = true;
    },

    onKeyUp:function (e) {
        CE.KEYS[e] = false;
    },
    onDeath:function(e){
        this._velocity = 0;
        player.body = null;
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.6,new GameOverScene()));
    },
    startLevel:function(e){
        this.scheduleUpdate();
    },
    update:function (dt) {

        

        if(CE.KEYS[CE.KEYS_ALIAS.DASH])
            this._groundManager.update(this._velocity+this._boost);
        else
            this._groundManager.update(this._velocity);


        //It is recommended that a fixed time step is used with Box2D for stability
        //of the simulation, however, we are using a variable time step here.
        //You need to make an informed choice, the following URL is useful
        //http://gafferongames.com/game-physics/fix-your-timestep/

        var velocityIterations = 8;
        var positionIterations = 1;

        // Instruct the world to perform a single step of simulation. It is
        // generally best to keep the time step and iterations fixed.
        this.world.Step(dt, velocityIterations, positionIterations);

        if(player.body){
            var bodyPosition = cc.pMult(player.body.GetPosition(),CE.PTM_RATIO);
            
            player.body.GetUserData().setPosition(bodyPosition);
            
            this.lightingOverlay.position = bodyPosition;

            if(CE.KEYS[CE.KEYS_ALIAS.UP]){
                if(player.body.GetLinearVelocity().y > 30)
                    player.body.SetLinearVelocity(cc.p(0,20));  
                else
                    player.body.ApplyImpulse(cc.p(0,flyingVelocity),player.body.GetPosition());  
            }
            this.label.setString(player.body.GetLinearVelocity().y);
        }
        
    },
    addEnemy: function(){
        this.enemyManager.addEnemy();
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

