function Model()
{
  this.home = function(id,rect)
  {
    Node.call(this,id,rect);
    
    this.setup = function()
    {
      this.install("in",PORT_TYPES.input)
      this.install("out",PORT_TYPES.output)
    }
  }
}
