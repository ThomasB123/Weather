const express = require('express');
const app = express();

const fetch = require('node-fetch');

app.use(express.static('client'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/search', async function(req, resp) {
    try {
        let city = req.query.city_name;
        let response = await fetch('https://www.metaweather.com/api/location/search/?query=' + city);
        let body = await response.text();
        let cities = JSON.parse(body);
        resp.status(200).send(cities);
    } catch (error) {
        resp.status(500).send();
    }
});

app.get('/city', async function(req, resp) {
    try {
        let city = req.query.city_name;
        let response = await fetch('https://www.metaweather.com/api/location/search/?query=' + city);
        let body = await response.text();
        let cities = JSON.parse(body);
        let woeid = cities[0].woeid;
        response = await fetch('https://www.metaweather.com/api/location/' + woeid);
        body = await response.text();
        resp.status(200).send(body);
    } catch (error) {
        resp.status(500).send();
    }
});

module.exports = app;