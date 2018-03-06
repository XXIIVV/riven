function DatabaseNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS.builder

  this.receive = function(q)
  {
    this.send(this.request())
  }
}

var DATABASE = {};