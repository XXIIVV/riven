function Node(id)
{
  this.id = id
  this.ports = {in:null,out:null};

  this.bang = function()
  {
    console.log(`Bang! ${this.id}`)
    if(this.ports.out){
      this.ports.out.bang();  
    }
  }

  this.connect = function(target)
  {
    this.ports.out = target
  }
}

function Ø()
{
  this.connect = function(){
    return "hello"
  }
}