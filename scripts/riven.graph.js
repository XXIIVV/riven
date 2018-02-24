function Riven_Graph()
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
    var rect = get_rect(node);

    var ports_html = "";
    for(id in node.ports){
      var port = node.ports[id]
      var pos = get_port_position(port)
      if(port.route){
        var target = get_port_position(port.route);
        ports_html += `<line x1="${pos.x}" y1="${pos.y}" x2="${target.x}" y2="${target.y}" stroke-width="2" stroke='black' stroke-linecap="round"/>`;
      }
      ports_html += `<circle cx='${pos.x}' cy="${pos.y}" r="1.5" class='port input ${node.ports[id] && node.ports[id].route ? "route" : ""}'/>`
      ports_html += `<text class='input' x="${pos.x-10}" y="${pos.y}">${port.id}</text>`
    }

    return `
    <text x="${rect.x}" y="${rect.y+rect.h+15}">${node.id}</text>
    <circle cx='${rect.x}' cy="${rect.y}" r="2" fill="black"/>
    <rect x=${rect.x} y=${rect.y} width="${rect.w}" height="${rect.h}" title="alt" stroke="#000" fill="none" stroke-width="1.5"/>
    ${ports_html}`
  }

  function get_port_position(port)
  {    
    var rect = get_rect(port.host)
    var space = rect.h/(port.host.ports.length-1);
    var index = 0
    var space = rect.h/(port.host.ports.length-1);
    for(id in port.host.ports){
      if(port.host.ports[id].id == port.id){
        index = id
      }
    }
    return {x:rect.x,y:rect.y+(index*space)}
  }

  function get_rect(node)
  {
    var rect = node.parent ? get_rect(node.parent) : node.rect

    var x = (node.rect.x/100) * rect.w;
    var y = (node.rect.y/100) * rect.h;
    var w = (node.rect.w/100) * rect.w;
    var h = (node.rect.h/100) * rect.h;

    if(node.parent){
      var offset = get_rect(node.parent);
      x += offset.x;
      y += offset.y;
    }

    return {x:x,y:y,w:w,h:h}
  }
}