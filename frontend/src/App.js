import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/Login";
import UniversitySearch from "./components/pages/UniversitySearch";
import ScholarshipSearch from "./components/pages/ScholarshipSearch";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Nav from "./components/Nav";
import CareerCounseling from "./components/pages/CareerCounseling";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={MainApp} />
      </Switch>
    </Router>
  );
};

const MainApp = () => (
  <>
    <Nav />
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/career-counseling" component={CareerCounseling} />
      <Route path="/university-search" component={UniversitySearch} />
      <Route path="/scholarship-search" component={ScholarshipSearch} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Switch>
  </>
);

export default App;