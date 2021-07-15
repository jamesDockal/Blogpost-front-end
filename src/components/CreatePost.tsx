import React, { FormEvent, useState } from "react";
import { ContextOfUser } from "../contexts/UserContext";

import "../styles/createpost.css";

type CreatePostProps = {
  isVisible: boolean;
};

export default function CreatePost({ isVisible }: CreatePostProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { createPost } = ContextOfUser();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await createPost(title, content, setErrorMessage);
      if (!errorMessage) {
        window.location.reload();
      }
    } catch {}
    // e.preventDefault();
  }
  return (
    <div className={`create-post ${!isVisible && "create-disabled"}`}>
      <h1 className="create-post-title">Create Post</h1>
      <form className="create-post-form" action="">
        <div className="title-post-box">
          <input
            onChange={(e) => setTitle(e.target.value)}
            required
            className="create-post-input"
            type="text"
          />
          <label className="create-post-label">Title</label>
        </div>
        <div className="create-post-box">
          <textarea
            className="create-post-textarea"
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <label className="content-post-label">Content</label>
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="create-button"
          type="submit"
        >
          Create Post
        </button>
        <div className="error-message-box">
          <span className="error-message">{errorMessage}</span>
        </div>
      </form>
    </div>
  );
}
