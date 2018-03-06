function QueryNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS.entry
  this.label = "query"

  this.bang = function()
  {
    var hash = window.location.hash.substring(1).replace(/[^0-9a-z]/gi," ").trim().toLowerCase()
    if(hash == ""){
      hash = "spinach";
    }
    this.label = hash
    this.send(hash)
  }
}