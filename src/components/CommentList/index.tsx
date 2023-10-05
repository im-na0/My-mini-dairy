import React from "react";
import { useComments } from "../../hooks/useQueryComment";
import CommentItem from "./CommentItem";
import styled from "styled-components";

interface CommentsListProps {
  postId: string;
}

function CommentsList({ postId }: CommentsListProps) {
  const { data: comments, isLoading } = useComments(postId);

  if (isLoading) return <p>Loading comments...</p>;

  return (
    <Container>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: ${({ theme }) => theme.sizes.sm};
  background-color: ${({ theme }) => theme.colors.bg_element4};
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export default CommentsList;
