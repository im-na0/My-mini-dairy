import React from "react";
import { useDeletePost } from "../../hooks/useMutationPost";
import styled from "styled-components";
import { FiTrash } from "react-icons/fi";

interface DeletePostButtonProps {
  postId: string;
}

function DeletePostButton({ postId }: DeletePostButtonProps) {
  const deleteMutation = useDeletePost();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteMutation.mutateAsync(postId);
    }
  };

  return (
    <DeleteButton onClick={handleDelete}>
      <FiTrash />
    </DeleteButton>
  );
}

const DeleteButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text3};
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 12px;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary1};
  }
`;

export default DeletePostButton;
