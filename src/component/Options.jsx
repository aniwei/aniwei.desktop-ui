import React from 'react'
import ReactDom from 'react-dom'

export default class Options extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      options: []
    }
  }

  componentDidMount () {
    Zepto.ajax({
      url: '/options',
      success: (res) => {
        this.setState({
          options: res.data
        })
      }
    })
  }

  viewCell (options) {
    return options.map((option, i) => <Option
      {...option}
      key={i}
    />)
  }

  viewRow () {
    let options = this.state.options

    return options.map((option, i) => {
      return <div className="view__app-options-row" key={i}>
          <div className="weui_cells_title">{ option.title }</div>
          <div className="weui_cells weui_cells_form">
            {this.viewCell(option.value || [])}
          </div>
        </div>
    })
  }

  render () {
    return <div className="view__app-options">
      {this.viewRow()}
    </div>
  }
}

class Option extends React.Component {
  render () {
    const { readonly, text, value } = this.props

    return <div className="weui_cell">
            <div className="weui_cell_hd"><label className="weui_label">{text}</label></div>
            <div className="weui_cell_bd weui_cell_primary">
                <input className="weui_input" value={value} />
            </div>
        </div>
  }
}
