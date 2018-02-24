function Riven()
{
  var grid_size = 20;
  this.network = {}; // root:new Node(null,"root",{x:0,y:0,w:300,h:200})

  this.create = function(parent,name,rect,ports)
  {
    this.network[name] = new Node(this.network[parent],name,rect,ports)
  }

  this.connect = function(a,b)
  {
    var node_a = this.network[a.id]
    var port_a = node_a.ports.out[a.port] ? node_a.ports.out[a.port] : node_a.ports.in[a.port];
    if(!node_a){ console.warn(`Unknown node: ${a.id}`); return;}
    if(!port_a){ console.warn(`Unknown port: ${a.port}`); return;}
    var node_b = this.network[b.id]
    var port_b = node_b.ports.in[b.port] ? node_b.ports.in[b.port] : node_b.ports.out[b.port];
    if(!node_b){ console.warn(`Unknown node: ${b.id}`); return;}
    if(!port_b){ console.warn(`Unknown port: ${b.port}`); return;}
    port_a.connect(port_b);
  }

  this.bang = function(a)
  {
    this.network[a].bang();
  }

  function Node(parent,id,rect={x:0,y:0,w:5,h:5},ports={in:[],out:[]})
  {
    this.parent = parent;
    this.id = id;
    this.ports = {in:{},out:{}};
    for(direction in ports){
      var p = ports[direction];
      for(id in p){
        var port = p[id];
        this.ports[direction][port] = new Port(this,port)
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
    }

    function Port(host,id)
    {
      this.host = host;
      this.id = id;
      this.route = null;

      this.pos = function()
      {
        var x = this.host.rect.x*grid_size;
        var y = this.host.rect.y*grid_size;
        var w = this.host.rect.w*grid_size;
        var h = this.host.rect.h*grid_size;
        var spacing = h/(this.ports.in.length)
        return {x:x,y:y+(id*spacing)+(spacing/2)}; 
      }

      this.connect = function(b)
      {
        this.route = b
      }
    }
  }
}