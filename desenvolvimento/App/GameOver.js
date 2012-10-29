var GameOver = cc.Layer.extend(
{  

    ctor:function(){
    },
    init:function(){
        if(this._super()){
            var screenSize = cc.Director.getInstance().getWinSize();
            var label = cc.LabelTTF.create("Play Again", "Helvetica", 72);
            label.setColor({r:0,g:0,b:0});

            var menuitem = cc.MenuItemLabel.create(label, this, function(){
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2,new MyThirdAppScene()));
            });
            var menu = cc.Menu.create(menuitem);

            menu.setPosition(cc.p(screenSize.height/2, screenSize.height - 80));
            this.addChild(menu);
            
        }
    } 
});

GameOverScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameOver();
        layer.init();
        this.addChild(layer);
    }
})
