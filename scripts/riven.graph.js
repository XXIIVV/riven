function Riven_Graph()
{
  Riven.call(this);

  var PORT_SIZE = 2;

  this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  this.graph = function()
  {
    var html = "";

    for(id in this.network){
      var node = this.network[id];
      html += draw_node(node);
    }
    this.el.innerHTML = html;
  }

  function draw_node(node)
  {
    var rect = get_rect(node);

    var ports_html = "";
    for(id in node.ports){
      var port = node.ports[id]
      var pos = port ? get_port_position(port) : {x:0,y:0}
      for(route_id in port.routes){
        var route = port.routes[route_id];
        if(route){
          ports_html += route.port ? draw_connection(pos,get_port_position(route.port),route.type) : ""
        }
      }
      ports_html += `<circle cx='${pos.x}' cy="${pos.y}" r="${PORT_SIZE}" class='port input ${node.ports[id] && node.ports[id].route ? "route" : ""}'/>`
    }

    return `
    <g id='node_${node.id}'>
      <rect x=${rect.x} y=${rect.y} width="${rect.w}" height="${rect.h}" title="alt" stroke="#000" fill="none"/>
      <circle cx='${rect.x}' cy="${rect.y}" r="1.5" class='node'/>
      <text x="${rect.x+6}" y="${rect.y+rect.h-7.5}">${node.id}</text>
    ${ports_html}</g>`
  }

  function distance(a,b)
  {
    return Math.sqrt( (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y) );
  }

  function diagonal(a,b)
  {
    return a.x == b.x || a.y == b.y || a.y - a.x == b.y - b.x || b.y - a.x == a.y - b.x
  }

  function draw_connection(a,b,type)
  {
    var grid = 20;
    var path = ""

    if(distance(a,b) < 110 && diagonal(a,b)){
      path = `M${a.x},${a.y} L${b.x},${b.y}`  
    }
    else if(a.x > b.x){
      path = (a.y > b.y) ? `M${a.x},${a.y} L${a.x},${b.y+grid} L${a.x-grid},${b.y} L${b.x},${b.y}` : `M${a.x},${a.y} L${a.x},${b.y-grid} L${a.x-grid},${b.y} L${b.x},${b.y}`  
    }
    else if(a.x < b.x){
      path = (a.y > b.y) ? `M${a.x},${a.y} L${a.x},${b.y+grid} L${a.x+grid},${b.y} L${b.x},${b.y}` : `M${a.x},${a.y} L${a.x},${b.y-grid} L${a.x+grid},${b.y} L${b.x},${b.y}`  
    }
    else{
      path = `M${a.x},${a.y} L${b.x},${b.y}`  
    }

    return `<path d="${path}" class='route ${type}'/>`
  }

  function get_port_position(port)
  {
    var rect = get_rect(port.host)
    var space = rect.h/(port.host.ports.length-1);
    var index = 0
    var space = port.host.ports.length > 1 ? rect.h/(port.host.ports.length-1) : 0;
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
    var rect = node.rect

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