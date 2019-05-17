'use strict';

const request = require('supertest');
const app = require('./app');

describe('Testing all the /search services', () => {

    test('GET /search succeeds with a full city name and returns JSON', () => {
        return request(app)
            .get('/search?city_name=sunderland')
            .expect('Content-type', /json/)
            .expect(200);
    });

    test('GET /search succeeds with part of a city name and returns JSON', () => {
        return request(app)
            .get('/search?city_name=sun')
            .expect('Content-type', /json/)
            .expect(200);
    });

    test('GET /search succeeds with a single letter and returns JSON', () => {
        return request(app)
            .get('/search?city_name=a')
            .expect('Content-type', /json/)
            .expect(200);
    });

    test('GET /search succeeds with no variable given but returns an empty array', () => {
        return request(app)
            .get('/search')
            .expect('[]')
            .expect(200);
    });

    test('GET /search fails (500 Server Error) with no input', () => {
        return request(app)
            .get('/search?city_name=')
            .expect(500);
    });

    test('GET /search fails (500 Server Error) with a space as its input', () => {
        return request(app)
            .get('/search?city_name= ')
            .expect(500);
    });

    test('GET /search succeeds with a numerical input but returns an empty array', () => {
        return request(app)
            .get('/search?city_name=123')
            .expect('[]')
            .expect(200);
    });
});

describe('Testing all the /city services', () => {

    test('GET /city succeeds with a full city name and returns text', () => {
        return request(app)
            .get('/city?city_name=london')
            .expect('Content-type', /text/)
            .expect(200);
    });

    test('GET /city succeeds with part of a city name and returns text', () => {
        return request(app)
            .get('/city?city_name=lon')
            .expect('Content-type', /text/)
            .expect(200);
    });

    test('GET /city succeeds with a single letter and returns text', () => {
        return request(app)
            .get('/city?city_name=b')
            .expect('Content-type', /text/)
            .expect(200);
    });

    test('GET /city fails (500 Server Error) with no variable given', () => {
        return request(app)
            .get('/city')
            .expect(500);
    });

    test('GET /city fails (500 Server Error) with no input', () => {
        return request(app)
            .get('/city?city_name=')
            .expect(500);
    });

    test('GET /city fails (500 Server Error) with a space as its input', () => {
        return request(app)
            .get('/city?city_name= ')
            .expect(500);
    });

    test('GET /city fails with a numerical input', () => {
        return request(app)
            .get('/city?city_name=123')
            .expect(500);
    });
});