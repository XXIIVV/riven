function Riven_Graph()
{
  Riven.call(this);

  var GRID_SIZE = 20

  this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  this.graph = function()
  {
    var html = "";
    for(id in this.network){
      var node = this.network[id];
      html += draw_routes(node);
    }
    for(id in this.network){
      var node = this.network[id];
      html += draw_node(node);
    }
    this.el.innerHTML = html;
  }

  function draw_routes(node)
  {
    var html = "";
    for(id in node.ports){
      var port = node.ports[id]
      var pos = port ? get_port_position(port) : {x:0,y:0}
      for(route_id in port.routes){
        var route = port.routes[route_id];
        if(route){
          html += route.port ? draw_connection(pos,get_port_position(route.port),route.type) : ""
        }
      }
    }
    return `<g id='routes'>${html}</g>`
  }

  function draw_node(node)
  {
    var rect = get_rect(node);

    var html = "";
    for(id in node.ports){
      html += draw_port(node.ports[id]);
    }

    return `
    <g id='node_${node.id}'>
      <rect rx='2' ry='2' x=${rect.x} y=${rect.y-(GRID_SIZE/2)} width="${rect.w}" height="${rect.h}" class='${node.children.length == 0 ? "fill" : ""}'/>
      <text x="${rect.x+(GRID_SIZE/2)}" y="${rect.y+3}">${node.id}</text>
      ${html}
    </g>`
  }

  function draw_port(port)
  {
    var pos = port ? get_port_position(port) : {x:0,y:0}
    var shape = `<circle cx='${pos.x}' cy="${pos.y}" r="${parseInt(GRID_SIZE/6)}" class='port ${port.type} ${port.host.ports[id] && port.host.ports[id].route ? "route" : ""}'/>`

    if(port.type == PORT_TYPES.request){
      shape = `<path d='${draw_diamond(pos)}' class='port ${port.type} ${port.host.ports[id] && port.host.ports[id].route ? "route" : ""}' />`;
    }
    return `
    <g id='${port.host.id}_port_${port.id}'>
      ${shape}
      <text x="${pos.x+(GRID_SIZE/2)}" y="${pos.y+3}">${port.id != 'in' && port.id != 'out' ? port.id : ''}</text>
    </g>`
  }

  function draw_connection(a,b,type)
  {
    var path = ""

    if(a.x == b.x || a.y == b.y){
      path = `M${a.x},${a.y} L${b.x},${b.y}`  
    }
    else if(distance(a,b) < 110 && diagonal(a,b)){
      path = `M${a.x},${a.y} L${b.x},${b.y}`  
    }
    else if(a.x > b.x){
      path = (a.y > b.y) ? `M${a.x},${a.y} L${a.x},${b.y+GRID_SIZE} L${a.x-GRID_SIZE},${b.y} L${b.x},${b.y}` : `M${a.x},${a.y} L${a.x},${b.y-GRID_SIZE} L${a.x-GRID_SIZE},${b.y} L${b.x},${b.y}`  
    }
    else if(a.x < b.x){
      path = (a.y > b.y) ? `M${a.x},${a.y} L${a.x},${b.y+GRID_SIZE} L${a.x+GRID_SIZE},${b.y} L${b.x},${b.y}` : `M${a.x},${a.y} L${a.x},${b.y-GRID_SIZE} L${a.x+GRID_SIZE},${b.y} L${b.x},${b.y}`  
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
    var space = port.host.ports.length > 1 ? rect.h/(port.host.ports.length-1) : 0;
    var offset = {input:0,output:0,request:0}
    for(id in port.host.ports){
      var p = port.host.ports[id]
      offset[p.type == PORT_TYPES.request || p.type == PORT_TYPES.input ? PORT_TYPES.input : p.type] += 1
      if(p.id == port.id){ break }
    }
    var horizontal = port.type == PORT_TYPES.output ? rect.x+rect.w : rect.x
    var vertical = rect.y + ((offset[p.type == PORT_TYPES.request || p.type == PORT_TYPES.input ? PORT_TYPES.input : p.type]-1)*GRID_SIZE)
    return {x:horizontal,y:vertical}
  }

  function get_rect(node)
  {
    var rect = node.rect

    var x = node.rect.x * GRID_SIZE;
    var y = node.rect.y * GRID_SIZE;
    var w = node.rect.w * GRID_SIZE;
    var h = node.rect.h * GRID_SIZE;

    if(node.parent){
      var offset = get_rect(node.parent);
      x += offset.x;
      y += offset.y;
    }

    return {x:x,y:y,w:w,h:h}
  }

  function distance(a,b)
  {
    return Math.sqrt( (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y) );
  }

  function diagonal(a,b)
  {
    return a.x == b.x || a.y == b.y || a.y - a.x == b.y - b.x || b.y - a.x == a.y - b.x
  }

  function draw_diamond(pos)
  {
    var r = GRID_SIZE/6
    return `M${pos.x-(r)},${pos.y} L${pos.x},${pos.y-(r)} L${pos.x+(r)},${pos.y} L${pos.x},${pos.y+(r)} Z`
  }
}