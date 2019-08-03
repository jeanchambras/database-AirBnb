import React from 'react'
import { JsonToTable } from "react-json-to-table";

class Predefined extends React.Component {

  constructor() {
    super();
    this.state = {
      results: [],
      active: false,
      location: "1"
    };
  }

  toggleClose = () => {
    this.setState({
      active: !this.state.active
    });
  };

  query = (e) => {
    fetch(e).then((res) => {
      res.json().then(
        (data) => {
          this.setState(
            {
              results: data.rows
            }
          )
        }
        , (r) => {
          this.setState(
            {
              results: []
            }
          )
        })
      if (!this.state.active) {
        this.toggleClose()
      }
    })
  }
  componentWillMount() {
    if (this.props.location.data !== undefined) {
      this.setState({
        location: this.props.location.data.location
      })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }



  render() {

    return (
      <div className={this.state.location === "1" ? "bg berlin" : this.state.location === "2" ? "bg barcelona" : "bg madrid"}>
        <div className="container">
          <div className={this.state.active ? "box result-predef " : "box result-predef not-visible"}>
            <div onClick={this.toggleClose} className="button has-text-danger has-text-weight-bold is-size-5 space-bottom">X</div>
            <JsonToTable json={this.state.results} />
          </div>
        </div>
        <div className="container ">
          <div className="center-screen">
            <a href="/" className="button has-text-info has-text-weight-bold is-size-5 space-bottom">Return</a>
            <div className="columns is-multiline has-text-centered">
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q1")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">What is the average price for a listing with 8 bedrooms? </p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q2")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">What is the average cleaning review score for listings with TV?  </p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q3")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7" >Print all the hosts who have an available property between date 03.2019 and 09.2019</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q4")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7" >Print how many listing items exist that are posted by two different hosts but the hosts have the same
name.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q5")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Print all the dates that 'Viajes Eco' has available accommodations for rent. </p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q6")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Find all the hosts (host_ids, host_names) that have only one listing.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q7")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">What is the difference in the average price of listings with and without Wifi.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q8")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">How much more (or less) costly to rent a room with 8 beds in Berlin compared to Madrid on average?</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q9")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Find the top-10 (in terms of the number of listings) hosts (host_ids, host_names) in Spain.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q10")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Find the top-10 rated (review_score_rating) apartments (id,name) in Barcelona.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q11")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Print how many hosts in each city have declared the area of their property in square feet. Sort the
output based on the city name in ascending order.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q12")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">. The quality of a neighborhood is defined based on the number of listings and the review score of these
  listings, one way for computing that is using the median of the review scores, as medians are more
  robust to outliers. Find the top-5 neighborhoods using median review scores (review_scores_rating) of
  listings in Madrid. Note: Implement the median operator on your own, and do not use the available
built-in operator.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q13")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Find all the hosts (host_ids, host_names) with the highest number of listings.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q14")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Find the 5 most cheapest Apartments (based on average price within the available dates) in Berlin
  available for at least one day between 01-03-2019 and 30-04-2019 having at least 2 beds, a location
review score of at least 8, flexible cancellation, and listed by a host with a verifiable government id.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q15")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Each property can accommodate different number of people (1 to 16). Find the top-5 rated
  (review_score_rating) listings for each distinct category based on number of accommodated guests
with at least two of these facilities: Wifi, Internet, TV, and Free street parking.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q16")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">What are top three busiest listings per host? The more reviews a listing has, the busier the listing is.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q17")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">What are the three most frequently used amenities at each neighborhood in Berlin for the listings with
“Private Room” room type?</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q18")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">What is the difference in the average communication review score of the host who has the most
  diverse way of verifications and of the host who has the least diverse way of verifications. In case of a
  multiple number of the most or the least diverse verifying hosts, pick a host one from the most and
one from the least verifying hosts.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q19")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">What is the city who has the highest number of reviews for the room types whose average number of
accommodates are greater than 3.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q20")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Print all the neighborhoods in Madrid which have at least 50 percent of their listings occupied at some
date in year 2019 and their host has joined airbnb before 01.06.2017.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q21")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Print all the countries that had at least 20% of their listings available at some date in year 2018.</p>
                </div>
              </div>
              <div className="column is-4 space-bottom ">
                <div className="box transparent-light query">
                  <div onClick={() => this.query("/q22")} className="button is-info has-text-white has-text-weight-bold space-bottom">query</div>
                  <p className="is-size-7">Print all the neighborhoods in Barcelona where more than 5 percent of their accommodation’s
cancelation policy is strict with grace period.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="results">
        </div>
      </div>)
  }
}
export default Predefined