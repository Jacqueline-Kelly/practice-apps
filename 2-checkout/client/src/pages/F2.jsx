import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../store.js';

const F2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.form);
  const [form, setForm] = useState(formState);

  const {address1, address2, city, state, zipCode, phoneNumber} = form;

  const onChange = (e) => {
    e.preventDefault();
      setForm((prevState) => ({...prevState,
        [e.target.id] : e.target.value
      }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address1 || !city || !zipCode) {
      window.alert('Please make sure you fill out all fields before submitting.')
    } else if (Number(zipCode) > 99950) {
      window.alert('Please enter a valid billing zip code.')
    } else {
      dispatch(update(form));
      navigate('/F3');
    }
  }

  useEffect(() => {
    if (!formState.name || !formState.email) {
      navigate('/F1');
    }
    console.log(formState);
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address</label>
          <input id="address1" value={address1} onChange={onChange}></input>
          <input id="address2" value={address2} onChange={onChange}></input>
        </div>
        <div>
          <label>City</label>
          <input id="city" value={city} onChange={onChange}></input>
        </div>
        <div>
          <label>State</label>
          <input id="state" value={state} onChange={onChange}></input>
        </div>
        <div>
          <label>Zip Code</label>
          <input type="number" id="zipCode" value={zipCode} onChange={onChange}></input>
        </div>
        <div>
          <label>Phone Number</label>
          <input id="phoneNumber" value={phoneNumber} onChange={onChange}></input>
        </div>
        <button type="submit">Continue to payment details</button>
      </form>
      <button onClick={() => navigate('/F1')}>Back to personal information</button>
    </div>
  )
}

export default F2