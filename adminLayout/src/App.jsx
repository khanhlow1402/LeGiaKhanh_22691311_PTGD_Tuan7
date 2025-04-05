import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import DashBoard from "./components/DashBoard.jsx";
import Menu from "./components/Menu.jsx";
import Project from "./components/Project.jsx";
import Team from "./components/Team.jsx";
import Message from "./components/Message.jsx";
import Analytic from "./components/Analytic.jsx";
import Integration from "./components/Integration.jsx";

import "./App.css";

function App() {
  // Fetch OverView API

  return (
    <div className="container">
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/teams" element={<Team />} />
          <Route path="/analytics" element={<Analytic />} />
          <Route path="/messages" element={<Message />} />
          <Route path="/integrations" element={<Integration />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
