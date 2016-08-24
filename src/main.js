require('./css/main.scss')

document.write("<div id=\"app\"></div>")


import React,{Component} from 'react'
import { render } from 'react-dom'

let root = document.getElementById('app')

class Root extends Component {
  render() {
    return (
      <div>
        XJW，我好喜欢你啊!
      </div>
    )
  }
}

render(
  <Root />,
  root
)
