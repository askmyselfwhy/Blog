import React, { Component } from 'react';

class Tables extends Component {
	state = {
		tables: [],
		tableData: {},
		table_name: '',
		numberOfRows: 10
	};
	componentDidMount() {
		fetch(`/tables/get_all`, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((result) =>
				this.setState({
					tables: result,
					table_name: result[0].table_name
				})
			);
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		let { table_name, numberOfRows } = this.state;
		fetch(`/tables?table_name=${table_name}&num=${numberOfRows}`, {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((result) =>
				this.setState({
					tableData: result
				})
			);
	};
	render() {
		let { tables, tableData } = this.state;
		return (
			<section>
				<form id="tables_form" onSubmit={this.handleSubmit} className="d-flex flex-column">
					<div className="row">
						<div className="form-group col-6">
							<label htmlFor="table">Table</label>
							<select
								id="table"
								name="table_name"
								type="text"
								className="form-control"
								onChange={this.handleChange}
							>
								{tables.map((item) => <option value={item.table_name}>{item.table_name}</option>)}
							</select>
						</div>
						<div className="form-group col-6">
							<label htmlFor="number">Number of rows</label>
							<input
								id="number"
								name="numberOfRows"
								type="number"
								className="form-control"
								onChange={this.handleChange}
								defaultValue={10}
							/>
						</div>
						<div className="form-group col-6">
							<button className="btn btn-success" type="submit">
								Get table data
							</button>
						</div>
					</div>
				</form>
				<div className="mt-2">
					{tableData.data &&
					tableData.data.length > 0 && (
						<table className="table table-dark table-bordered table-hover table-responsive-md text-center">
							<caption>{this.state.table_name}</caption>
							<thead>
								<tr>{tableData.fields.map((item) => <th className="align-middle">{item.name}</th>)}</tr>
							</thead>
							<tbody>
								{tableData.data.map((item) => (
									<tr>
										{Object.keys(item).map((key) => <td className="align-middle">{item[key]}</td>)}
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</section>
		);
	}
}
export default Tables;
