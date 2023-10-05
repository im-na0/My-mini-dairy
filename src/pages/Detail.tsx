import React, { useState } from "react";
import PostDetail from "../components/PostList/PostDetail";
import Layout from "../components/Layout";
import { usePost } from "../hooks/useQueryPost";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import styled from "styled-components";
import EditPostForm from "../components/PostList/PostDetail/EditPostForm";
import CommentsList from "../components/CommentList";
import AddCommentForm from "../components/CommentList/AddCommentForm";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const {
    data: post,
    isLoading: postLoader,
    isError: postError,
  } = usePost(id!);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const isLoading = postLoader;
  const isError = postError;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;
  if (!post) return null;

  const handleListClick = () => {
    navigate(`/`);
  };

  return (
    <Layout>
      <Button onClick={handleListClick}>
        <BiArrowBack />
      </Button>
      {isEditing ? (
        <>
          <EditPostForm post={post} setIsEditing={setIsEditing} />
        </>
      ) : (
        <>
          <PostDetail data={post} setIsEditing={setIsEditing} />
          <CommentsList postId={id!} />
          <AddCommentForm postId={id!} />
        </>
      )}
    </Layout>
  );
}

const Button = styled.button`
  padding: 0.5rem 0.875rem 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.primary1};
  color: ${({ theme }) => theme.colors.primary1};
  background-color: transparent;
  border-radius: 2rem;
  font-size: 0.875rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  line-height: 1em;
  cursor: pointer;
  margin-bottom: 0.75rem;
  transition: all 0.1s ease-out 0s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary1};
    color: ${({ theme }) => theme.colors.text6};
  }
`;

export default Detail;
