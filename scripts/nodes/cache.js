function CacheNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS ? NODE_GLYPHS.cache : ""

  this.cache = null;

  this.receive = function(q)
  {
    if(this.cache){ return cache; }

    this.cache = this.request();

    return this.cache;
  }
}