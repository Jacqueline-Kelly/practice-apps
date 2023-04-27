import React from "react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const App = () => {
  const [glossary, setGlossary] = useState([]); // Array of objects. Objects - key: word, value: definition
  const [newWord, setNewWord] = useState({
    username: '',
    word: '',
    definition: '',
  });
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState(0);
  const [page, setPage] = useState(1);

  let modalOptions = [{"visibility": "hidden"}, {"borderRadius" : "1rem", "width" : "100%"}]
  const {word, username, definition} = newWord;

  const onChange = (e) => {
    e.preventDefault();
    if (Object.keys(newWord).includes(e.target.id)) {
      setNewWord((prevState) => ({...prevState,
        [e.target.id]: e.target.value
      }));
    } else {
      setFilter(e.target.value);
    }
  }

  const onClick = (e) => {
    e.preventDefault();
    if (!username | !word) {
      throw new Error ('Enter username or password')
    } else {
      axios.post('http://localhost:3000/api', newWord)
      .then((res) => setGlossary(res.data))
      .catch((err) => console.log(err))
      setNewWord((prevState) => ({...prevState, word:''}));
    }
  }

  const onClickEdit = (index) => {
    setNewWord((prevState) => ({...prevState, word: glossary[index].word}));
    setModal(modal + 1)
  }

  const onFilter = () => {
    let copy = [...glossary].filter((input) => input.word.includes(filter))
    setGlossary(copy);
  }

  const onMovePage = (dir) => {
    if (dir) { //move forward
      if (page < glossary.length/10) { // data for another page
        setPage(page + 1);
      }
    } else {
      if (page > 1) { //can't go back if already on page one
        setPage(page - 1);
      }
    }
    return;
  }

  const onUpdateDefinition = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/api', newWord).then(fetchData)
    setNewWord((prevState) => ({...prevState, definition: '', word:''}));
    setModal(modal + 1);
  }

  const onClickDelete = (index) => {
    axios.delete(`http://localhost:3000/api/${glossary[index].word}`).then(fetchData)
  }

  const fetchData = () => {
    axios.get('http://localhost:3000/api')
    .then((res) => setGlossary(res.data));
  }

  const paginationRange = useMemo(() => {
    if (glossary) {
      return glossary.slice(10 * (page - 1), 10 * page - 1)
    }
    return [];
  }
  , [page, glossary])

  useEffect(() => {
    fetchData();

  }, [page])

  return (
    <div>
      <h1>Welcome to your Glossary</h1>
      <h4>Enter your username</h4>
      <input id="username" value={username} onChange={onChange}></input>

      <h4>Enter a new word in the input box below to add it to your glossary</h4>
      <input id="word" value={word} onChange={onChange}></input>
      <button onClick={onClick}>Add New Word!</button>

      <h4>Filter through words in your glossary below</h4>
      <input value={filter} onChange={onChange}></input>
      <button onClick={onFilter}>Filter your Glossary!</button>

      <section id="modal" style={modalOptions[modal % 2]}>
        <h4>Enter Updated Definition Here</h4>
        <input id="definition" value={definition} onChange={onChange}></input>
        <button onClick={onUpdateDefinition}>Submit your modified definition!</button>
      </section>

      {paginationRange.length ?
        <div>
          {paginationRange.map((word, index) =>
            <div key={index} >
              <h4>{word.word}</h4>
              <p>{word.definition}</p>
              <button onClick={() => onClickEdit(index)}>Edit Definition</button>
              <button onClick={() => onClickDelete(index)}>Delete</button>
            </div>
          )}
        </div>
      : null}
      <div style={{'display' : 'block', 'textAlign': 'center'}}>
        <h4>Page</h4>
        <p>{page}</p>
        <button onClick={() => onMovePage(0)}>Previous Page</button>
        <button onClick={() => onMovePage(1)}>Next Page</button>
      </div>

    </div>
  )
}

export default App