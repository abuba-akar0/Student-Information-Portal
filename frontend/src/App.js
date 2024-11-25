import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/Login";
import Universities from "./components/pages/University";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Nav from "./components/Nav";
import CareerCounseling from "./components/pages/CareerCounseling";
import ScholarshipList from "./components/pages/ScholarshipList";

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
      <Route path="/universities" component={Universities} />
      <Route path="/scholarships" component={ScholarshipList} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Switch>
  </>
);

export default App;