const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('../src/server');

const request = supertest(app);

describe('GraphQL', () => {
    // Tests
    let customer = {
            firstName: "Venxel",
            lastName: "Bantilan",
            email: "venxel@gmail.com"
    };

    it('Return specific customer by ID', (done) => {
        request.post('/graphql')
            .send({ query: `{ customer(id: ${1}) { id firstName lastName } }` })
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
    });

    it('Create a customer', (done) => {
        request.post('/graphql')
            .set('content-type', 'application/json')
            .send({
                query: `mutation createCustomer($input: CreateCustomerInput!)
                {
                createCustomer(input: $input) 
                    {
                        firstName,
                        lastName,
                        email
                    }
                }
                `,
                "variables": {
                    'input': customer,
                }
            })
            .expect(200)
            .end((err, res) => {
            
            // res will contain array of all users
                console.log(err);
            if (err) return done(err);
            // assume there are a 100 users in the database
            console.log(res.body);
            expect(res.body).to.be.an.instanceof(Object);
            done();
        })  
    })
});