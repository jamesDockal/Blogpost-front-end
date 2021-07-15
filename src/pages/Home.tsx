import React from "react";
import AllPosts from "../components/AllPosts";
import CreatePost from "../components/ActionsHeader";
import Search from "../components/Search";

import "../styles/home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="header-bar">
        <Search />
        <CreatePost />
      </div>
      <AllPosts />
    </div>
  );
}
