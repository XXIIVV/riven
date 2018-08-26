function TemplateNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph ="M60,60 L60,60 L240,60 M120,120 A30,30 0 0,1 150,150 M150,150 A30,30 0 0,0 180,180 M180,180 L180,180 L240,180 M120,120 L120,120 L60,120 M60,240 L60,240 L240,240 M240,120 L240,120 L180,120 M60,180 L60,180 L120,180"

  this.cache = null;

  this.receive = function(q)
  {
    var assoc = this.signal(q.type ? q.type.slice(0, -1) : "page");  
    var payload = assoc.answer(q)

    this.send(payload)
    this.label = `template:${assoc.id}`
  
    // Install Dom
    document.body.appendChild(this.signal("view").answer())
  }
}