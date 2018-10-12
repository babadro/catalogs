import React, { Component } from 'react';

export class Catalog extends Component {
    displayName = Catalog.name

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };

        fetch('api/catalog/' + props.history.location.state.catalogId)
            .then(response => response.json())
            .then(data => {
                this.setState({ catalogInfo: data, loading: false });
            });
    }
    //props.history.location.state.catalogId
    renderCatalogTable() {
        return(<div>Catalog here</div>);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCatalogTable(this.state.forecasts);

        return (
            <div>
                <br/>
                <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-search"></span> Apply filters
                </button>
                <button type="button" className="btn btn-danger">
                    <span className="glyphicon"></span> Reset filters
                </button>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">
                            <div className="form-group">
                                <input type="text" className="form-control" id="" placeholder="Строка"/>
                            </div>
                            Строка
                        </th>
                        <th scope="col">
                            <div className="radio">
                                <label>
                                    <input type="radio" name="survey" id="Radios1" value="Yes"/>
                                    True
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" name="survey" id="Radios2" value="No"/>
                                    False
                                </label>
                            </div>
                            <div className="radio">
                                <label>
                                    <input type="radio" name="survey" id="Radios3" value=""/>
                                    All
                                </label>
                            </div>
                            Булево
                        </th>
                        <th scope="col">
                            <div className="form-group">
                                From:
                                <input type="number" className="form-control"/>
                                To:
                                <input type="number" className="form-control"/>
                            </div>
                            Число
                        </th>
                        <th scope="col">
                            <div className="form-group">
                                From:
                                <input className="form-control" type="datetime-local" id=""/>
                                To:
                                <input className="form-control" type="datetime-local" id=""/>
                            </div>
                            Дата
                        </th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Otto</td>
                        <td>True</td>
                        <td>311</td>
                        <td>25 декабря</td>
                        <td>
                            <button type="button" className="btn btn-sm">Удаление</button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-sm">Публикация</button>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Otto</td>
                        <td>True</td>
                        <td>311</td>
                        <td>25 декабря</td>
                        <td>
                            <button type="button" className="btn btn-sm">Удаление</button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-sm">Публикация</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        );
    }
}
