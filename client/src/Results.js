import React from 'react'
import Result from './result'

class Results extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      location: "1"
    };
    console.log(props.location)
  }


  componentWillMount() {
    if (this.props.location.data !== undefined) {
      this.setState({
        location: this.props.location.data.location
      })
    }

  }
  componentDidMount() {


    if (this.props.location.data !== undefined) {
      if (this.props.location.data.search === null) {
        fetch('/lookup/?startDate=' + this.props.location.data.startDate + '&endDate=' + this.props.location.data.endDate + '&location=' + this.props.location.data.location
          + '&guests=' + this.props.location.data.guests).then((res) => {
            res.json().then(
              (data) => {
                this.setState(
                  {
                    homes: data.rows
                  }
                )
              }
            )

          })
      } else {
        fetch('/search/?search=' + this.props.location.data.search.replace(" ", "_")).then((res) => {
          res.json().then(
            (data) => {
              this.setState(
                {
                  homes: data.rows
                }
              )
            }
          )

        })
      }
    }
    else {
      fetch('/test').then((res) => {
        res.json().then(
          (data) => {
            this.setState(
              {
                homes: data.rows
              }
            )
          }
        )

      })
    }

  };

  render() {
    const items = this.state.homes.map((home, key) =>
      <li key={home.LISTING_ID}>
        <Result
          home_url={home.PICTURE_URL}
          home_name={home.NAME}
          home_price={home.PRICE}
          home_summary={home.SUMMARY}
          listing_url={home.LISTING_URL}
          id={home.LISTING_ID}
        />
      </li>
    );
    return (
      <div className={this.state.location === "1" ? "bg berlin" : this.state.location === "2" ? "bg barcelona" : "bg madrid"}>
        <div className="container ">
          <div className="center-screen">
            <a href="/" className="button has-text-info has-text-weight-bold is-size-5 space-bottom">Return</a>
            <ul>
              {items}
            </ul>
          </div>
        </div>
        <div className="results">
        </div>
      </div>)
  }
}
export default Results