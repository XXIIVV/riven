RIVEN.lib.Router = function (id, rect) {
  RIVEN.Node.call(this, id, rect)

  this.glyph = 'M60,120 L60,120 L150,120 L240,60 M60,150 L60,150 L240,150 M60,180 L60,180 L150,180 L240,240'

  this.receive = function (q) {
    var db = this.request('database').database

    var type = find(q, db)

    this.label = `router:${type}/${q}`
    this.send({
      name: q,
      type: type,
      result: db[type] ? db[type][q] : null,
      tables: db
    })
  }

  function find (key, db) {
    for (id in db) {
      var table = db[id]
      if (table[key]) {
        return id
      }
    }
    return null
  }
}
