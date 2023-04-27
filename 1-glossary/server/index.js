require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const axios = require("axios");
const path = require("path");
const uuid = require("uuid");
const db = require("./db")

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());
app.use(cookieParser('1234'));

const genCookieSession = async (username) => {
  const sessionToken = uuid.v4();
  console.log(uuid.v4());
  const expiresAt = "2024-01-01";
  await db.genCookieSession({expiresAt: expiresAt, sessionToken: sessionToken, username: username});
  console.log('in cookie sessh');
  res.cookie('sessionToken', sessionToken, {expiresAt: expiresAt})
}

const postRoute = async(req, res, callback) => {
  const {username, word} = req.body;

  try {
    const apiCall = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const def = apiCall.data;

    let definition;
    definition = def[0].meanings[0].definitions[0].definition;

    let glossaryAddition = {word: word, definition: definition, username: username};
    res.locals = glossaryAddition;
    callback(null, glossaryAddition)

  } catch (err) {
    console.log('in post route', err)
  }
};

const getRoute = async(req, res) => {
  try {
    const glossary = await db.getGlossary();

    res.status(200).send(glossary);
  } catch (err) {
    res.status(400).send('Oh no!');
  }
};

const putRoute = async(req, res, callback) => {
  try{
    const {word, definition} = req.body;
    if (!word || !definition) {
      throw new Error;
    } else {
      callback(null, req.body)
    }
  } catch (err) {
    console.log(err);
  }
}

app.post('/api', postRoute, db.postGlossary, getRoute);
app.get('/api', getRoute);
app.put('/api', putRoute, db.updateGlossary);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
