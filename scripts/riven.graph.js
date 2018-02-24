function Ø()
{
  Riven.call(this);

  this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.el.style.width = "100vw"
  this.el.style.height = "100vh"

  this.graph = function()
  {
    var html = "";

    for(id in this.network){
      var node = this.network[id];
      html += draw(node);
    }
    this.el.innerHTML = html;
  }

  function draw(node)
  {
    var grid_size = 20;

    var x = node.rect.x*grid_size;
    var y = node.rect.y*grid_size;
    var w = node.rect.w*grid_size;
    var h = node.rect.h*grid_size;

    var ports_html = "";
    for(id in node.ports.in){
      var port = node.ports.in[id];
      var spacing = h/(node.ports.in.length)
      ports_html += `<circle cx='${x}' cy="${y+(id*spacing)+(spacing/2)}" r="4" fill="black"/>`
    }
    for(id in node.ports.out){
      var port = node.ports.out[id];
      var spacing = h/(node.ports.out.length)
      ports_html += `<circle cx='${x+w}' cy="${y+(id*spacing)+(spacing/2)}" r="4" fill="black"/>`
    }

    return `
    <text x="${x}" y="${y+h+(grid_size)}" font-size='11' font-family='input_mono_regular' stroke-width='0' fill='#000'>${node.id}</text>
    <circle cx='${x}' cy="${y}" r="2" fill="black"/>
    <rect x=${x} y=${y} width="${w}" height="${h}" title="alt" stroke="#000" fill="none" stroke-width="1.5"/>
    ${ports_html}`
  }
}