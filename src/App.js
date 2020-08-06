import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
   state={
     filtervalue1: [
      {"cmpName":"tcs123", "email":"tcs@1"},
      {"cmpName":"cts235", "email":"cts@2"},
      {"cmpName":"ibm891", "email":"ibm@3"},
      {"cmpName":"kpmg569", "email":"kpmg@4"},
      {"cmpName":"intel257", "email":"intel@5"},
      {"cmpName":"dell986", "email":"dell@6"},
      {"cmpName":"fb777", "email":"fb@7"}
    ],
     filterValue2:["AWAITING DELIVERY","SEARCHING","OPEN ORDER","pending","Tax collected"],
     eval1:"",
     eval2: "",
     dumpArr:[],
     checkVal: true
   }

//logic
doFilter1=(e)=>{
  this.setState({eval1:e});
}

  doFilter2=(e)=>{
    this.setState({eval2:e});
  }
  componentWillMount() {
    console.log(this.state.checkVal);
    this.setState({ checkVal: !this.state.checkVal});
  }
  
  

  checkHandle=(ev,x)=>{
    //console.log(ev.checked);
    if(this.state.checkVal===false){
      var pp=[];
      pp.push(ev.value);
       var deletedBelow= x.splice(ev.value,1);
       this.setState({dumpArr: pp});
    }
    else if(ev.checked===true){
      console.log("yoooooooooo");
    }
    
    
    //console.log(this.state.filterValue2, "filter22222");
  }


 render(){
   //********* */
   const tempdata1=this.state.filtervalue1.filter(el=>{
     return (
      el['cmpName'].toLowerCase().includes(this.state.eval1.toLowerCase())
     )
   }).map(val=>{
    return <p  key={val.cmpName}><span><input type="radio"></input></span>{val.cmpName +"-"+ val.email}</p>
   });

   //********* */
   const tempdata2=this.state.filterValue2.filter(el1=>{
    return (
     el1.toLowerCase().includes(this.state.eval2.toLowerCase())
    )
  });

  // const addedVal= this.state.dumpArr();
  console.log(this.state.dumpArr);
   return(
      <div className="wrapper">
        <h3>first question</h3>
        <div>
          <input type="text" onChange={e=>this.doFilter1(e.target.value)}></input>
          <div>{tempdata1}</div>
        </div>
        <h3>Second Question</h3>
        <div>
          {
            this.state.dumpArr.map(el=>
              ( <p>{el}<input type="checkbox" defaultChecked={!this.state.checkVal} ></input></p>)
            )
          }
        </div>
        <input type="text" onChange={e=>this.doFilter2(e.target.value)}></input>
        <div>
            {
              tempdata2.map(val=>{
                return <p key={val}>{val}<input onChange={e=>this.checkHandle(e.target,this.state.filterValue2)} value={val} defaultChecked={this.state.checkVal} type="checkbox"></input></p>
              })
            }
        </div>
      </div>
   );
 }
}
export default App;
