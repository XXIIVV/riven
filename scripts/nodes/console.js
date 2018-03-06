function ConsoleNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS.render

  this.receive = function(q)
  {
    console.log(q)
  }
}

var INDENTAL = {}