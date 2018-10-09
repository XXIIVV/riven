RIVEN.lib.Document = function (id, rect, ...params) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M150,60 L150,60 L60,150 L150,240 L240,150 Z'

  this.receive = function (content) {
    document.title = content.title
  }
}
