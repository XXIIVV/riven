function Riven()
{
  var grid_size = 20;
  this.network = {}; // root:new Node(null,"root",{x:0,y:0,w:300,h:200})

  this.create = function(parent,name,rect,p = ["entry","exit"])
  {
    var node = new Node(this.network[parent],name,rect)
    var ports = [];
    for(id in p){
      var port_id = p[id];
      ports.push(new Port(node,port_id))
    }
    node.ports = ports
    this.network[name] = node
  }

  this.clone = function(parent,name,rect,type)
  {
    var node = new BasicNode(this.network[parent],name,rect)   
    this.network[name] = node
    node.setup();
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

  function Node(parent,id,rect={x:0,y:0,w:5,h:5},ports=[])
  {
    this.parent = parent;
    this.id = id;
    this.ports = ports
    this.rect = rect;

    this.bang = function()
    {
      console.log("bang",this.id)
    }

    this.port = function(target)
    {
      for(id in this.ports){
        var port = this.ports[id];
        if(port.id == target){ return port; }
      }
    }
  }

  function Port(host,id)
  {
    this.host = host;
    this.id = id;
    this.routes = [];

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
      this.routes.push(Ø(b))
    }
  }

  function BasicNode(parent,id,rect={x:0,y:0,w:5,h:5})
  {
    Node.call(this,parent,id,rect);

    this.setup = function()
    {
      this.ports.push(new Port(this,"entry"))
      this.ports.push(new Port(this,"purple"))
      this.ports.push(new Port(this,"exit"))
    }
  }
}

function Ø(s,network = RIVEN.network)
{
  if(s.indexOf(" ") > -1){
    var node_id = s.split(" ")[0];
    var port_id = s.split(" ")[1];
    return network[node_id].port(port_id);
  }
  else{
    return network[node_id];
  }
}


