var router  = require('./router'),
    component


module.exports = function (app) {
  app.registerComponent(component = {
    name:     'config',
    text:     '工具配置',
    status:   true,
    readable: false
  })

  return function (req, res, next) {
    if(component.status) {
      return route.apply(this, arguments)
    }

    next()
  }
}

function route (req, res, next) {
  var host      = req.host,
      app       = req.app,
      config    = app.defaultConfig,
      url       = req.parsedProxyUrl;

  console.log(app.configure('static'))

  if(host == app.configure('static')) {
    return router.handle(req, res, next)
  }

  next()
}
