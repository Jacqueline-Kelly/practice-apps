import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../store.js';

const F1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const [form, setForm] = useState(formState);

  const {name, email, password} = form;


  const onChange = (e) => {
    e.preventDefault();
    setForm((prevState) => ({...prevState,
      [e.target.id] : e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      window.alert('Please make sure you fill out all fields before submitting.')
    } else {
      dispatch(update(form)); // dispatch the update for redux
      navigate('/F2'); // then navigate to f2 page
    }
  }

  useEffect(() => {
    if (!formState.cookie) {
      dispatch(update({cookie: JSON.stringify(document.cookie, undefined, "\t")}))
    }
    console.log(formState);
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input id="name" value={name} onChange={onChange}></input>
        </div>
        <div>
          <label>Email</label>
          <input id="email" value={email} onChange={onChange}></input>
        </div>
        <div>
          <label>Password</label>
          <input id="password" value={password} onChange={onChange}></input>
        </div>
        <button type="submit">Continue to fill out shipping information.</button>
      </form>
      <button onClick={() => navigate('/')}>Back to Home Page</button>

    </div>
  )
}

export default F1