import React, { Component } from 'react';

export class CreateElement extends Component {
    displayName = CreateElement.name

    constructor(props) {
        super(props);
        this.catalogId = this.props.match.params.catalogid;
        this.state = { loading: true };

        fetch('api/Element/Create/' + this.catalogId)
            .then(response => response.json())
            .then(data => {
                this.setState({ fields: data, fieldValues: {}, loading: false});
            });
    }

    handleSubmit(event, fieldValues) {
        event.preventDefault();
        fetch("api/Element/" + this.catalogId,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fieldValues)
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.errMsg)
                    alert(data.errMsg);
                else
                    this.props.history.push('/catalog/' + this.catalogId);
            });
    }

    changeFieldValue(event, fieldId) {
        let fieldValues = this.state.fieldValues;
        fieldValues[fieldId] = event.target.value;
        this.setState({ fieldValues: fieldValues });
    }

    renderForm(fields) {
        return (
            <form onSubmit={(event) => this.handleSubmit(event, this.state.fieldValues)}>
                {fields.map(field =>
                    <div className="form-row" key={field.id}>
                        <div className="form-group">
                            <label>{field.name}</label>
                            {this.renderInput(field)}
                        </div>
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Save element</button>
            </form>
        );
    }

    renderInput(field) {
        switch (field.fieldType) {
            case 0:
                return (
                    <input type="text" onChange={(event) => this.changeFieldValue(event, field.id)} className="form-control" id="" placeholder="Строка" />
                );
                break;
            case 1:
                return (
                    <div>
                        <div className="radio">
                            <label>
                                <input type="radio" onChange={(event) => this.changeFieldValue(event, field.id)} name="survey" id="Radios1" value="Yes" />
                                True
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio" onChange={(event) => this.changeFieldValue(event, field.id)} name="survey" id="Radios2" value="No" />
                                False
                            </label>
                        </div>
                    </div>
                );
            case 2:
                return(
                    <input type="number" onChange={(event) => this.changeFieldValue(event, field.id)} className="form-control" />
                );
            case 3:
                return (
                    <input type="datetime-local" onChange={(event) => this.changeFieldValue(event, field.id)} className="form-control" />
                );
        }
    }

    render() {
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderForm(this.state.fields);
        return (
            <div>
                <h1>Create new element</h1>
                {contents}
            </div>
        );
    }
}