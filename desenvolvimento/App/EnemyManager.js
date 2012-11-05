var EnemyManager = function (layer, world) {
    this.layer = layer;
    this.world = world;
    this.enemyList = [];
}

EnemyManager.prototype.addEnemy = function() {
    
    var body = Box2DHelper.CreateBody(this.world, 3, true, true);
    body.SetPosition(cc.p(60,30));

    var newEnemy = new Enemy(this.layer, body);
  
    this.enemyList.push(newEnemy);
  
    newEnemy.body.GetUserData().scheduleUpdate();
  
    newEnemy.body.GetUserData().schedule(function(){
        var actualBody = this.body;
        var velocity = (this.getParent()._velocity);
        actualBody.SetPosition(cc.pAdd(actualBody.GetPosition(),cc.p(velocity,0)));
    });
};