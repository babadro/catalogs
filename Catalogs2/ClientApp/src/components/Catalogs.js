import React, { Component } from 'react';

export class Catalogs extends Component {
    displayName = Catalogs.name

    constructor(props) {
        super(props);
        this.state = { catalogs: [], loading: false };
        this.versionBtn = this.versionBtn.bind(this);

        fetch('api/SampleData/catalogs')
            .then(response => response.json())
            .then(data => {
                this.setState({ catalogs: data, loading: false, showVersion: {}});
            });

        this.versionBtn = this.versionBtn.bind(this);
    }

    versionBtn(id) {
        var showVersion = this.state.showVersion;
        showVersion[id] = !showVersion[id];
        this.setState({ showVersion: showVersion });
    }

    renderCatalogsTable(catalogs) {
        let rows = [];
        for (let group of catalogs) {
            let firstItem = group[0];
            let catalogName = firstItem.catalogName;
            let catalogId = firstItem.catalogId;
            let versions = group.filter(g => { return g.versionId !== 0 });
            rows.push(
                <tr key={"cat" + catalogId}>
                    <td>{catalogId}</td>
                    <td>{catalogName}</td>
                    <td>
                        <button onClick={() => this.versionBtn(catalogId)} type="button" className="btn btn-sm" data-catalogid="{catalogId}">{versions.length > 0 ? "Версии" : "Не опубликовано"}</button>
                    </td>
                    <td>
                        <button type="button" className="btn btn-sm">Удаление</button>
                    </td>
                    <td>
                        <button type="button" className="btn btn-sm">Просмотр</button>
                    </td>
                    <td>
                        <button type="button" className="btn btn-sm">Публикация</button>
                    </td>
                </tr>
            );
            
            for (let version of versions) {
                if (!this.state.showVersion[version.catalogId])
                    continue;
                rows.push(
                    <tr className="success" key={"ver" + version.versionId}>
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
            : this.renderCatalogsTable(this.state.catalogs);

        return (
            <div>
                <h1>Catalog list</h1>
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