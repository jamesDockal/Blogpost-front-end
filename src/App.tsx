import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";

import "./styles/app.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter basename={window.location.pathname || ""}>
        <Route path="/" exact component={Home} />
        <Route path="/post/:slug" exact component={Post} />
      </BrowserRouter>
    </div>
  );
}

export default App;
