
function Box2DHelper () {
    
}

Box2DHelper.CreateBody = function( world, size, static, sensor, tag ){



    // Define the dynamic body.
    //Set up a 1m squared box in the physics world
    var b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

    var bodyDef = new b2BodyDef();
    bodyDef.type = static ? b2Body.b2_staticBody : b2Body.b2_dynamicBody ;    
    bodyDef.position.Set(0, 0);
    bodyDef.bullet = true;

    playerBody = world.CreateBody(bodyDef);


    // Define another box shape for our dynamic body.
    var dynamicBox = new b2PolygonShape();
    //dynamicBox.SetAsBox(0.5, 0.5);//These are mid points for our 1m box
    dynamicBox.SetAsBox(size/2, size/2);

    // Define the dynamic body fixture.
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.3;
    fixtureDef.isSensor = sensor ? true : false;
    playerBody.CreateFixture(fixtureDef);

    return playerBody;
};


