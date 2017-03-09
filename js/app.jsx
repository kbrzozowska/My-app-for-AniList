import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import URLSearchParams from 'url-search-params';
import qs from 'qs'
import {tokenStorage} from 'fetch-oauth2';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';

document.addEventListener('DOMContentLoaded', function() {

    class AnimeList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                clientToken: "",
                loading: true
            };
        }
        aniList() {
            let url = "https://anilist.co/api/";
            let obj = {
                grant_type: "client_credentials",
                client_id: "brethil-sc5w1",
                client_secret: "2N6iFsSDlh8eRAbmqmsJhoW2G0bqb"
            }
            fetch(url + "auth/access_token", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: qs.stringify(obj)
            }).then(data => data.json()).then(data => {

                console.log(data);

                this.setState({clientToken: data.access_token});

                fetch(url + "character/100?access_token=" + this.state.clientToken, {
                    method: "GET",
                    headers: {
                        "access_token": this.state.clientToken
                    }
                }).then(response => response.json()).then(data => {

                    console.log(data)
                });

            });

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
