require('./css/main.scss')

document.write("<div id=\"app\"></div>")


import React,{Component} from 'react'
import { render,findDOMNode } from 'react-dom'
import Dragula from 'react-dragula'

let root = document.getElementById('app')
let cursor = {
  left:0,
  top:0
}
const options = {
  copy: false
}

class Root extends Component {
  render() {
    return (<div className='container'>
          <div data-id="1">1. XJW, I like U</div>
          <div data-id="2">2. XJW, I like U</div>
          <div data-id="3">3. XJW, I like U</div>
          <div data-id="4">4. XJW, I like U</div>
          <div data-id="5">5. XJW, I like U</div>
          <div data-id="6">6. XJW, I like U</div>
          <div data-id="7">7. XJW, I like U</div>
    </div>)
  }
  componentDidMount() {
    var container = findDOMNode(this);
    let drake = Dragula([container],options);
    drake.on('drop',function(el, target, source, sibdivng) {
      if(sibdivng){
        console.log(el.getAttribute("data-id"), sibdivng.getAttribute("data-id"))
      }else{
        console.log(el.getAttribute("data-id"), null)
      }
    })
  }
}

render(
  <Root />,
  root
)
