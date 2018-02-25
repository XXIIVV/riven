function ConsoleNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    this.install("in")
  }

  this.query = function(q)
  {
    console.info(`console: ${q}`)
  }
}

function ValueNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    this.install("out")
  }

  this.query = function(q)
  {
    console.info(`console: ${q}`)
  }

  this.request = function()
  {
    return 2;
  }
}

function SumNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    this.install("out")
    this.install("in")
  }

  this.bang = function()
  {
    var value = 0
    for(id in this.ports){
      var port = this.ports[id];
      for(route_id in port.routes){
        var route = port.routes[route_id];
        if(route.type == "request"){
          value += route.port.host.request()
        }
      }
    }
    this.query(value);
  }
}

function BangNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    this.install("out")
    this.install("in")
  }

  this.query = function(q)
  {
    console.info(`console: ${q}`)
  }
}