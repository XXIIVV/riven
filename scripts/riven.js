function Riven()
{
  var grid_size = 20;
  this.network = {root:new Node(null,"root",{x:0,y:0,w:30,h:15})};

  this.create = function(parent,name,rect,ports)
  {
    this.network[name] = new Node(this.network[parent],name,rect,ports)
  }

  this.connect = function(a,b)
  {
    // this.network[a].connect(this.network[b])
  }

  this.bang = function(a)
  {
    this.network[a].bang();
  }

  function Node(parent,id,rect={x:0,y:0,w:5,h:5},ports={in:[],out:[]})
  {
    this.parent = parent;
    this.id = id;
    this.ports = {in:[],out:[]};
    for(direction in ports){
      var p = ports[direction];
      for(id in p){
        var port = p[id];
        this.ports[direction].push(new Port(this,port))
      }
    }
    this.rect = rect;

    this.connect = function(b)
    {
      this.ports.out = b
    }

    this.bang = function()
    {
      console.log("bang",this.id)
      // if(this.ports.out){
      //   this.ports.out.bang();  
      // }
    }

    function Port(host,id)
    {
      this.host = host;
      this.id = id;

      this.pos = function()
      {
        var x = this.host.rect.x*grid_size;
        var y = this.host.rect.y*grid_size;
        var w = this.host.rect.w*grid_size;
        var h = this.host.rect.h*grid_size;
        var spacing = h/(this.ports.in.length)
        return {x:x,y:y+(id*spacing)+(spacing/2)}; //`<circle cx='${x}' cy="${y+(id*spacing)+(spacing/2)}" r="4" fill="black"/>`
      }
    }
  }
}