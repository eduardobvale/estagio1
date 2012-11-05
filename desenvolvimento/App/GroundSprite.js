var GroundSprite = cc.Sprite.extend({
    vertices: null,
    color:0,
    width:0,
    rgb:"",
    ctor:function(p_vertices){
        this.setTag("Ground");
    if(p_vertices)
	   this.setVertices(p_vertices);
	this.rgb = "rgba("+this.color+","+this.color+","+this.color+",1)";
    },
    setVertices:function(p_vertices){
	this.vertices = p_vertices;
    this.width = (this.vertices[1].x)*2;
    },
    draw:function(){
	this._super();

    cc.renderContext.fillStyle = this.rgb;
    cc.renderContext.strokeStyle = "rgba(0,0,0,1)";
    cc.drawingUtil.drawPoly(this.vertices, 3, true, true);
    
    }
});