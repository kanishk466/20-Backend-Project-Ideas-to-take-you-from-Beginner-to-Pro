import chai from "chai"

import chaiHttp from "chai-http"

import server from "../index.js"

import { should } from 'chai';

import Article from "../src/models/Articles.model.js"



chai.use(chaiHttp);

// Parent block for testing
describe('Articles API', () => {

    // Before each test, clear the articles collection
    beforeEach((done) => {
      Article.deleteMany({}, (err) => {
        done();
      });
    });
  
    // Test GET all articles
    describe('/GET articles', () => {
      it('it should GET all the articles', (done) => {
        chai.request(server)
          .get('/api/articles')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });
  
 
  
  });