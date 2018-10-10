'use strict'

RIVEN.lib.Print = function (id, rect) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M65,65 L65,65 L245,65 M65,125 L65,125 L245,125 M65,185 L65,185 L245,185 M65,245 L65,245 L245,245 '

  this.receive = function (q) {
    this.label = `${q}`
    this.send(q)
  }
}
