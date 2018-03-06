function BangNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS ? NODE_GLYPHS.entry : ""
}