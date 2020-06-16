const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../src/server');

const request = supertest(app);

describe('GraphQL', () => {
    // Tests

    it('Returns all customers', (done) => {
        request.post('/graphql')
        .send({ query: '{ customers { id firstName lastName } }' })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
            // res will contain array of all users
            if (err) return done(err);
            // assume there are a 100 users in the database
            console.log(res.body);
            expect(res.body).to.be.an.instanceof(Object);
            done();
        })  
    })
});