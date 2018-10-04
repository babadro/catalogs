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
        //let data = new FormData();
        //data.append("json", JSON.stringify({catalog_name: name }));

        fetch("api/Catalog",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify("newName") 
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