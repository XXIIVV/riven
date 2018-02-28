function Entry()
{
  this.request = function(id,rect)
  {
    Node.call(this,id,rect);

    this.glyph = NODE_GLYPHS.entry

    this.bang = function(q = window.location.hash)
    {
      this.send(q)
    }
  }

  this.mouse = function(id,rect)
  {
    Node.call(this,id,rect);
  }

  this.router = function(id,rect)
  {
    Node.call(this,id,rect);

    this.glyph = NODE_GLYPHS.router
      
    this.receive = function(q)
    {
      var hash = q;
      var target = hash.substring(1).replace(/[^0-9a-z]/gi," ").trim().toLowerCase()
      var payload = {hash:hash,target:target}
      this.send(payload.target ? payload.target : "home")
    }
  }
}
