var assert = require("assert");
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3001");


//Test case- 0 - register
//Get Request all trips
it("should validate traveler with given credentials", function(done) {
    server
      .post("/fetchpropid")
      .send({"propid": "ObjectId('5bd3b37c1ddad83c8cdc6de5')"})
      
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
