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
}

function SumNode(id,rect={x:0,y:0,w:0,h:0})
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