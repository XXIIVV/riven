function TemplateNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS.parser

  this.cache = null;

  this.receive = function(q)
  {
    // Select the right signal
    var assoc = this.signal(q.type.slice(0, -1));
    var payload = assoc.answer(q)
    this.send({view:payload})

    // Install Dom
    document.body.appendChild(this.signal("view").answer())
  }
}