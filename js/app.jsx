import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy'
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';

document.addEventListener('DOMContentLoaded', function() {

    class AnimeList extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                access_token: "",
                loading: true
            };
        }
        aniList() {

            fetch('https://anilist.co/auth/access_token', {
                method: 'POST',
                headers: {
                    grant_type: "client_credentials",
                    client_id: "brethil-sc5w1",
                    client_secret: "2N6iFsSDlh8eRAbmqmsJhoW2G0bqb"
                }

            }).then(resp => resp.json()).then(data => {
                console.log(data);
                this.setState({access_token, loading: false});
            });

            // const access = {
            //     grant_type: "client_credentials",
            //     client_id: "brethil-sc5w1",
            //     client_secret: "2N6iFsSDlh8eRAbmqmsJhoW2G0bqb"
            // }
        }
        componentDidMount() {
            this.aniList();
        }

        render() {
            if (this.state.loading) {
                return null;
            }
            console.log("render")

        }
    }

    ReactDOM.render(
        <AnimeList/>, document.getElementById('app'));
});
