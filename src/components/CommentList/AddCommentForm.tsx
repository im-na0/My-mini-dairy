import React, { useState } from "react";
import { useAddComment } from "../../hooks/useMutationComment";
import styled from "styled-components";
import { FiSend } from "react-icons/fi";

interface AddCommentFormProps {
  postId: string;
}

function AddCommentForm({ postId }: AddCommentFormProps) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const addCommentMutation = useAddComment();

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();

    addCommentMutation.mutate({ postId, name, content });
    setName("");
    setContent("");
  };

  return (
    <CommentContainer>
      <Form onSubmit={handleAddComment}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="닉네임"
          required
        />
        <TextareaContainer>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 작성해보세요"
            required
          />
          <SendButton type="submit">
            <FiSend />
          </SendButton>
        </TextareaContainer>
      </Form>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  width: 380px;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 12px;
  max-width: 160px;
  height: 38px;
  background-color: ${({ theme }) => theme.colors.inputColor};
`;

const TextareaContainer = styled.div`
  position: relative;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  padding-right: 4rem;
  border: none;
  outline: none;
  border-radius: 12px;
  width: 100%;
  height: 80px;
  resize: none;
  background-color: ${({ theme }) => theme.colors.inputColor};
`;
const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: rgb(255, 255, 255);
  border-radius: 2rem;
  border: 1px solid rgb(234, 234, 236);
  color: ${({ theme }) => theme.colors.activeColor};
  cursor: pointer;
  transition: all 0.1s ease-out 0s;
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.activeColor};
    box-shadow: ${({ theme }) => theme.colors.hoverColor} 0px 0px 0px 3px;
  }
`;
export default AddCommentForm;
