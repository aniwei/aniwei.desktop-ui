import React from 'react'
import ReactDom from 'react-dom'
import Tabbar from './component/tabbar'
import About from './component/about'
import Data from './component/data'
import Config from './component/config'
import Options from './component/options'
import Navigation from './component/Navigation'
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

class App extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.menus = [
      {text: '实时数据', link: '/data', icon: 'net' },
      {text: '代理配置', link: '/options', icon: 'config' },
      {text: '插件配置', link: '/config', icon: 'plugin' }
    ]

  }

  render () {
    return <div className="view__app-main">
      <div className="view__app-nav">
        <Navigation />
      </div>
      <div className="view__app-scene">
        <div className="view__app-scene-main">
          {this.props.children}
        </div>
        <div className="view__app-scene-helper">
        </div>
      </div>
      <Tabbar dataSource={this.menus}/>
    </div>
  }
}

ReactDom.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Data}/>
      <Route path="data" component={Data}/>
      <Route path="Options" component={Options}/>
      <Route path="config" component={Config}/>
    </Route>
  </Router>,
  document.getElementById('appMain')
)
