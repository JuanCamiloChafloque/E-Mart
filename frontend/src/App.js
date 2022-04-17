import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<h1>Hello</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
