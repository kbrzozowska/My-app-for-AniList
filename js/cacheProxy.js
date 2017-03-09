class CacheProxy {
    _fetchData(url) {
        return fetch(url, {
                headers: {
                    'X-Auth-Token': 'ac7e0f3b34714919929bfbf9086a5062'
                }
            })
            .then(resp => resp.json());
    }

    /*
     * @TODO - Uzupełnij tą metodę tak, aby zwracała Promise,
     * które spełnia się do rozkodowanego z JSON
     * obiektu. Wykorzystaj fetch() do pobrania zawartości z argumentu url.
     */


    constructor() {
        this.cache = {}

        this.get = url => {
            if (url in this.cache)
                return Promise.resolve(this.cache[url]);
            else
                return this._fetchData(url).then(data => {
                    this.cache[url] = data;
                    return data;
                });
        }
    }
}

module.exports = new CacheProxy();

// fetch('https://anilist.co/api', {
//
//         method: 'POST',
//
//         body: JSON.stringify(access)
//
//     })
//     .then(resp => resp.json())
//     .then(data => {
//         console.log(data)
//     });
//
// const access = {
//     grant_type: "client_credentials",
//     client_id: "brethil-sc5w1",
//     client_secret: "2N6iFsSDlh8eRAbmqmsJhoW2G0bqb",
// }
//
// {
//     access_token: "NR3M3vXgHK0kmluOcJVlRXvbGOg4yLhAVyf5If"
//     token_type: "bearer"
//     expires: 1414234981
//     expires_in: 3600
// }
//
// fetch('https://anilist.co/api', {
//         headers: {
//             'access_token': 'ac7e0f3b34714919929bfbf9086a5062'
//         }
//     })
//
//     .then(resp => resp.json())
//
//     .then(data => {
//
//         console.log(data);
//
//     });
