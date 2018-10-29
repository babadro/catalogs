import React, { Component } from 'react';

export class Catalog extends Component {
    displayName = Catalog.name

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };

        fetch('api' + props.location.pathname)
            .then(response => response.json())
            .then(data => {
                this.setState({ cols: data.cols, rows: data.rows, loading: false });
            });
    }
    //props.history.location.state.catalogId
    renderCatalogTable() {
        return (
            <table className="table table-hover">
                {this.renderTableHeader(this.state.cols)}
                {this.renderTableBody(this.state.rows)}
            </table>
            );
    }

    renderTableHeader(input) {
        let cols = [];
        for (let col of input) {
            switch (col.fieldType) {
            case 0:
                cols.push(
                    <th scope="col" key={col.id}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="" placeholder="Строка" />
                            </div>
                            Строка
                    </th>
                    );
                    break;
                case 1:
                    cols.push(
                        <th scope="col" key={col.id}>
                            <div className="radio">
                                <label>
                                    <input type="radio" name="survey" id="Radios1" value="Yes" />
                                    True
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" name="survey" id="Radios2" value="No" />
                                    False
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" name="survey" id="Radios3" value="" />
                                    All
                                </label>
                            </div>
                            Булево
                        </th>
                    );
                    break;
                case 2:
                    cols.push(
                        <th scope="col" key={col.id}>
                            <div className="form-group">
                                From:
                                <input type="number" className="form-control" />
                                To:
                                <input type="number" className="form-control" />
                            </div>
                            Число
                        </th>
                    );
                    break;
                case 3:
                    cols.push(
                        <th scope="col" key={col.id}>
                            <div className="form-group">
                                From:
                                <input className="form-control" type="datetime-local" id="" />
                                To:
                                <input className="form-control" type="datetime-local" id="" />
                            </div>
                            Дата
                        </th>
                    );
                    break;
            }
        }
        return (
            <thead>
                <tr>
                    <th scope="col">id</th>
                        {cols}
                    <th scope="col"></th>
                </tr>
            </thead>
        );
    }

    renderTableBody(elements) {
        let rows = [];
        for (let elementId of Object.keys(elements)) {
            let cells = [];
            for (let field of elements[elementId]) {
                cells.push(<td key={field.id}>{field.val}</td>);
            }
            rows.push(
                <tr key={elementId}>
                    <td>{elementId}</td>
                    {cells}
                    <td>
                        <button type="button" className="btn btn-sm">Удаление</button>
                    </td>
                </tr>
            );
        }
        return (<tbody>{rows}</tbody>);
    }
    render() {
        let table = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCatalogTable();

        return (
            <div>
                <br/>
                <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-search"></span> Apply filters
                </button>
                <button type="button" className="btn btn-danger">
                    <span className="glyphicon"></span> Reset filters
                </button>
                {table}
            </div>
        );
    }
}
