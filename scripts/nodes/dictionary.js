function DictionaryNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS.database

  this.answer = function(q)
  {
    if(!DICTIONARY[this.id]){
      console.warn(`Missing /dictionary/${this.id}.js`)
      return null;
    }
    return new Parser(DICTIONARY[this.id]);
  }

  function Parser(raw)
  {
    this.raw = raw;
    this.hash = {};

    this.parse = function(raw = this.raw)
    {
      var prev_key = null;
      var prev_attr = null;
      var lines = raw.split("\n");
      for(id in lines){

        var indent = lines[id].search(/\S|$/) ; 
        var line = lines[id].trim(); 
        var line_lc = line.toLowerCase();
        var prev_test = null
        if(line == "" || line.substr(0,1) == "~"){ continue; }

        if(indent == 0){
          this.hash[line_lc] = {}
          prev_key = line_lc;
        }
        else if(indent == 2){
          if(line.indexOf(" : ") > -1){
            var parts = line.split(" : ")
            this.hash[prev_key][parts[0].toLowerCase()] = parts[1];
          }
          else if(prev_key && this.hash[prev_key]){
            this.hash[prev_key][line_lc] = []
            prev_attr = line_lc;  
          }
        }
        else if(indent == 4){
          if(line.indexOf(" : ") > -1){
            var parts = line.split(" : ")
            this.hash[prev_key][prev_attr][parts[0].toLowerCase()] = parts[1];
          }
          else if(prev_key && prev_attr && this.hash[prev_key][prev_attr]){
            this.hash[prev_key][prev_attr].push(line)
          }
        }
      }
      console.log("hash","parsed "+Object.keys(this.hash).length+" entries")
    }
    this.parse(this.raw);
  }
}

var DICTIONARY = {};