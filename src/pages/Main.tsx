import React from "react";
import styled from "styled-components";
import PostList from "../components/PostList";
import AddPostForm from "../components/PostList/AddPostForm";
import Layout from "../components/Layout";
import { usePosts } from "../hooks/useQueryPost";

function Main() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;
  if (!posts) return null;

  return (
    <Layout>
      <AddPostForm />
      <ul>
        {posts.map((post) => (
          <PostList key={post.id} data={post}></PostList>
        ))}
      </ul>
    </Layout>
  );
}

export default Main;
