var Enemy = cc.Class.extend({
    body: null,
    state: 0,
    ctor: function(layer, p_body){
        this.body = p_body;
        this.body.SetUserData(new EnemySprite(this.body));
        layer.addChild(this.body.GetUserData());
    }
});