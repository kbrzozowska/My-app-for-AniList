import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy'
import {tokenStorage} from 'fetch-oauth2';
import {fetchWithMiddleware, middleware} from 'fetch-oauth2';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';

document.addEventListener('DOMContentLoaded', function() {

    // const storage = tokenStorage({initialToken, fetchToken, generateToken});
    // const oauth2Fetch = fetchWithMiddleware(middleware.authorisationChallengeHandler(storage), middleware.setOAuth2Authorization(storage));
    //
    // oauthFetch('https://anilist.co/api/auth/authorize?grant_type=client_credentials&client_id=brethil-sc5w1&response_type=code&redirect_uri=Array').then(response => resp.json()).catch(error => {
    //     console.log(err);
    //
    // });

    class AnimeList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true
            };
        }
        aniList() {

            fetch('https://anilist.co/api/auth/authorize?grant_type=client_credentials&client_id=brethil-sc5w1&response_type=code&redirect_uri=Array', {
                method: 'POST',
                headers: {
                    grant_type: "client_credentials",
                    client_id: "brethil-sc5w1",
                    client_secret: "2N6iFsSDlh8eRAbmqmsJhoW2G0bqb"
                }

            }).then(resp => resp.json()).then(data => {
                console.log(data);
                this.setState({loading: false});
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
