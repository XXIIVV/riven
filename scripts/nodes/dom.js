function DomNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS.dom

  this.el = document.createElement("yu")
  this.el.id = this.id
  this.is_installed = false;

  this.receive = function(content)
  {    
    if(content[this.id]){
      this.update(content[this.id]);
      this.send(content[this.id])
    }
  }

  this.answer = function()
  {
    if(!this.is_installed){
      this.install(this.request());
    }
    return this.el
  }

  this.install = function(elements)
  {
    this.is_installed = true;
    for(id in elements){
      this.el.appendChild(elements[id])
    }
    document.body.appendChild(this.el)
  }

  this.update = function(content)
  {
    if(typeof content == "string"){
      this.el.innerHTML = content;
    }
  }
}