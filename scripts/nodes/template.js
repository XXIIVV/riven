function TemplateNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS.parser

  this.cache = null;

  this.receive = function(q)
  {
    var template = this.signal(q.type.slice(0, -1));

    var dom = {
      header:{
        search:q.name
      },
      body:template.answer(q),
      footer:"hello"
    }
    this.send({main:dom})

    // Install Dom
    this.signal("main").request()
  }
}