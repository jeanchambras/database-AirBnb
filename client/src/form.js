import React from 'react'

class Form extends React.Component {

	constructor() {
		super();
		this.state = {
			location: "1",
			form: false,
			listing_id: "",
			listing_id_delete: "",
			host_id_delete: "",
			listing_name: "",
			summary: "",
			price: "",
			host_name: "",
			neighbourhood: "",
			host_id: "",
			host_about: "",
			startDate: new Date()

		};
	};

	toggleForm = () => {
		this.setState({
			form: !this.state.form
		})
	};

	handleChange = (event) => {
		this.setState(
			{
				[event.target.name]: event.target.value
			}
		)

	}
	addHost = () => {
		const host_since = this.state.startDate.getFullYear() + "-" + (this.state.startDate.getMonth() + 1) + "-" + this.state.startDate.getDate()
		fetch('/addHost/?host_id=' + this.state.host_id + '&host_since=' +
			host_since + '&host_name=' +
			this.state.host_name.replace(" ", "_") + '&neighbourhood=' + this.state.neighbourhood.replace(" ", "_") + '&host_about=' + this.state.host_about.replace(" ", "_")).then((res) => { res.json() })
	};

	addListing = () => {
		fetch('/addListing/?listing_id=' + this.state.listing_id + '&host_id=' + this.state.host_id + '&price=' + this.state.price + '&listing_name=' +
			this.state.listing_name.replace(" ", "_") + '&summary=' + this.state.summary.replace(" ", "_")).then((res) => { res.json() })
	};


	deleteHost = () => {
		fetch('/deleteHost/?host_id=' + this.state.host_id_delete).then((res) => { res.json() })
	}

	deleteListing = () => {
		fetch('/deleteListing/?listing_id=' + this.state.listing_id_delete).then((res) => { res.json() })
	}

	componentWillMount() {
		if (this.props.location.data !== undefined) {
			this.setState({
				location: this.props.location.data.location
			})
		}
	};

	render() {
		console.log(this.state)
		return (
			<div className={this.state.location === "1" ? "bg berlin" : this.state.location === "2" ? "bg barcelona" : "bg madrid"}>
				<div className="container ">
					<div className="center-screen">
						<a href="/" className="button has-text-info has-text-weight-bold is-size-5 space-bottom">Return</a>
						<div className={!this.state.form ? "" : "not-visible"}>
							<div className="box has-background-info ">
								<button className="button is-inverted space-bottom is-info" onClick={this.toggleForm}>Add Host</button>
								<form action="">
									<div className="columns is-multiline">
										<div className="column is-6">
											<div className="field">
												<div className="control">
													<label className="label has-text-white">LISTING ID</label>
													<input className="input" name="listing_id" onChange={this.handleChange} value={this.state.listing_id} type="text" placeholder="listing" />
												</div>
											</div>
										</div>
										<div className="column is-6">
											<div className="field">
												<div className="control">
													<label className="label has-text-white">HOST ID</label>
													<input className="input" name="host_id" onChange={this.handleChange} value={this.state.host_id} type="text" placeholder="host" />
												</div>
											</div>
										</div>
										<div className="column is-6">
											<div className="field">
												<div className="control">
													<label className="label has-text-white">NAME</label>
													<input className="input" name="listing_name" onChange={this.handleChange} value={this.state.listing_name} type="text" placeholder="name"></input>
												</div>
											</div>
										</div>
										<div className="column is-6">
											<div className="field">
												<div className="control">
													<label className="label has-text-white">PRICE</label>
													<input className="input" name="price" onChange={this.handleChange} value={this.state.price} type="text" placeholder="price"></input>
												</div>
											</div>
										</div>
										<div className="column is-6">
											<div className="field">
												<label className="label has-text-white">SUMMARY</label>
												<div className="control">
													<textarea className="textarea" name="summary" onChange={this.handleChange} value={this.state.summary} placeholder="summary"></textarea>
												</div>
											</div>
										</div>
										<div className="column is-6">
											<div className="field">
												<label className="label has-text-white">VALIDATE </label>
												<div className="control">
													<div className="button is-inverted is-info  " onClick={this.addListing}>
														Add
    											</div>
												</div>
											</div>
										</div>

									</div>
								</form>
							</div>
							<div className="box has-background-info">
								<form action="">
									<div className="columns is-multiline">
										<div className="column is-6">
											<label className="label  has-text-white">Delete Host</label>

											<div className="field has-addons">
												<p className="control">
													<input className="input" name="host_id_delete" value={this.state.host_id_delete} type="text" placeholder="host" onChange={this.handleChange}></input>
												</p>
												<div className="control">
													<div className="button is-info is-inverted" onClick={this.deleteHost}>Delete Host</div>
												</div>
											</div>
										</div><div className="column is-6">
											<label className="label has-text-white ">Delete Listing</label>

											<div className="field has-addons">
												<p className="control">
													<input className="input" name="listing_id_delete" value={this.state.listing_id_delete} type="text" placeholder="listing" onChange={this.handleChange}></input>
												</p>
												<div className="control">
													<div className="button is-info  is-inverted" onClick={this.deleteListing}>Delete Listing</div>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>

						<div className={this.state.form ? "" : "not-visible"}>
							<div className="box">
								<button className="button space-bottom is-info" onClick={this.toggleForm}>Add Listing</button>
								<form action="">
									<div className="columns is-multiline">
										<div className="column is-6">
											<div className="field">
												<div className="control">
													<label className="label">HOST ID</label>
													<input className="input" name="host_id" onChange={this.handleChange} value={this.state.host_id} type="text" placeholder="host id"></input>
												</div>
											</div>
										</div>
										<div className="column is-6">
											<div className="field">
												<div className="control">
													<label className="label">HOST NAME</label>
													<input className="input" name="host_name" onChange={this.handleChange} value={this.state.host_name} type="text" placeholder="name"></input>
												</div>
											</div>
										</div>
										<div className="column is-6">
											<div className="field">
												<div className="control">
													<label className="label">HOST NEIGHBOURHOOD</label>
													<input className="input" name="neighbourhood" onChange={this.handleChange} value={this.state.neighbourhood} type="text" placeholder="name"></input>
												</div>
											</div>
										</div>
										<div className="column is-6">
											<div className="field">
												<label className="label ">HOST ABOUT</label>
												<div className="control">
													<textarea className="textarea" name="host_about" onChange={this.handleChange} value={this.state.host_about} placeholder="about"></textarea>
												</div>
											</div>
										</div>
										<div className="column is-6">
											<div className="field">
												<label className="label ">Validate</label>
												<div className="control">
													<div className="button  is-info  " onClick={this.addHost}>
														Add
													</div>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div className="box">
								<form action="">
									<div className="columns is-multiline">
										<div className="column is-6">
											<label className="label ">Delete Host</label>

											<div className="field has-addons">
												<p className="control">
													<input className="input" name="host_id_delete" value={this.state.host_id_delete} type="text" placeholder="host" onChange={this.handleChange}></input>
												</p>
												<div className="control">
													<div className="button is-info has-text-white" onClick={this.deleteHost} >Delete Host</div>
												</div>
											</div>
										</div><div className="column is-6">
											<label className="label ">Delete Listing</label>

											<div className="field has-addons">
												<p className="control">
													<input className="input" name="listing_id_delete" value={this.state.listing_id_delete} type="text" placeholder="listing" onChange={this.handleChange}></input>
												</p>
												<div className="control">
													<div className="button is-info has-text-white" onClick={this.deleteListing}>Delete Listing</div>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}
export default Form