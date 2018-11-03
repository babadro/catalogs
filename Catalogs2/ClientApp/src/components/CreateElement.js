import React, { Component } from 'react';

export class CreateElement extends Component {
    displayName = CreateElement.name

    constructor(props) {
        super(props);
        this.catalogId = this.props.match.params.catalogid;
        this.state = { loading: false };

        fetch('api/Element/Create/' + this.catalogId)
            .then(response => response.json())
            .then(data => {
                this.setState({ fields: data, loading: false});
            });
    }

    

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <div>Таблица</div>
        return (
            <div>{contents}</div>
        );
    }
}