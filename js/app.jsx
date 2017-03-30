import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import qs from 'qs'
import {
    tokenStorage
}

from 'fetch-oauth2';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory
}

from 'react-router';
document.addEventListener('DOMContentLoaded', function () {
        class AnimeList extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    clientToken: "",
                    loading: true,
                    data: [],
                    currentDate: ""
                };
            }
            getDate() {
                //set current date
                let today = new Date();
                let dd = today.getDate();
                let mm = today.getMonth() + 1; //January is 0!
                let yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }
                //let const?
                today = yyyy + '-' + mm + '-' + dd;

                console.log(today)
                //current date to state 
                this.setState({
                    currentDate: today
                });

            }
            aniList() {
                //data for authentication
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
                    this.setState({
                        clientToken: data.access_token
                    });
                    fetch(url + "browse/anime?sort=end_date-desc&year=2017&status=Currently%20Airing&airing_data=true&access_token=" + this.state.clientToken, {
                        method: "GET",
                        headers: {
                            "access_token": this.state.clientToken
                        }
                    }).then(response => response.json()).then(data => {
                        this.setState({
                            data,
                            loading: false
                        });
                        console.log(this.state.data)
                        console.log(this.state)
                    });
                });
            }
            componentDidMount() {
                this.aniList();
                this.getDate();
            }
            render() {
                if (this.state.loading) {
                    return null;
                }
                const airingList = this.state.data.map(anime => {
                    if (anime.airing != null) {
                        return <li key = {
                                anime.id
                            } > {
                                anime.title_english
                            } {
                                anime.title_japanese
                            } {
                                anime.airing.time
                            } </li>;
                    }

                });
                return <ul > {
                    airingList
                } </ul>;
            }
        }
        class Template extends React.Component {
            constructor(props) {
                super(props);
            }
            render() {
                const mainDivStyle = {
                    border: '1px solid green',
                    width: '300px',
                    height: '100%',
                    display: 'inline-block'
                };
                return <div className = "wrapper" > < div style = {
                        mainDivStyle
                    } >
                    <AnimeList/> </div> </div > ;
            }
        }
        ReactDOM.render( <Template /> , document.getElementById('app'));
    }

);