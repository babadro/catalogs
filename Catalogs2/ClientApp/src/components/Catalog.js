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
                <h1>Catalog view</h1>
                <p>Catalog content</p>
                {contents}
            </div>
        );
    }
}
