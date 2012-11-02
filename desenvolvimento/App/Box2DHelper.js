
function Box2DHelper () {
    
}

Box2DHelper.CreateBody = function( world, sprite ){

    // Define the dynamic body.
    //Set up a 1m squared box in the physics world
    var b2BodyDef = Box2D.Dynamics.b2BodyDef
    , b2Body = Box2D.Dynamics.b2Body
    , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.Set(0, 0);
    bodyDef.bullet = true;
    bodyDef.userData = sprite;

    playerBody = world.CreateBody(bodyDef);


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

    return playerBody;
};