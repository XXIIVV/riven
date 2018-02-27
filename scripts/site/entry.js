function Entry()
{
  this.request = function(id,rect)
  {
    Node.call(this,id,rect);
    
    this.setup = function()
    {
      this.install("in",PORT_TYPES.input)
      this.install("out",PORT_TYPES.output)
    }
  }

  this.mouse = function(id,rect)
  {
    Node.call(this,id,rect);
    
    this.setup = function()
    {
      this.install("in",PORT_TYPES.input)
      this.install("out",PORT_TYPES.output)
    }
  }

  this.router = function(id,rect)
  {
    Node.call(this,id,rect);
    
    this.setup = function()
    {
      this.install("in",PORT_TYPES.input)
      this.install("out",PORT_TYPES.output)
    }
  }
}
