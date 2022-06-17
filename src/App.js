import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import NoteDetails from './NoteDetails';

function App () {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/:id' element={<NoteDetails />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;