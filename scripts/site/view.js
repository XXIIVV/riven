function View()
{
  this.element = function(id,rect)
  {
    Node.call(this,id,rect);

    this.glyph = "M150,60 A90,90 0 0,1 240,150 A-90,90 0 0,1 150,240 A-90,-90 0 0,1 60,150 A90,-90 0 0,1 150,60";
  }

  this.render = function(id,rect)
  {
    Node.call(this,id,rect);

    this.glyph = "M60,60 L60,60 L240,60 L240,240 L60,240 Z M60,150 L60,150 L150,150 L150,240"
    
  }

  this.templater = function(id,rect)
  {
    Node.call(this,id,rect);

    this.glyph = "M60,60 L60,60 L240,60 M120,120 A30,30 0 0,1 150,150 M150,150 A30,30 0 0,0 180,180 M180,180 L180,180 L240,180 M120,120 L120,120 L60,120 M60,240 L60,240 L240,240 M240,120 L240,120 L180,120 M60,180 L60,180 L120,180"
  }
}
