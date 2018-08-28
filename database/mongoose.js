const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/faves');

// define schema
const faveSchema = mongoose.Schema({
  alias: { type: String, unique: true, dropDups: true, index: true},
  name: String,
  cuisines: String,
  phone: String,
  address: String,
  price: String,
});

// define model
const Fave = mongoose.model('Fave', faveSchema);

const addFave = (fave, response) => {
  let instance = new Fave({
    alias: fave.alias,
    name: fave.name,
    cuisines: fave.cuisines,
    phone: fave.phone,
    address: fave.address,
    price: fave.price,
  })

  instance.save((err) => {
    if (err) {
      console.log('Save error:', err);
      response.status(500).send('failed');
      return;
    }
    response.send('ok');
    console.log('Save success');
  });
};

const getFaves = (cb) => {
  Fave.find({}, (err, docs) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, docs);
  }).limit(5).sort({_id: -1});
};

module.exports = {
  addFave,
  getFaves,
};
