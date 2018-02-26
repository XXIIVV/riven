function ConsoleNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    this.install("in",true)
    this.install("error",true)
  }

  this.query = function(q)
  {
    console.info(`console:`,q)
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

  this.query = function(q)
  {
    console.info(`console: ${q}`)
  }
}

function RenderNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    this.install("in")
  }

  this.query = function(q)
  {
    document.getElementById("render").innerHTML = q
  }
}

function ParentNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.setup = function()
  {

  }
  
  this.query = function(q)
  {
    this.children[0].query(q);
  }
}

function RequestNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.query = function()
  {
    var payload = {hash:window.location.hash.substring(1).toLowerCase()}
    var port = this.port("out")
    for(route_id in port.routes){
      var route = port.routes[route_id];
      if(route){
        route.port.host.query(payload)  
      }
    }
  }
}

function RouterNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.query = function(q)
  {
    var payload = {hash:window.location.hash.substring(1).toLowerCase()}
    var port = this.port("out")
    for(route_id in port.routes){
      var route = port.routes[route_id];
      if(route){
        route.port.host.query({page:q.hash})  
      }
    }
  }
}