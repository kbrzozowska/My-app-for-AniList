import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy'
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
                body: obj
            }).then(resp => resp.json()).then(data => {
                console.log(data)
            });

            //           $(() => {
            //
            //         let url = "https://anilist.co/api/";
            //         let obj = {
            //             grant_type: "client_credentials",
            //             client_id: "brethil-sc5w1",
            //             client_secret: "2N6iFsSDlh8eRAbmqmsJhoW2G0bqb"
            //         }
            //
            //         $.ajax({
            //           method: "POST",
            //           url: url + "auth/access_token",
            //           data: obj
            //
            //         })
            //         .done(function(response) {
            //
            //             console.log(response);
            //
            //             $.ajax({
            //               method: "GET",
            //               headers: {
            //                   "access_token" : response.access_token
            //               },
            //               url: url + "character/100?access_token=" + response.access_token
            //             })
            //             .done(function(response) {
            //
            //                 console.log(response);
            //
            //
            //
            //             });
            //
            //         });
            //
            //
            //
            //
            // });

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
