import React, { Component } from 'react';
import './css/main.css';
// eslint-disable-next-line
// eslint-disable-next-line
import camp from "./camp.jpg"
// eslint-disable-next-line
import berlin from "./berlin-stadium.jpg"
// eslint-disable-next-line
import barnabeu from "./barnabeu.jpg"
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";


function validatee(guests) {
  return isNaN(guests)
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      guests: "",
      startDate: new Date(),
      endDate: new Date(),
      location: "1",
      search: ""
    };
  }


  handleSearch = e =>
    this.setState({
      search: e.target.value
    });

  handleChangeGuests = evt => {
    this.setState({ guests: evt.target.value })
  };

  handleChangeStartDate = date => {
    this.setState({
      startDate: date,
      endDate: date
    });
  }
  handleChangeEndDate = date => {
    this.setState({
      endDate: date
    });
  }
  handleChangeSel = sel => {
    console.log(sel.target.value)
    this.setState({
      location: sel.target.value
    });
  }

  render() {
    const error = validatee(this.state.guests);
    return (
      <div className="App">
        <div className={this.state.location === "1" ? "blur bg berlin" : this.state.location === "2" ? "blur bg barcelona" : "blur bg madrid"}></div>
        {/* <div className="logo"><img src={logo} alt="logo" /></div> */}
        <div className="container is-narrow">

          <div className="columns has-text-right">
            <div className="column is-6 has-text-right">

              <div className="field has-addons">
                <div className="control search">
                  <input className="input" type="text" onChange={this.handleSearch} placeholder="Search..."></input>
                </div>
                <div className="control">
                  <Link to={{
                    pathname: "/results",
                    data: {
                      search: this.state.search,
                      guests: null,
                      startDate: null,
                      endDate: null,
                      location: this.state.location
                    }
                  }}>
                    <div className="button is-info has-text-white has-text-weight-bold" > Search</div> </Link>
                </div>

              </div>


            </div>
            <div className="column is-6 has-text-right">
              <Link to={{
                pathname: "/form",
                data: { location: this.state.location }
              }}>
                <div className="button is-info has-text-white has-text-weight-bold"> Log in DB </div></Link>
            </div>
          </div>
          <div className="box transparent-light box-search">
            <div className="columns is-multiline has-text-grey-darker is-vcentered ">
              <div className="column is-full has-text-weight-bold is-size-2 is-size-4-mobile">
                Book unique homes and experiences.
              </div>
              <div className="column is-half has-text-weight-bold is-size-5">
                <p>
                  From
                </p>
                {/* <input className="input " type="text" placeholder="mm/dd/yyyy" ></input> */}
                <DatePicker
                  className="input"
                  selected={this.state.startDate}
                  onChange={this.handleChangeStartDate}
                />
              </div>
              <div className="column is-half has-text-weight-bold is-size-5">
                <p>
                  To
                </p>
                {/* <input className="input " type="text" placeholder="mm/dd/yyyy" ></input> */}
                <DatePicker
                  className="input"
                  selected={this.state.endDate}
                  onChange={this.handleChangeEndDate}
                  minDate={this.state.startDate}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                />
              </div>
              <div className="column is-half has-text-weight-bold is-size-5">
                Location
                <div className="field">
                  <div className="control">
                    <div className="select">
                      <select id="sel" onChange={this.handleChangeSel}>
                        <option value="1">Berlin</option>
                        <option value="2">Barcelone</option>
                        <option value="3">Madrid</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-half  has-text-weight-bold is-size-5">
                <p>Guests <span className="is-size-7 has-text-danger "> {error ? "only number" : ""} </span> </p>
                <div className="field has-addons">
                  <p className="control">
                    <input className={"input " + (error ? "is-danger" : " ")} value={this.state.guests} type="text" placeholder="Guests" onChange={this.handleChangeGuests}></input>
                  </p>
                  <div className="control">
                    <Link to={{
                      pathname: "/results",
                      data: {
                        guests: this.state.guests,
                        startDate: this.state.startDate.getFullYear() + "-" + (this.state.startDate.getMonth() + 1) + "-" + this.state.startDate.getDate(),
                        endDate: this.state.endDate.getFullYear() + "-" + (this.state.endDate.getMonth() + 1) + "-" + this.state.endDate.getDate(),
                        location: this.state.location,
                        search: null
                      }
                    }}> <div className="button is-info has-text-white" href="/results" >Search </div></Link>
                  </div>
                </div>
              </div>
              <div className="column is-half has-text-weight-bold is-size-5 ">
                <Link to={{
                  pathname: "/predefined",
                  data: {
                    location: this.state.location
                  }
                }}>
                  <div className="button is-info has-text-white">Predefined Queries</div></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
