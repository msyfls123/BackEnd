import React,{Component} from 'react'
import { render,findDOMNode } from 'react-dom'

let root = document.getElementById('app')

class Root extends Component {
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.state={data:[]};
  }
  render() {
    var child = this.state.data.map(d => (
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src={d.img?d.img:"http://ugc.qpic.cn/baikepic2/0/ori-20160729074059-1586278401.jpg/800"} alt="..."/>
          <div className="caption">
            <h3>{d.name?d.name:"No Picture Selected"}</h3>
            <p dangerouslySetInnerHTML={{__html:(d.desc?d.desc:"No Description")}}></p>
          </div>
        </div>
      </div>
    ))
    return (
      <div>
        <h1 className="col-md-12">A Form</h1>
        {child}
        <form className="col-md-12" action="/api/upimg" method="post" encType='multipart/form-data'>
          <div className="input-group">
            <label htmlFor="file">Choose File</label>
            <input type="file" className="form-control" id="file" name="files" multiple accept="image/*" onChange={this.handleChange} />
          </div>
          <div className="input-group">
            <label>&nbsp;</label>
            <button type="submit" className="btn btn-primary btn-block"><span className="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;Confirm</button>
          </div>
        </form>
      </div>
    )
  }
  handleChange(e){
    var files = e.target.files; // FileList object
    var output = [],num=files.length,_this=this;
    for (var i = 0, f; f = files[i]; i++) {
      (function(f,i){
        var desc = '<strong>' + escape(f.name) + '</strong> (' + (f.type || 'n/a') + ') - ' +
                    f.size+ ' bytes, last modified: '+
                    f.lastModifiedDate.toLocaleDateString();
        var name = f.name;
        var reader = new FileReader();
        var img = null;
        reader.onload = function(e) {
          img = this.result;
        }
        reader.onloadend = function(e){
          output.push({
            name,
            img,
            desc
          })
          if(output.length==num){
            _this.setState({data:output})
          }
        }
        reader.readAsDataURL(f);
      })(f,i)
    }
  }
}

render(
  <Root/>,
  root
)
