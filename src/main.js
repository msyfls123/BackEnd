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
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this)
    let newArray = []
    for (var i = 1; i < 8; i++) {
      newArray[newArray.length] = i.toString() + " Test"
    }
    this.state={data:newArray};
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className='container2 col-lg-6 table' ref='container'>
              {this.state.data.map((d,i) => (<div data-id={i} key={i}>{d}</div>))}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <input type="text" ref="input" className="form-control" placeholder="Add a text..."/>
              <span className="input-group-btn">
                <button className="btn btn-default glyphicon glyphicon-pencil" type="button" onClick={this.handleClick}></button>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    var container = this.refs.container;
    let drake = Dragula([container],options);
    drake.on('drop',function(el, target, source, sibdivng) {
      if(sibdivng){
        console.log(el.getAttribute("data-id"), sibdivng.getAttribute("data-id"))
      }else{
        console.log(el.getAttribute("data-id"), null)
      }
    })
  }
  handleClick(){
    if(!this.refs.input.value){return false}
    let newData = this.state.data.slice(0)
    newData[newData.length] = (newData.length+1).toString() + " " +this.refs.input.value
    this.refs.input.value=""
    this.setState({data:newData})
  }
}

render(
  <Root />,
  root
)
