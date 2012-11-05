var Player = cc.Class.extend({
    body: null,
    state: 0,
    ctor: function(p_body){
        this.body = p_body;
        state = PlayerStates.STOPPED;
    },
    startFlying: function(){
    	
    }
});

var PlayerStates = {
    STOPPED: 0,
    FLYING: 1,
    DASHING: 2,
    DEAD: 3
}