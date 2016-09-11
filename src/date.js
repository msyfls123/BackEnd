import React,{Component} from 'react'
import { render,findDOMNode } from 'react-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'babel-polyfill'
import fetch from 'isomorphic-fetch'

require('./css/react-datepicker.css')
require('./css/datepicker.css')

let root = document.getElementById('app')

class Root extends Component {
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.state={date:moment(),user:[]};
  }
  handleChange(date){
    // console.log(date._d.toLocaleString())
    let _this=this;
    var myForm = new FormData();
    myForm.append('date',date)
    fetch('/orm/get?date='+date,{method:'GET'})
    .then(response =>response.json())
    .then(json =>_this.setState(
      {
        date,
        user:json
      }
    ))

  }
  render(){
    let userTable = this.state.user.map((d,i)=>(
      <tr><td>{d.id}</td><td>{d.first_name+" "+d.lastName}</td><td>{new Date(d.createdAt).toLocaleString()}</td></tr>
    ))
    let dateNew = new Date(this.state.date)
    return (
      <div className="col-md-12">
        <h1> Datepicker </h1>
        <div className="form-group">
          <DatePicker
            dateFormat="YYYY年MM月DD日"
            isClearable={true}
            todayButton={'今日'}
            placeholderText="选择日期"
            selected={this.state.date}
            onChange={this.handleChange}
            className='dareyou' />
        </div>
        <div className="col-md-6">
              {(this.state.user.length>0)?(
                <table className="table table-striped">
                  <tr><th>ID</th><th>Name</th><th>Create Date</th></tr>
                  <tbody>
                    {userTable}
                  </tbody>
                </table>
              ):(
                <div className="alert alert-warning alert-dismissible" role="alert">
                  <strong>Warning!</strong><br/> We have not find any user created at {dateNew.getFullYear()+"年"+(dateNew.getMonth()+1)+"月"+dateNew.getDate()+"日"}
                </div>
              )}
        </div>
      </div>
      )
  }
}

render(
  <Root />,
  root
)
