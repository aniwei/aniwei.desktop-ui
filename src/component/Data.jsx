import React from 'react'
import ReactDom from 'react-dom'

export default class Data extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      request : []
    }
  }

  componentDidMount () {
    let socket = window.viewSocket

    socket.on('request', (data) => {
      let req = this.state.request

      req.push(data)

      this.setState({
        request: req
      })
    })

    socket.on('response', (data) => {
      let req = this.state.request,
          rid

      req.some((r, i) => {
        if(r.id == data.id) {
          return req[i] = data
        }
      })
    })
  }

  componentWillUnmount () {
    let socket = window.viewSocket

    socket.off('request')
  }

  renderRequestView () {
    let request = this.state.request

    return request.length ? request.map((req, i) => {
      return <Request
        key={i}
        url={req.url}
        ip={req.ip}
        protocol={req.protocol}
        method={req.method}
        code={req.code}
        time={req.endTime - req.startTime}/>
    }) : <EmptyRequest />
  }

  render () {
    return <div className="view__app-data">
        <div className="weui_panel">
          <div className="weui_panel_hd">请求即时数据</div>
          <div className="weui_panel_bd">
            {this.renderRequestView()}
          </div>
      </div>
    </div>
  }
}

class Request extends React.Component {

  render () {
    const { url,ip,method,code,time } = this.props

    return <div className="weui_media_box weui_media_small_appmsg">
                <div className="weui_cells weui_cells_access">
                    <a className="weui_cell" href="javascript:;">
                        <div className="weui_cell_hd"></div>
                        <div className="weui_cell_bd weui_cell_primary">
                          <div className="weui_media_desc">
                            {method} {url}
                          </div>
                        </div>
                        <span className="weui_cell_ft"></span>
                    </a>
                </div>
            </div>
  }
}

class EmptyRequest extends React.Component {
  render () {
    return <div className="weui_msg">
          <div className="weui_media_box weui_media_text">
            <div className="weui_icon_area"><i className="weui_icon_msg weui_icon_info"></i></div>
            <div className="weui_text_area">
            <p className="weui_msg_desc">这里什么也没有</p>
        </div>
      </div>
    </div>
  }
}
