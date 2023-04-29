import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { update } from '../store.js';

const Home = () => {
  const cookie = JSON.stringify(document.cookie, undefined, "\t");

  return (
    <div>
      <p>Hello, World!</p>
      <p>
        <code>Page Cookie: {cookie}</code>
      </p>
      <button><Link to='/F1'>Checkout Here!</Link></button>
    </div>
  )
}

export default Home