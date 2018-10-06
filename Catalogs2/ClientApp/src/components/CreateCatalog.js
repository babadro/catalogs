import React, { Component } from 'react';

export class CreateCatalog extends Component {
    displayName = CreateCatalog.name

    constructor(props) {
        super(props);
        this.state = { catalogName: '', fieldName: '', fieldType: '', fields: [] };

        this.changeCatalogName = this.changeCatalogName.bind(this);
        this.changeFieldName = this.changeFieldName.bind(this);
        this.changeFieldType = this.changeFieldType.bind(this);
        this.addField = this.addField.bind(this);
        this.removeField = this.removeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.idGenerator = 0;
    }

    changeCatalogName(event) {
        this.setState({ catalogName: event.target.value });
    }

    changeFieldName(event) {
        this.setState({ fieldName: event.target.value });
    }

    changeFieldType(event) {
        this.setState({ fieldType: event.target.value });
    }

    addField() {
        if (!this.state.fieldName || !this.state.fieldType)
            return;
        let fields = this.state.fields;
        this.idGenerator++;
        fields.push({ name: this.state.fieldName, type: this.state.fieldType, id: this.idGenerator });
        this.setState({ fields: fields, fieldName: '', fieldType: '' });
    }

    renderTableBody(fields) {
        return (
            <tbody>
            {
                fields.map(field =>
                    <tr key={field.fieldId}>
                        <td>{field.name}</td>
                        <td>{field.type}</td>
                        <td><button onClick={() => this.removeField(field.id)} type="button" className="btn btn-danger">Remove</button></td>
                    </tr>
                )
            }
            </tbody>
        );
    }

    removeField(id) {
        let updatedFields = this.state.fields.filter(field => field.id !== id)
        this.setState({ fields: updatedFields });
    }

    handleSubmit(event, name) {
        event.preventDefault();
        //let data = new FormData();
        //data.append("json", JSON.stringify({catalog_name: name }));

        fetch("api/Catalog",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(name) 
                })
            .then(response => response.json())
            .then(data => {
                if (data && data.errMsg)
                    alert(data.errMsg);
                else
                    this.props.history.push('/catalogs');
            });
    }

    render() {
        return (
            <div>
                <br/>
                <form>
                    <div className="form-group">
                        <label>Catalog name</label>
                        <input type="text" onChange={this.changeCatalogName} value={this.state.catalogName} className="form-control" placeholder="Catalog name" />
                    </div>
                    <br/>
                    <div className="form-row">

                        
                        <div className="form-group col-md-9">
                            <label>Field Name</label>
                            <input type="text" value={this.state.fieldName} onChange={this.changeFieldName} className="form-control" placeholder="Field Name" />
                        </div>
                        <div className="form-group col-md-2">
                            <label>Field Type</label>
                            <select className="form-control" value={this.state.fieldType} onChange={this.changeFieldType}>
                                <option value="" disabled="">Choose type</option>
                                <option value="str">str</option>
                                <option value="boolean">boolean</option>
                                <option value="integer">integer</option>
                                <option value="date">date</option>
                            </select>
                        </div>
                        <div className="form-group col-md-1">
                            <label>Add field</label>
                            <button onClick={() => this.addField()} type="button" className="form-control btn btn-primary">Add</button>
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Save catalog</button>
                </form>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Field Name</th>
                        <th>Field Type</th>
                        <th></th>
                    </tr>
                </thead>
                {this.renderTableBody(this.state.fields)}
            </table>
            </div>
        );
    }
}