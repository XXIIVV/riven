function CacheNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = "M60,60 L60,60 L240,60 L240,240 L60,240 Z"

  this.cache = null;

  this.receive = function(q)
  {
    if(this.cache){ return cache; }

    this.cache = this.request();

    return this.cache;
  }
}