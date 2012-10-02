function GroundGenerator () {
    this.currentHeight = 1;
    this.upsideDown = false;
}

GroundGenerator.prototype.getNextPoly = function() {
    var randomHeight = Math.floor((Math.random()*7)+1);
    var randomWidth = Math.floor((Math.random()*6)+1);
    var bottomY = -this.currentHeight/2;

   
	
    if(this.currentHeight  === randomHeight)
        randomHeight += 1;
    
    if(this.currentHeight < randomHeight)
        bottomY = -randomHeight/2;
	
    var teste = -1;
    if(this.upsideDown){
	var leftBottomPoint = cc.p(-randomWidth,-(this.currentHeight+bottomY));
	var rightBottomPoint = cc.p(randomWidth,-(randomHeight+bottomY));
	var rightUpperPoint = cc.p(randomWidth,-bottomY);
	var leftUpperPoint = cc.p(-randomWidth,-bottomY);
    } else {
	
	var leftBottomPoint = cc.p(-randomWidth,bottomY);
	var rightBottomPoint = cc.p(randomWidth,bottomY);
	var rightUpperPoint = cc.p(randomWidth,(randomHeight+bottomY));
	var leftUpperPoint = cc.p(-randomWidth,(this.currentHeight+bottomY));
	
    }
    this.currentHeight = randomHeight;
    
    return [leftBottomPoint,rightBottomPoint,rightUpperPoint,leftUpperPoint];
    
};