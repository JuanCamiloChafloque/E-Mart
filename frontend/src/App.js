import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<h1>Hello</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
