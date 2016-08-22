require('./css/main.scss')

document.write("<div id=\"app\"></div>")


import React,{Component} from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, Link } from 'react-router';

let root = document.getElementById('app')

class Root extends Component {
  render() {
    return (
      <div>
        XJW，我好喜欢你 !
      </div>
    )
  }
}

render(
  <Root />,
  root
)
