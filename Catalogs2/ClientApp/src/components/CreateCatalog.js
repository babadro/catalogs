import React, { Component } from 'react';

export class CreateCatalog extends Component {
    displayName = CreateCatalog.name

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event, name) {
        event.preventDefault();
        let data = new FormData();
        data.append("json", JSON.stringify({ id: 0, catalog_name: name }));

        fetch("api/SampleData/CreateCatalog",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: 0, catalog_name: name })
                })
            .then(function (res) { alert(JSON.stringify(res)); });
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event, this.state.value)}>
                <h1>Создание нового каталога</h1>
                <label>
                    Введите название:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}