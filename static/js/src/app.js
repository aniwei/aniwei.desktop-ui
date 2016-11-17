import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
  render () {
    return <div className="view__content-app"></div>
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('viewMain')
)
