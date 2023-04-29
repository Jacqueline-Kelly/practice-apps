import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { update, submitForm, reset } from '../store.js';

const F3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);

  const [form, setForm] = useState(formState)
  const [res, setRes] = useState('');

  const {creditCard, expiration, cvv, billingZip} = form;

  const onChange = (e) => {
    setForm((prevState) => ({...prevState,
      [e.target.id] : e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update(form));
    dispatch(submitForm()).then((response) => {console.log(response); return setRes(response.payload)});
    dispatch(reset());
  }

  useEffect(() => {
    console.log(formState);
    if (!formState.name || !formState.state) {
      setTimeout(() => navigate('/F1'), 5000);
    }

  }, [res])

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Credit card</label>
          <input id="creditCard" value={creditCard} onChange={onChange}></input>
        </div>
        <div>
          <label>Expiration Date</label>
          <input id="expiration" value={expiration} onChange={onChange} placeholder="00/00"></input>
        </div>
        <div>
          <label>Cvv</label>
          <input id="cvv" value={cvv} onChange={onChange}></input>
        </div>
        <div>
          <label>Billing Zipcode</label>
          <input id="billingZip" value={billingZip} onChange={onChange}></input>
        </div>
        <button type="submit">Submit your order</button>
      </form>
      {res.length ?
        <div>
          <h4>{res}</h4>
        </div>
      : null}
      <button onClick={() => navigate('/')}>Back to Home Page</button>
    </div>
  )
}

export default F3;