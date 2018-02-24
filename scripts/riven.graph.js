Ø.prototype.graph = function()
{
  var html = "";

  for(id in this.network){
    var node = this.network[id];
    html += node.graph();
  }
  this.el.innerHTML = html;

  Node.prototype.graph = function()
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
}