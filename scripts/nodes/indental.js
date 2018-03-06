function IndentalNode(id,rect)
{
  Node.call(this,id,rect);

  this.glyph = NODE_GLYPHS.database

  this.answer = function(q)
  {
    if(!DATABASE[this.id]){
      console.warn(`Missing /database/${this.id}.js`)
      return null;
    }
    return new Parser(DATABASE[this.id]).result;
  }

  function Parser(data)
  {
    this.result = parse(data)

    function parse(d)
    {
      var refs = refs_tree(d)
      return build(0,refs)
    }

    function build(target,tree)
    {
      var leaves = []
      var attributes = {}
      for(id in tree.lines){
        if(tree.refs[id]-1 == target){
          if(tree.lines[id].indexOf(" : ") > -1){
            var parts = tree.lines[id].split(" : ");
            var key = parts[0]
            var val = parts[1]
            attributes[key] = val
          }
          else{
            leaves.push(build(id,tree));
          }
        }
      }
      return {id:tree.lines[target],leaves:leaves,attr:attributes}
    }

    function refs_tree(d)
    {
      var l = d.split("\n");
      var stash = {};
      var prev = {indent:-1};
      var refs = []
      var tree = [];
      var i = 0
      for(id in l){
        var line = liner(l[id]); 
        if(line.skip){ continue; }
        stash[line.indent] = line.indent > prev.indent ? i : stash[line.indent];
        refs.push(stash[line.indent]);
        tree.push(line.content)
        prev = line
        i += 1
      }
      return {refs:refs,lines:tree};
    }

    function liner(line)
    {
      return {indent:line.search(/\S|$/),content:line.trim(),skip:line == "" || line.substr(0,1) == "~"}
    }
  }
}