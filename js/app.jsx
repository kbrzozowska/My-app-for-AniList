import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import qs from 'qs'
import {tokenStorage} from 'fetch-oauth2';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';

document.addEventListener('DOMContentLoaded', function() {

    class AnimeList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                clientToken: "",
                loading: true,
                data: []
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

                fetch(url + "browse/anime?sort=end_date-desc&year=2017&status=Currently%20Airing&airing_data=true&access_token=" + this.state.clientToken, {
                    method: "GET",
                    headers: {
                        "access_token": this.state.clientToken
                    }
                }).then(response => response.json()).then(data => {
                    this.setState({data, loading: false});
                    console.log(this.state.data)

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
            const airingList = this.state.data.map(anime => {
                return <li key={anime.id}>
                    {anime.title_english}
                    {anime.title_japanese}

                </li>;
            });
            return (
                <div>{airingList}</div>
            );
        }
    }

    ReactDOM.render(
        <AnimeList/>, document.getElementById('app'));
});
