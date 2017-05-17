import React from 'react';
import ReactDOM from 'react-dom';
import cacheProxy from './cacheProxy';
import qs from 'qs'
import moment from 'moment'
import {tokenStorage} from 'fetch-oauth2';
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router';
document.addEventListener('DOMContentLoaded', function () {
    //main class
    class AnimeList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                clientToken: "",
                loading: true,
                data: [],
                daysOfTheWeek: []
            };
        }
        getDate() {
            //set current date
            let day1 = new moment().format().slice(0, 10);
            let day2 = moment().add(1, "days").format().slice(0,10);
            let day3 = moment().add(2, "days").format().slice(0,10);
            let day4 = moment().add(3, "days").format().slice(0,10);
            let day5 = moment().add(4, "days").format().slice(0,10);
            let day6 = moment().add(5, "days").format().slice(0,10);
            let day7 = moment().add(6, "days").format().slice(0,10);
            
            
            console.log(day1, day2, day3, day4);

            //current date to state
            this.setState({daysOfTheWeek: this.state.daysOfTheWeek.push(day1, day2, day3, day4, day5, day6, day7)})
            
            console.log(this.state.daysOfTheWeek[1])

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
                })
                .then(data => data.json())
                .then(data => {
                    console.log(data);
                    this.setState({clientToken: data.access_token});
                    fetch(url + "browse/anime?sort=end_date-desc&year=2017&status=Currently%20Airing&airing_data=" +
                                "true&access_token=" + this.state.clientToken, {
                            method: "GET",
                            headers: {
                                "access_token": this.state.clientToken
                            }
                        })
                        .then(response => response.json())
                        .then(data => {
                            this.setState({data, loading: false});
                            console.log(this.state.data)
                        });
                });
        }
        componentDidMount() {
            this.aniList();
            this.getDate();
            console.log(this.state.daysOfTheWeek[1])


        }
        render() {

            if (this.state.loading) {
                return null;
            }

            const airingList1 = this
                .state
                .data
                .map(anime => {
                    if (anime.airing != null && anime.airing.time.slice(0, 10) === this.state.daysOfTheWeek[0]) {
                        return <ul> <li key={anime.id}>
                            {anime.title_english}
                            {anime.title_japanese}
                            {anime.airing.time.slice(0, 10)}
                        </li>
                        </ul>;
                    }
                    
                });
                const airingList2 = this
                .state
                .data
                .map(anime => {
                    if (anime.airing != null && anime.airing.time.slice(0, 10) === this.state.daysOfTheWeek[1]) {
                        return <ul> <li key={anime.id}>
                            {anime.title_english}
                            {anime.title_japanese}
                            {anime.airing.time.slice(0, 10)}
                        </li>
                        </ul>;
                    }
                    
                });
                const airingList3 = this
                .state
                .data
                .map(anime => {
                    if (anime.airing != null && anime.airing.time.slice(0, 10) === this.state.daysOfTheWeek[2]) {
                        return <ul> <li key={anime.id}>
                            {anime.title_english}
                            {anime.title_japanese}
                            {anime.airing.time.slice(0, 10)}
                        </li>
                        </ul>;
                    }
                    
                });
                const airingList4 = this
                .state
                .data
                .map(anime => {
                    if (anime.airing != null && anime.airing.time.slice(0, 10) === this.state.daysOfTheWeek[3]) {
                        return <ul> <li key={anime.id}>
                            {anime.title_english}
                            {anime.title_japanese}
                            {anime.airing.time.slice(0, 10)}
                        </li>
                        </ul>;
                    }
                    
                });
                const airingList5 = this
                .state
                .data
                .map(anime => {
                    if (anime.airing != null && anime.airing.time.slice(0, 10) === this.state.daysOfTheWeek[4]) {
                        return <ul> <li key={anime.id}>
                            {anime.title_english}
                            {anime.title_japanese}
                            {anime.airing.time.slice(0, 10)}
                        </li>
                        </ul>;
                    }
                    
                });
                const airingList6 = this
                .state
                .data
                .map(anime => {
                    if (anime.airing != null && anime.airing.time.slice(0, 10) === this.state.daysOfTheWeek[5]) {
                        return <ul> <li key={anime.id}>
                            {anime.title_english}
                            {anime.title_japanese}
                            {anime.airing.time.slice(0, 10)}
                        </li>
                        </ul>;
                    }
                    
                });
                const airingList7 = this
                .state
                .data
                .map(anime => {
                    if (anime.airing != null && anime.airing.time.slice(0, 10) === this.state.daysOfTheWeek[6]) {
                        return <ul> <li key={anime.id}>
                            {anime.title_english}
                            {anime.title_japanese}
                            {anime.airing.time.slice(0, 10)}
                        </li>
                        </ul>;
                    }
                    
                });

            return <div> {airingList1} {airingList2}  {airingList3}  {airingList4}  {airingList5}  {airingList6}  {airingList7} 
            </div>;
        }
    }
   

    //class template
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
            return <div className="wrapper">
                < div style={mainDivStyle}>
                    <AnimeList/>
                </div>
            </div >;
        }
    }
    ReactDOM.render(
        <Template/> , document.getElementById('app'));
});