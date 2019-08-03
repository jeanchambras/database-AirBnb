import React from 'react'

const Result = props => {
    const limit = 300
    const isnotnull = props.home_summary != null
    return (
        <div className="box transparent-light space-bottom">
            <a className="result" href={props.listing_url}>
                <div className="columns">
                    <div className="column is-3">
                        <img src={props.home_url} alt="home" className="result-img" />
                    </div>
                    <div className="column is-9">
                        <h2 className="is-size-4 has-text-weight-bold"> {props.home_name} </h2>
                        <h3 className="is-size-8 has-text-weight-bold has-text-link">id : {props.id}</h3>
                        <p className="is-size-6" >{
                            isnotnull ? props.home_summary.substring(0, limit) + "..." : ""}</p>
                        <p className="is-size-4 has-text-weight-bold has-text-danger">{props.home_price} $</p>
                    </div>
                </div>
            </a>
        </div>);
}

export default Result;