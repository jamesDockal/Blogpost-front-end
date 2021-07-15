import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import "../styles/search.css";

export default function Search() {
  const history = useHistory();

  const [search, setSearch] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    history.push(`post/${search}`);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="search-form">
      <input
        onChange={(e) => {
          const slug = e.target.value
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");

          setSearch(slug);
        }}
        className="search-input"
        required
        type="text"
      />
      <label className="search-label">Search for a post</label>
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
