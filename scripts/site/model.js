function Model()
{
  this.parser = function(id,rect)
  {
    Node.call(this,id,rect);

    this.receive = function(q)
    {
      var db = this.request();
      console.log(db)
    }
  }

  this.database = function(id,rect)
  {
    Node.call(this,id,rect);

    this.answer = function(q)
    {
      return {hello:"world"}
    }
  }
}
