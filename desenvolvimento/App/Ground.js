function Ground (vertices, totalheight, lastHeight) {
    this.Height = totalheight;
    this.lastHeight = lastHeight;
    this.groundSprite = new GroundSprite(vertices);
}