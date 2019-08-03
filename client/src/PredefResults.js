import React from 'react'


class PredefResults extends React.Component {

  constructor() {
    super();
    this.state = {
      result: []
    };
  }

  componentDidMount() {
  };

  render() {

    return (
      <div className="app bg">
        <div className="container ">
          <div className="center-screen">
            <a href="/" className="button has-text-danger has-text-weight-bold is-size-5 space-bottom">Return</a>
          </div>
        </div>
        <div className="results">
        </div>
      </div>)
  }
}
export default PredefResults