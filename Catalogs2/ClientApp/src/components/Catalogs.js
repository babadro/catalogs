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
            <div>Здесь будет инфа о каталогах.</div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Catalogs.renderCatalogsTable(this.state.catalogs);

        return (
            <div>
                <h1>Catalogs here</h1>
            </div>
        );
    }
}