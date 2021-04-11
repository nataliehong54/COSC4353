const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uri = 'mongodb+srv://jhdo4:Dumdum308605@softwaredesign.amobl.mongodb.net/SoftwareDesign?retryWrites=true&w=majority';

const testSchema = new Schema({
  name: { type: String, required: true }
});

const Name = mongoose.model('Name', testSchema);

describe('DB', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect(uri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!'); 
    });
    done();
  });
  
  describe('Test Database', function() {
    //Save object with 'name' value of 'Mike"
    it('New name saved to test database', function(done) {
      var testName = Name({
        name: 'Mike'
      });
 
      testName.save(done);
    });

    it('Dont save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = Name({
        notName: 'Not Mike'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });

    it('Should retrieve data from test database', function(done) {
      //Look up the 'Mike' object previously saved.
      Name.find({name: 'Mike'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropCollection('names', function(){
      mongoose.connection.close(done);
    });
  });
});
