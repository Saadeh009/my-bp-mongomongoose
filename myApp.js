require('dotenv').config();
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const PersonSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', PersonSchema);

const createAndSavePerson = (done) => {
  let person = new Person({name: "Saadeh", age: 22, favoriteFoods: ["Burger", "Chocolate", "Sandwiches"]})
  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });

};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function (err, person) {
    if (err) return console.log(err)
    done(null, person)
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) return console.log(err)
    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, res) => {
    if(err) return console.log(err);
    done(null, res);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, res) => {
    if(err) return console.log(err)
    done(null, res)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, res) => {
    if(err) return console.log(err)
    done(null, res)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
