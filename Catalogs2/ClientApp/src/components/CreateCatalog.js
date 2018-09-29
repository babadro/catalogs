import React, { Component } from 'react';

export class CreateCatalog extends Component {
    displayName = CreateCatalog.name

    constructor(props) {
        super(props);
        this.state = {};

        //fetch('api/SampleData/catalogs')
        //    .then(response => response.json())
        //    .then(data => {
        //        this.setState({ catalogs: data, loading: false, showVersion: {}});
        //    });

    }

    //versionBtn(id) {
    //    var showVersion = this.state.showVersion;
    //    showVersion[id] = !showVersion[id];//var visibility = this.state.showVersion[id];
    //    this.setState({ showVersion: showVersion });
    //}

    

    render() {
        return (
            <div>
                <h1>Создание нового каталога</h1>
                <input type="text" placeholder="Введите название"></input>
                <input type="submit"></input>
            </div>
        );
    }
}