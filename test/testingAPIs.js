const chai = require('chai');
const chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
const expect = require('chai').expect;

describe("Testing API", () => {

    describe("Testing POST /login", () => {
        it('validate user credential', (done) => {
            const user = {
                username: 'shubha',
                password: 'shubha21'
            }
            chai.request('http://localhost:5000')
                    .post('/login')
                    .send(user)
                    .end((err, res) => {
                        expect(res.status).to.eq(200);
                    done();
                    });
        })
    })
    
    describe("Test GET /getUserAddress", () => {
        it('should retrieve saved user info', (done) => {
            chai.request('http://localhost:5000')
                    .get('/getUserAddress')
                    .end((err, res) => {
                        res.should.have.status(200);
                    done();
                    });
        })
    })
})
