import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";

import "../styles/postcard.css";
import { ContextOfUser } from "../contexts/UserContext";
import api from "../services/api";

type IPost = {
  content: string;
  created_by: string;
  slug: string;
  title: string;
  id: string;
};

type IPostProps = {
  post: IPost;
};

export default function PostCard({ post }: IPostProps) {
  const { user, token } = ContextOfUser();
  const [loggedUser, setLoggedUser] = useState<string | any>(user);

  console.log("token", token);

  useEffect(() => {
    setLoggedUser(loggedUser);
  }, [user, loggedUser]);

  async function deletePost(id: string) {
    await api.delete(`blogpost/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.reload();
  }

  return (
    <div className="post-wrapper">
      <Link
        className="link-post"
        style={{ textDecoration: "none" }}
        to={`post/${post.slug}`}
      >
        <div onClick={() => console.log("teste")} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="createdby">
            <AccountCircleIcon style={{ fontSize: "48px" }} />
            <span>{post.created_by}</span>
          </div>
        </div>
      </Link>

      {post.created_by === loggedUser && (
        <i onClick={() => deletePost(post.id)} className="delete-post">
          <DeleteIcon />
        </i>
      )}
    </div>
  );
}
