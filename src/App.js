import './App.css';
import Header from './common/header/Header';
import { BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />      
        <Routes>
          {/*
            <Route path="/" exact>
              <About />
            </Route>
          */}
        </Routes>
      </Router>
    </>
    );
}

export default App;
