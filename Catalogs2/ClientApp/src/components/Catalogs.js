import React, { Component } from 'react';

export class Catalogs extends Component {
    displayName = Catalogs.name

    constructor(props) {
        super(props);
        this.state = { catalogs: [], loading: false };

        fetch('api/SampleData/catalogs')
            .then(response => response.json())
            .then(data => {
                this.setState({ catalogs: data, loading: false });
            });
    }

    static renderCatalogsTable(catalogs) {
        return (            
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Название справочника</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    
                    {catalogs.map(function (group) {
                        var catalogName = group[0].catalogName;
                        var catalogId = group[0].catalogId;
                        var versions = group.filter(g => { g.versionId != 0 });
                        var temp = 1;
                        return (
                            <tr key={catalogId}>
                                <td>{catalogId}</td>
                                <td>{catalogName}</td>
                                <td>
                                    <button type="button" class="btn btn-sm" data-catalogid="{catalogId}">@(versions.Any() ? "Версии" : "Не опубликовано")</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-sm">Удаление</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-sm">Просмотр</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-sm">Публикация</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Catalogs.renderCatalogsTable(this.state.catalogs);

        return (
            <div>
                <button type="button" className="btn btn-sm">Добавить справочник</button>
                <br />
                <br />
                {contents}
            </div>
        );
    }
}