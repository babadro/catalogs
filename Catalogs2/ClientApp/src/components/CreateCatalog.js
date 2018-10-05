import React, { Component } from 'react';

export class CreateCatalog extends Component {
    displayName = CreateCatalog.name

    constructor(props) {
        super(props);
        this.state = { value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderFieldRow() {
        return (
            <tr>
                <td><input type="text" className="form-control" placeholder="Название поля" /></td>
                <td>
                    <select className="form-control">
                        <option value="" disabled="" selected="">Выберите тип</option>
                        <option value="str">str</option>
                        <option value="boolean">boolean</option>
                        <option value="integer">integer</option>
                        <option value="date">date</option>
                    </select>
                </td>
                <td><button type="button" className="btn btn-danger">Remove</button></td>
            </tr>
        );
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
            <form onSubmit={(event) => this.handleSubmit(event, this.state.value)}>
                <h1>Создание нового каталога</h1>
                <label>
                    Введите название:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Название поля</th>
                        <th>Тип поля</th>
                        <th><button type="button" className="btn btn-info">Добавить поле</button></th>
                    </tr>
                    </thead>
                    <tbody>{this.renderFieldRow()}</tbody>
                </table>
            </form>
        );
    }
}