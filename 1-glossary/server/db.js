const mongoose = require("mongoose");
const { Schema } = mongoose;

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

mongoose.connect('mongodb://localhost/glossary', { useNewUrlParser: true, useUnifiedTopology: true })

const wordSchema = new Schema({
  word: {type: String, unique: true},
  definition: String,
  username: String
});

const sessionSchema = new Schema({
  username: String,
  expiresAt: Date,
  sessionToken: String,
})

const Word = mongoose.model('Glossary', wordSchema);
const Session = mongoose.model('Session', sessionSchema);

exports.genCookieSession = async(form) => {
  const newSession = new Session(form);
  await newSession.save(function (err) {
    if (err) {
      console.log('in gen session', err);
    } else {
      console.log(newSession);
    }
  })
}

exports.postGlossary = async(req, res, callback) => {

  const newWord = new Word(res.locals);

  newWord.save(function (err) {
    if (err) {
      console.log('in post glossary', err);
    } else {
      callback()
    }
  })
}

exports.getGlossary = async(req, res) => {
  const glossary = await Word.find({});

  return glossary;
}

exports.updateGlossary = async(req, res) => {
  try {
    console.log(req.body, 'in update glossary')
    let doc = await Word.findOneAndUpdate({word: req.body.word}, {definition: req.body.definition})
    res.status(200).send(doc);
  } catch (err) {
    console.log(err);
  }
}