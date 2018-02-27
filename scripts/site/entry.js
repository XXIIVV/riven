function Entry()
{
  this.request = function(id,rect)
  {
    Node.call(this,id,rect);
      
    this.setup = function()
    {
      this.install("out",PORT_TYPES.output)
    }

    this.query = function()
    {
      var hash = window.location.hash;
      var target = hash.substring(1).replace(/[^0-9a-z]/gi," ").trim().toLowerCase()
      var payload = {hash:hash,target:target}
      this.broadcast(payload)
    }
  }

  this.mouse = function(id,rect)
  {
    Node.call(this,id,rect);
    
  }

  this.router = function(id,rect)
  {
    Node.call(this,id,rect);
      
    this.query = function(q)
    {
      this.broadcast(q.target ? q.target : "home")
    }
  }
}
