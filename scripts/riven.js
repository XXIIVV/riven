function Ø()
{
  var grid_size = 20;
  this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.el.style.width = "100vw"
  this.el.style.height = "100vh"
  this.network = {root:new Node(null,"root",{x:0,y:0,w:30,h:15})};

  this.create = function(parent,name,rect,ports)
  {
    this.network[name] = new Node(parent,name,rect,ports)
  }

  this.connect = function(a,b)
  {
    // this.network[a].connect(this.network[b])
  }

  this.bang = function(a)
  {
    this.network[a].bang();
  }

  this.graph = function()
  {
    var html = "";

    for(id in this.network){
      var node = this.network[id];
      html += node.graph();
    }
    this.el.innerHTML = html;
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

    this.graph = function()
    {
      var x = this.rect.x*grid_size;
      var y = this.rect.y*grid_size;
      var w = this.rect.w*grid_size;
      var h = this.rect.h*grid_size;

      var ports_html = "";
      for(id in this.ports.in){
        var port = this.ports.in[id];
        var spacing = h/(this.ports.in.length)
        ports_html += `<circle cx='${x}' cy="${y+(id*spacing)+(spacing/2)}" r="4" fill="black"/>`
      }
      for(id in this.ports.out){
        var port = this.ports.out[id];
        var spacing = h/(this.ports.out.length)
        ports_html += `<circle cx='${x+w}' cy="${y+(id*spacing)+(spacing/2)}" r="4" fill="black"/>`
      }

      return `
      <text x="${x}" y="${y+h+(grid_size)}" font-size='11' font-family='input_mono_regular' stroke-width='0' fill='#000'>${this.id}</text>
      <circle cx='${x}' cy="${y}" r="2" fill="black"/>
      <rect x=${x} y=${y} width="${w}" height="${h}" title="alt" stroke="#000" fill="none" stroke-width="1.5"></rect>
      ${ports_html}`
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