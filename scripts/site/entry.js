function Entry()
{
  this.request = function(id,rect)
  {
    Node.call(this,id,rect);

    this.glyph = "M60,150 L60,150 L240,150 L240,150 L150,240 M150,60 L150,60 L240,150"
  }

  this.mouse = function(id,rect)
  {
    Node.call(this,id,rect);
    
  }

  this.router = function(id,rect)
  {
    Node.call(this,id,rect);

    this.glyph = NODE_GLYPHS.router
      
    this.query = function(q)
    {
      console.log(q)
      // this.broadcast(q.target ? q.target : "home")
    }
  }
}
