import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

import "../styles/post.css";

type IPost = {
  content: string;
  created_by: string;
  id: string;
  slug: string;
  title: string;
};

export default function Post({ match }: any) {
  console.log("history", match.params.slug);

  const search = match.params.slug;

  const [post, setPost] = useState<IPost | any>({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function searchPost() {
      try {
        const { data } = await api.get(`blogpost/${search}`);
        setPost(data.post);
      } catch (e) {
        setErrorMessage(e.response.data.error);
      }
    }

    searchPost();
  }, []);

  return (
    <>
      {errorMessage ? (
        <div className="not-found-page">
          <strong className="error-message">{errorMessage}</strong>
          <Link to="/">
            <button className="not-found-button">Home</button>
          </Link>
        </div>
      ) : (
        <div className="post-page-box">
          <h1 className="post-page-title">{post?.title}</h1>
          <div className="post-page-createdby">
            <AccountCircleIcon style={{ fontSize: "48px" }} />
            <span className="post-page-span">{post.created_by}</span>
          </div>

          <textarea
            readOnly
            value={post.content}
            className="post-page-textarea"
          >
            {post.content}
          </textarea>
          <Link to="/">
            <button className="return-home-button">Home</button>
          </Link>
        </div>
      )}
    </>
  );
}
