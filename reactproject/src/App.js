import React, { useState, useEffect, Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Select from 'react-select';
import axios from 'axios';




const display = {
  display: 'block'
};
const hide = {
  display: 'none'
};


const options = [
  { value: "First Name", label: "First Name", data: "first_name" },
  { value: "Last Name", label: "Last Name", data: "last_name" },
  { value: "Gender", label: "Gender", data: "gender" },
  { value: "Age", label: "Age", data: "age" },
  { value: "Account Name", label: "Account Name", data: "account_name" },
  { value: "City", label: "City", data: "city" },
  { value: "State", label: "State", data: "state" }
];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      toggle: false,
      arr: [],
      dropdownValue: "",
      saveInput: ""
    }
  }

  delete = (a) => {
    console.log(a)
    let c = this.state.arr;
    let d = c.filter(k => k != a)
    //c.remove(a)
    this.setState({
      arr: d
    })
    this.setState({
      dropdownValue: "",
    })
  }

  selectOption = (e) => {
    //console.log(e)
    this.setState({
      dropdownValue: e.value
    })
  }

  addValue = () => {
    let c = this.state.arr;
    c.push(this.state.dropdownValue)
    this.setState({
      arr: c
    })
  }

  addDrop = () => {
    let arr1 = []
    for (
      let a of this.state.arr
    ) {
      arr1.push(<div style={{ width: "65%" }} className="dropdown-container">
        <div style={{display: "flex", marginBottom: "5px"}}>
        <div class="indicator" style={{background: a == "First Name"| a == "Last Name" | a == "First Name" | a == "First Name" ? "green" : "red", paddingLeft: 10 }}></div>
        <div style={{paddingLeft: 10, width: "100%"}}><Select
          options={{ value: a, label: a }}
          defaultValue={{ value: a, label: a }}
        /> </div>
        <div style={{paddingLeft: 10}}><div className="minus" onClick={() => this.delete(a)}>-</div></div>
        </div>
      </div>)
    }
    return arr1;
  }

  toggle1 = () => {
   console.log( this.request())
   axios({
    method: "post",
    url: "https://webhook.site/56a8cdb8-ad2a-4421-98d3-04f55665cb3c",
    data: this.request(),
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
    this.toggle();
  }

  request = () => {
    let d2 = [];
    options.filter(option => {
      let c = 0
      for (
        let a of this.state.arr
      ) {

        if (option.value != a) {
          c++;
        }

      }
      if (c == 0) {
        
        let x = option.data
        let se = option.value
        let y = {}
        //y[x] = se
        d2.push({[x]:se})
      }
    })
    return(
      {
        "segment_name": this.state.saveInput,
        "schema": d2
      }
    )
    
  }

  toggle(event) {
    this.setState((prevState) => ({
      toggle: !prevState.toggle
    }));
    this.setState({arr: []})
    this.setState({dropdownValue: ""})
    this.setState({saveInput: ""})
  }
  render() {
    var modal = [];
    //console.log(this.state.dropdownValue)
    var select1 = this.addDrop();
    let d = [];
    options.filter(option => {
      let c = 0
      for (
        let a of this.state.arr
      ) {

        if (option.value == a) {
          c++;
        }

      }
      if (c == 0) {
        d.push(option)
      }
    })

    modal.push(
      <div className="modal" style={this.state.toggle ? display : hide}>
        <div className="modal-content">

          <div className="modal-header">
            <div onClick={this.toggle} className='close'> Back</div>
            <h3>Saving Segment</h3>
          </div>
          <div className="modal-details" style={{ padding: "20px", OverflowY: "scroll" }}>
            <div style={{ margin: "10px auto" }}>Enter the Name of the Segment</div>
            <div style={{ margin: "10px 0px", width: "65%" }}><input className="input-field" type="text" onChange={(e) => this.setState({ saveInput: e.target.value })} value={this.state.saveInput} /></div>
            <div style={{ margin: "15px auto" }}>To save your segment, you need to add the schemas to build the query</div>
            <div>
              <div>
                <div style={{display: "flex", marginLeft: "32%"}}>
                  <div style={{display: "flex"}}><div className="indicator1"></div>- User Traits</div>
                  <div style={{display: "flex", paddingLeft: 10}}><div className="indicator2"></div>- Group Traits</div>
                </div>
              </div>
            </div>
            <div className="modal-drop">{select1}</div>
            <div style={{ width: "65%", cursor: "pointer", marginBottom: "15px"}} className="dropdown-container">
              <Select style={{cursor: "pointer"}}
                options={d}
                placeholder="Add schema to segment"
                onChange={(e) => this.selectOption(e)}
                value={
                  d.filter(option =>
                    option.label === this.state.dropdownValue)
                } />

            </div>
            <div><a style={{cursor: "pointer"}} className="add-btn" onClick={this.addValue}>+ Add schema</a></div>
          </div>
          <div className="modal-footer">
              <button className="save-btn" onClick={this.toggle1}>Save the segment</button>
              <button className="close-btn" onClick={this.toggle}>Cancel</button>
            </div>
        </div>


      </div>
    );


    return (
      <div>
        <button className="save-segment1" onClick={this.toggle}>Save Segment</button>
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
