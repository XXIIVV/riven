function Ø()
{
  this.network = {};

  this.create = function(name)
  {
    this.network[name] = new Node(name)
  }

  this.connect = function(a,b)
  {
    this.network[a].connect(this.network[b])
  }

  this.bang = function(a)
  {
    this.network[a].bang();
  }

  this.graph = function()
  {
    return "hello"
  }

  function Node(id)
  {
    this.id = id;
    this.ports = {in:null,out:null};

    this.connect = function(b)
    {
      this.ports.out = b
    }

    this.bang = function()
    {
      console.log("bang",this.id)
      if(this.ports.out){
        this.ports.out.bang();  
      }
    }
  }
}