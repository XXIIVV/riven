function ConsoleNode(id,rect={x:0,y:0,w:3,h:2})
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    this.install("in",PORT_TYPES.input)
    this.install("error",PORT_TYPES.input)
    this.install("preview",PORT_TYPES.input)
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
    this.install("out",PORT_TYPES.output)
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

  this.render_el = document.createElement("div");
  this.render_el.id = "render"

  this.setup = function()
  {
    this.install("in",PORT_TYPES.input)
  }

  this.query = function(q)
  {
    this.render_el.innerHTML = q
  }
}

function ParentNode(id,rect={x:0,y:0,w:0,h:0})
{
  Node.call(this,id,rect);

  this.setup = function()
  {

  }
}

function RequestNode(id,rect)
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

function RouterNode(id,rect)
{
  Node.call(this,id,rect);

  this.query = function(q)
  {
    this.broadcast(q.target ? q.target : "home")
  }
}

function ParserNode(id,rect) // Find the model type from the database
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    console.log("!!")
    this.install("out",PORT_TYPES.output)
    this.install("in",PORT_TYPES.input)
    this.install("db",PORT_TYPES.request)
    this.rect.h = 2
  }

  this.query = function(q)
  {
    var recipes = this.port("db").request("recipes")
    var ingredients = this.port("db").request("ingredients")

    var payload = "Something"
    if(q == "home"){
      this.port("out").signal("model_home").query("homepage data");
    }
    if(recipes[q]){
      this.port("out").signal("model_recipes").query("recipe data");
    }
    else{
      this.port("out").signal(`model_404`).query("404 data")
    }
  }
}

function DatabaseNode(id,rect) // Find the model type from the database
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    this.install("in",PORT_TYPES.input)
  }

  this.answer = function(q)
  {
    return {cake:{ingredients:[]}}
  }
}

function TemplaterNode(id,rect) // Find the model type from the database
{
  Node.call(this,id,rect);

  this.setup = function()
  {
    this.install("out",PORT_TYPES.output)
    this.install("in",PORT_TYPES.input)
    this.install("elements",PORT_TYPES.request)
    this.rect.h = 2
  }

  this.query = function(q)
  {
    var header = this.port("elements").request("header")
    console.log(header)
  }
}