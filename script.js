const API = `https://raw.githubusercontent.com/GrandEnfant/I-shop/master/db`;

const app = new Vue({
 el: ".app",
 data: {
     products: [],
 },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
            },
 
}
})


