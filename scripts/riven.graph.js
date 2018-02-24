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
      var pos = get_port_position(node.ports.in[id])
      ports_html += `<circle cx='${pos.x}' cy="${pos.y}" r="4" fill="black"/>`
    }
    for(id in node.ports.out){
      var pos = get_port_position(node.ports.out[id])
      ports_html += `<circle cx='${pos.x}' cy="${pos.y}" r="4" fill="black"/>`
      if(node.ports.out[id].route){
        var target = get_port_position(node.ports.out[id].route);
        ports_html += `<line x1="${pos.x}" y1="${pos.y}" x2="${target.x}" y2="${target.y}" stroke-width="2" stroke='black' stroke-linecap="round"/>`;
      }
    }

    return `
    <text x="${x}" y="${y+h+(grid_size)}" font-size='11' font-family='input_mono_regular' stroke-width='0' fill='#000'>${node.id}</text>
    <circle cx='${x}' cy="${y}" r="2" fill="black"/>
    <rect x=${x} y=${y} width="${w}" height="${h}" title="alt" stroke="#000" fill="none" stroke-width="1.5"/>
    ${ports_html}`
  }

  function get_port_position(port)
  {
    var is_in = Object.keys(port.host.ports.in).indexOf(port.id) > -1 ? true : false
    var grid_size = 20;
    var x = port.host.rect.x*grid_size;
    var y = port.host.rect.y*grid_size;
    var w = port.host.rect.w*grid_size;
    var h = port.host.rect.h*grid_size;
    var spacing = h/(Object.keys(port.host.ports[is_in ? "in" : "out"]).length)
    var count = Object.keys(port.host.ports[is_in ? "in" : "out"]).indexOf(port.id)

    return {x:is_in ? x : x+w,y:y+(count*spacing)+(spacing/2)}
  }
}