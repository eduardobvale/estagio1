var MainMenu = cc.Layer.extend(
{  

    ctor:function(){
    },
    init:function(){
        if(this._super()){
            var screenSize = cc.Director.getInstance().getWinSize();
            var label = cc.LabelTTF.create("Cave Escaping", "Helvetica", 72);
            label.setColor({r:0,g:0,b:0});

            var menuitem = cc.MenuItemLabel.create(label, this, function(){
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(0.01,new MyThirdAppScene()));
            });
            var menu = cc.Menu.create(menuitem);

            menu.setPosition(cc.p(screenSize.height/2, screenSize.height - 80));
            this.addChild(menu);
            
            //this.addChild(label);
        }
    } 
});

MainMenuScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new MainMenu();
		layer.init();
		this.addChild(layer);
	}
})
