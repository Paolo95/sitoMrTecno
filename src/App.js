import './App.css';
import Header from './common/header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pages from './pages/Pages';

function App() {
  return (
    <>
      <Router>
        <Header />      
        <Routes>
            <Route exact path="/" element={<Pages/>} >    
            </Route>          
        </Routes>
      </Router>
    </>
    );
}

export default App;
