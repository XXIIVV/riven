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
          html += route.port ? draw_connection(port,route.port) : ""
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
    <g class='node' id='node_${node.id}'>
      <rect rx='2' ry='2' x=${rect.x} y=${rect.y-(GRID_SIZE/2)} width="${rect.w}" height="${rect.h}" class='${node.children.length == 0 ? "fill" : ""}'/>
      <text x="${rect.x+(rect.w/2)}" y="${rect.y+rect.w+(GRID_SIZE/2)}">${node.id}</text>
      ${html}
    </g>`
  }

  function draw_port(port)
  {
    var pos = port ? get_port_position(port) : {x:0,y:0}
    var shape = `<circle cx='${pos.x}' cy="${pos.y}" r="${parseInt(GRID_SIZE/6)}" class='port ${port.type} ${port.host.ports[id] && port.host.ports[id].route ? "route" : ""}'/>`

    if(port.type == PORT_TYPES.request || port.type == PORT_TYPES.answer){
      shape = `<path d='${draw_diamond(pos)}' class='port ${port.type} ${port.host.ports[id] && port.host.ports[id].route ? "route" : ""}' />`;
    }
    return `
    <g id='${port.host.id}_port_${port.id}'>
      ${shape}
    </g>`
  }

  function draw_connection(a,b,type)
  {
    var pos_a = get_port_position(a)
    var pos_b = get_port_position(b)
    var pos_m = middle(pos_a,pos_b)
    var pos_c1 = {x:(pos_m.x+(pos_a.x+GRID_SIZE))/2,y:pos_a.y}
    var pos_c2 = {x:(pos_m.x+(pos_b.x-GRID_SIZE))/2,y:pos_b.y}

    var path = ""

    path += `M${pos_a.x},${pos_a.y} L${pos_a.x+GRID_SIZE},${pos_a.y} `
    path += `Q${pos_c1.x},${pos_c1.y} ${pos_m.x},${pos_m.y} `
    path += `Q ${pos_c2.x},${pos_c2.y} ${pos_b.x-GRID_SIZE},${pos_b.y}`
    path += `L${pos_b.x},${pos_b.y}`

    return `<path d="${path}" class='route ${type}'/>`
  }

  function get_port_position(port)
  {
    var rect = get_rect(port.host)

    var offset = {x:0,y:0}

    if(port.type == PORT_TYPES.output){
      offset.x += GRID_SIZE*2
      offset.y += GRID_SIZE/2
    }
    else if(port.type == PORT_TYPES.input){
      offset.x += 0
      offset.y += GRID_SIZE/2
    }
    else if(port.type == PORT_TYPES.answer){
      offset.x += GRID_SIZE
      offset.y -= GRID_SIZE*0.5
    }
    else if(port.type == PORT_TYPES.request){
      offset.x += GRID_SIZE
      offset.y += GRID_SIZE*1.5
    }
    return {x:rect.x+offset.x,y:rect.y+offset.y}
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

  function middle(a,b)
  {
    return {x:(a.x+b.x)/2,y:(a.y+b.y)/2}
  }

  function draw_diamond(pos)
  {
    var r = GRID_SIZE/6
    return `M${pos.x-(r)},${pos.y} L${pos.x},${pos.y-(r)} L${pos.x+(r)},${pos.y} L${pos.x},${pos.y+(r)} Z`
  }
}