import React, { useState, useEffect } from "react";
import api from "../services/api";
import Post from "./PostCard";

import "../styles/allposts.css";

type IPost = {
  content: string;
  created_by: string;
  slug: string;
  title: string;
  id: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<IPost[] | undefined>();

  useEffect(() => {
    async function getAllPosts() {
      const response = await (await api.get("/blogpost")).data;

      setPosts(response);
    }
    getAllPosts();
  }, []);

  return (
    <div className="posts">
      {posts?.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}
