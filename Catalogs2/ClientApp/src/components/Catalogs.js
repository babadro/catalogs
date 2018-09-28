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
        let rows = [];
        for (let group of catalogs) {
            var firstItem = group[0];
            var catalogName = firstItem.catalogName;
            var catalogId = firstItem.catalogId;
            var versions = group.filter(g => { g.verionId != 0 });
            rows.push(
                <tr key={catalogId}>
                    <td>{catalogId}</td>
                    <td>{catalogName}</td>
                    <td>
                        <button type="button" class="btn btn-sm" data-catalogid="{catalogId}">{versions.length > 0 ? "Версии" : "Не опубликовано"}</button>
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
            for (let version of versions) {
                rows.push(
                    <tr className="success" key={version.versionId}>
                        <td>{version.versionId}</td>
                        <td>{catalogName}, версия: {version.versionName}</td>
                        <td></td>
                        <td>
                            <button type="button" className="btn btn-sm">Удаление</button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-sm">Просмотр</button>
                        </td>
                        <td></td>
                    </tr>
                );
            }
        }
        return (<tbody>{rows}</tbody>);
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
                    {contents}
                </table>
            </div>
        );
    }
}