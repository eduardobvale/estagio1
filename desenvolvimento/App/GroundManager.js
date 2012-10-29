
function GroundManager (b2World, gameLayer) {
    this.currentHeight = 1;
    this.currentInsertPos = cc.p(0,0);
    this.upsideDown = false;    
    this._b2World = b2World;
    this._gameLayer = gameLayer;
    this._topObjects = new Array();
}

GroundManager.prototype.getNextPoly = function(startingHeight) {
    var randomHeight = Math.floor((Math.random()*14)+1);
    var randomWidth = Math.floor((Math.random()*6)+1);
    var bottomY = -startingHeight/2;

   
	
    if(startingHeight  === randomHeight)
        randomHeight += 1;
    
    if(startingHeight < randomHeight)
        bottomY = -randomHeight/2;
	
    var teste = -1;
    if(this.upsideDown){
	var leftBottomPoint = cc.p(-randomWidth,-(startingHeight+bottomY));
	var rightBottomPoint = cc.p(randomWidth,-(randomHeight+bottomY));
	var rightUpperPoint = cc.p(randomWidth,-bottomY);
	var leftUpperPoint = cc.p(-randomWidth,-bottomY);
    } else {
	
	var leftBottomPoint = cc.p(-randomWidth,bottomY);
	var rightBottomPoint = cc.p(randomWidth,bottomY);
	var rightUpperPoint = cc.p(randomWidth,(randomHeight+bottomY));
	var leftUpperPoint = cc.p(-randomWidth,(startingHeight+bottomY));
	
    }
    this.currentHeight = randomHeight;
    
    return [leftBottomPoint,rightBottomPoint,rightUpperPoint,leftUpperPoint];
    
};

GroundManager.prototype.update = function(velocity){
 
    var larguraAtual = 0;
    var larguraTotal =  cc.Director.getInstance().getWinSize().width;

    for (var i = 0; i < this._topObjects.length; i++) {

        var body = this._topObjects[i];

        body.SetPosition( cc.pAdd( body.GetPosition(), cc.p( velocity, 0 ) ) );
      
        if((body.GetPosition().x + 15 ) < 0){
            this._b2World.DestroyBody(body);
            body.GetUserData().removeFromParentAndCleanup(true);
            this._topObjects.splice(i,1);
            continue;
        }else{
        larguraAtual += body.GetUserData().width;
        }
    }
    while(larguraAtual < (larguraTotal +(15*PTM_RATIO))){
        
        var polyVector = this.getNextPoly(this.currentHeight);

        var larguraObj = (polyVector[1].x - polyVector[0].x)*PTM_RATIO;

        var ultimaPos = 0;

        var ultimoBody = this._topObjects[this._topObjects.length-1];

        if(ultimoBody)
            ultimaPos = (ultimoBody.GetUserData().width/2) + ultimoBody.GetPosition().x*PTM_RATIO;

        this.currentInsertPos = cc.p(ultimaPos+(larguraObj/2),0);
        
        var body = this.createGroundBody(polyVector,this.currentInsertPos,false);

        this._topObjects.push(body);
        
        this.currentHeight = (polyVector[2].y - polyVector[1].y);

        larguraAtual += larguraObj;


    }
};              

GroundManager.prototype.createGroundBody = function (vertices,position,upsidedown) {
    
    var p = cc.p(position.x,position.y);
    
    var sprite = new GroundSprite();
    
    var verticesInPixel = new Array();

    for( var i in vertices ){
        verticesInPixel.push( cc.pMult( vertices[i], PTM_RATIO ) );
    }
    sprite.setVertices( verticesInPixel );
    
    this._gameLayer.addChild( sprite );
    
    var height = Math.max( verticesInPixel[2].y, verticesInPixel[3].y );

    if( upsidedown )
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
    var body = this._b2World.CreateBody(bodyDef);

    var dynamicBox = new b2PolygonShape();
   dynamicBox.SetAsVector(vertices);

    // Define the dynamic body fixture.
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = 10.0;
    fixtureDef.friction = 0;
    fixtureDef.isSensor = true;
    body.CreateFixture(fixtureDef);

    return body;

};