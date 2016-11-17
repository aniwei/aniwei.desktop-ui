import React from 'react'
import ReactDom from 'react-dom'

export default class Config extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      component: []
    }
  }

  componentDidMount () {
    let Zepto = window.Zepto

    Zepto.ajax({
      url: './component',
      data: {
        type: 'read'
      },
      success: (res) => {
        let data = res.data

        this.setState({
          component: data
        })
      }
    })
  }

  onChange (cmp, e) {
    let component = this.state.component

    component.some((c) => {
      if(cmp == c) {
        c.status = !c.status
      }
    })

    this.setState({
      component : component
    })



    Zepto.ajax({
      url: './component',
      data: {
        type: 'save',
        component: JSON.stringify(cmp)
      },
      success: () => {

      }
    })
  }

  renderComponent () {
    let component = this.state.component,
        that      = this

    return component.map((cmp, i) =>
        <div className="weui_cell weui_cell_switch" key={i}>
            <div className="weui_cell_hd weui_cell_primary">{cmp.text}({cmp.name})</div>
            <div className="weui_cell_ft">
                <input className="weui_switch"
                  type="checkbox"
                  checked={cmp.status ? true : false}
                  onChange={(e) => this.onChange.call(this, cmp, e)}/>
            </div>
        </div>)
  }

  emptyComponent () {
    return <div className="weui_msg">
          <div className="weui_media_box weui_media_text">
            <div className="weui_icon_area"><i className="weui_icon_msg weui_icon_info"></i></div>
            <div className="weui_text_area">
            <p className="weui_msg_desc">正在加载...</p>
        </div>
      </div>
    </div>
  }

  render () {
    const { component } = this.state

    return <div className="view__app-config">
      <div className="weui_cells weui_cells_form">
        { component.length === 0 ? this.emptyComponent() : this.renderComponent() }
      </div>
    </div>
  }
}
