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

    const deleteId = 20;
    const updateId = 21;

    it('Return all customers', (done) => {
        request.post('/graphql')
            .send({ query: `{ customers { id firstName lastName } }` })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                // res will contain array of all users
                if (err) return done(err);
                // assume there are a 100 users in the database
                expect(res.body.data.customers.length).to.be.gt(0) 
                done();
            })
    });
    
    
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
            // expect(res.body).to.be.an.instanceof(Object);
            expect(res.body.data.createCustomer.firstName).to.equal(customer.firstName)
            expect(res.body.data.createCustomer.lastName).to.equal(customer.lastName)
            expect(res.body.data.createCustomer.email).to.equal(customer.email)
            done();
        })  
    })
    
    it('delete a customer', (done) => {
        request.post('/graphql')
            .set('content-type', 'application/json')
            .send({
                query: `mutation deleteCustomer($id: Int!)
                {
                deleteCustomer(id: $id) 
                }
                `,
                "variables": {
                    'id': deleteId,
                }
            })
            .expect(200)
            .end((err, res) => {
            
            // res will contain array of all users
            console.log(err);
            if (err) return done(err);
            console.log(res.body);
            // assume there are a 100 users in the database
            // expect(res.body).to.be.an.instanceof(Object);
            expect(res.body.data.deleteCustomer).to.equal(true)
            done();
        })  
    })
    
    it('update a customer', (done) => {
        request.post('/graphql')
            .set('content-type', 'application/json')
            .send({
                query: `mutation updateCustomer($input: UpdateCustomerInput!)
                {
                updateCustomer(input: $input)  {
                    firstName,
                    lastName,
                    email,
                }
                }
                `,
                "variables": {
                   'input': {...customer, id: updateId},
                }
            })
            .expect(200)
            .end((err, res) => {
            
            // res will contain array of all users
            if (err) return done(err);
            console.log(res.body);
            // assume there are a 100 users in the database
            // expect(res.body).to.be.an.instanceof(Object);
            expect(res.body.data.updateCustomer).to.be.an.instanceof(Object);
            done();
        })  
    })
});