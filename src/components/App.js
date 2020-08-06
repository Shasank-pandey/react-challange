import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import Loader from './Loader';

import { without, findIndex } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      formDisplay: false,
      lastIndex: 0,
      orderBy: 'petName',
      queryyText: '',
      orderDir: 'asc',
      loading: false
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointments = this.addAppointments.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApt = this.searchApt.bind(this);
    this.updateInfo = this.updateInfo.bind(this);


  }
  //opening and closing FORM
  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }
 //updating info of existing pet data
  updateInfo(name,value,id){
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments,{
      aptId: id
    });
    tempApts[aptIndex][name]= value;
    this.setState({myAppointments: tempApts});
  }
  changeOrder(order,dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  searchApt(query) {
    this.setState({queryyText:query});
  }
  addAppointments(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({myAppointments: tempApts,
    lastIndex: this.state.lastIndex +1
    });
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts
    });
  }

  componentDidMount() {
    this.setState({loading: true});
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({loading: false});
        this.setState({
          myAppointments: apts
        });
      });
  }

  render() {

    let order;
    let filteredApts= this.state.myAppointments;
    if(this.state.orderDir==='asc'){
      order=1;
    }
    else{
      order=-1;
    }
    filteredApts=filteredApts.sort((a,b)=>{
      if(a[this.state.orderBy].toLowerCase()< b[this.state.orderBy].toLowerCase()) {
        return -1*order;
      }
      else{
        return 1*order;
      }
    }).filter(eachItem=>{
      return(
        eachItem['petName'].toLowerCase().includes(this.state.queryyText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryyText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(this.state.queryyText.toLowerCase()) 
      )
    });
    //loader logic
    const load="";
    if(this.state.loading){
      const load=<Loader></Loader>;
    }

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointments={this.addAppointments}
                />
                <SearchAppointments
                orderBy={this.state.orderBy}
                orderDir={this.state.orderDir}
                changeOrder={this.changeOrder}
                searchApt={this.searchApt}
                />
                <ListAppointments
                  appointments={filteredApts}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}
                />
                <p>{load}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;