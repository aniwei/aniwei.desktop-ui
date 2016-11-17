import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'

export default class Tabbar extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    const { dataSource } = this.props

    let tab = dataSource.map((t, i) => <Tab key={i} text={t.text} link={t.link} icon={t.icon}/> )

    return <div className="view__app-tabbar weui_tabbar">
      {tab}
    </div>
  }
}

class Tab extends React.Component {
  render () {
    const { text, value, link, icon } = this.props

    let classes = ['iconfont', `icon-${icon}`].join(' ')

    return <Link to={link} className="weui_tabbar_item">
              <div className="weui_tabbar_icon">
                <i className={classes}></i>
              </div>
              <p className="weui_tabbar_label">{text}</p>
          </Link>
  }
}
