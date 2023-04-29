import reactDom from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import F1 from './pages/F1.jsx';
import F2 from './pages/F2.jsx';
import F3 from './pages/F3.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/F1' element={<F1 />}/>
          <Route path='/F2' element={<F2 />}/>
          <Route path='/F3' element={<F3 />}/>
          <Route path="*" element={<Home />}/>
        </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App