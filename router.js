var express = require('express'),
    router  = express.Router(),
    path    = require('path'),
    _       = require('lodash'),
    os      = require('os')

module.exports = router;

router.use('/', function(req, res, next){
  var app       = req.app,
      query     = req.query || {},
      url       = req.parsedProxyUrl,
      proxyUrl  = app.configure('static')

  if(!(url.pathname == '/')) {
    return next()
  }

  app.ip = app.configure('ip')

  if(!query.ip || !(query.ip == app.ip)) {
    proxyUrl = 'http://' + proxyUrl + '?ip=' + app.ip

    return res.redirect(proxyUrl)
  }

  next()
})

router.use(express.static(path.join(__dirname, 'static')))

router.use('/download', function (req, res) {
  var app = req.app

  res.sendfile(app.directory.publicName)
})

router.use('/console', function(req, res){
  console.log(req.query)

  res.send({
    code: 0,
    message: 'ok',
    data: null
  })
})

router.use('/options', function(req, res){
  var app     = req.app,
      query   = req.query

  res.send({
    code: 0,
    message: 'ok',
    data: [
      {
        title: '通用设置',
        type: 'default',
        value: [
          {text: '代理端口', value: app.get('proxy port'), readonly: true },
          {text: '证书地址', value: app.get('proxy catelog'), readonly: true },
          {text: '配置地址', value: app.get('proxy static'), readonly: false }
        ]
      }, {
        title: '域名配置',
        type: 'hostname',
        value: [
          {text: '代理端口', value: app.get('proxy port'), readonly: true },
          {text: '代理端口', value: app.get('proxy port'), readonly: true },
          {text: '代理端口', value: app.get('proxy port'), readonly: true },
        ]
      }
    ]
  })
})

router.use('/component', function (req, res) {
  var app   = req.app,
      query = req.query,
      mid   = app.configure('midway'),
      type  = query.type,
      comp  = query.component

  if(comp) {
    comp = JSON.parse(comp)
  }

  type == 'save' ? mid.some(function(cmp, i){
    if(cmp.name == comp.name) {
      return _.assign(cmp, comp),res.send({
        code: 0,
        message: 'ok',
        data: null
      })
    }
  }) : res.send({
    code: 0,
    message: 'ok',
    data: mid.filter(function(cmp){
      if(cmp.readable) {
        return true
      }

      return false
    })
  })
})

//阻塞静态资源404防止走其他中间件
router.use(function(){})
