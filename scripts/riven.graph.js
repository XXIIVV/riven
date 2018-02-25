function Riven_Graph()
{
  Riven.call(this);

  this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");

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
      if(port.routes.length > 0){
        for(route_id in port.routes){
          var route = port.routes[route_id];
          var target = get_port_position(route);
          ports_html += `<line x1="${pos.x}" y1="${pos.y}" x2="${target.x}" y2="${target.y}" stroke='black' stroke-linecap="round"/>`;
        }
      }
      ports_html += `<circle cx='${pos.x}' cy="${pos.y}" r="1.5" class='port input ${node.ports[id] && node.ports[id].route ? "route" : ""}'/>`
      // ports_html += id != 0 && id != node.ports.length-1 ? `<text class='input' x="${pos.x-10}" y="${pos.y}">(${id})${port.id}</text>` : ""
    }

    return `
    <text x="${rect.x}" y="${rect.y+rect.h+15}">${node.id}</text>
    <circle cx='${rect.x}' cy="${rect.y}" r="2" fill="black"/>
    <rect x=${rect.x} y=${rect.y} width="${rect.w}" height="${rect.h}" title="alt" stroke="#000" fill="none"/>
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
    return {x:index==port.host.ports.length-1 ? parseInt(rect.x+rect.w) : parseInt(rect.x),y:parseInt(rect.y+(index*space))}
  }

  function get_rect(node)
  {
    var grid = 20;
    var rect = node.parent ? get_rect(node.parent) : node.rect

    var x = node.rect.x * grid;
    var y = node.rect.y * grid;
    var w = node.rect.w * grid;
    var h = node.rect.h * grid;

    if(node.parent){
      var offset = get_rect(node.parent);
      x += offset.x;
      y += offset.y;
    }

    return {x:x,y:y,w:w,h:h}
  }
}