import React, { useState } from "react";
import { useDeleteComment } from "../../hooks/useMutationComment";
import { useUpdateComment } from "../../hooks/useMutationComment";
import styled from "styled-components";
import { FiEdit, FiSend, FiTrash } from "react-icons/fi";
import { BiTime } from "react-icons/bi";
import { formatDayTime } from "../../utils/formatData";

function CommentItem({ comment }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(comment.name);
  const [newContent, setNewContent] = useState(comment.content);
  const deleteCommentMutation = useDeleteComment();
  const updateCommentMutation = useUpdateComment();

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까? 😧")) {
      deleteCommentMutation.mutate(comment.id);
    }
  };

  const handleUpdate = () => {
    updateCommentMutation.mutate({
      commentId: comment.id,
      name: newName,
      content: newContent,
    });
    setIsEditing(false);
  };

  const { year, month, date, hours, minutes } = formatDayTime(
    comment.createdAt?.toDate(),
  );

  return (
    <Item>
      {isEditing ? (
        <>
          <Form onSubmit={handleUpdate}>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <TextareaContainer>
              <Textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <Button type="submit">
                <FiSend />
              </Button>
            </TextareaContainer>
          </Form>
        </>
      ) : (
        <>
          <CommentText>
            <InfoGroup>
              <CommentName>{comment.name || "noname"}</CommentName>
              <Date>
                <BiTime />
                {`${year}.${month}.${date} ${hours}:${minutes}`}
              </Date>
            </InfoGroup>
            <ButtonGroup>
              <SmallButton onClick={() => setIsEditing(true)}>
                <FiEdit />
              </SmallButton>
              <SmallButton onClick={handleDelete}>
                <FiTrash />
              </SmallButton>
            </ButtonGroup>
          </CommentText>
          <CommentContent>{comment.content}</CommentContent>
        </>
      )}
    </Item>
  );
}

const Item = styled.div`
  padding: 1rem;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.border3};
  &:last-child {
    border: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextareaContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 12px;
  max-width: 160px;
  height: 38px;
  background-color: ${({ theme }) => theme.colors.bg_element3};
  color: ${({ theme }) => theme.colors.text2};
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
  background-color: ${({ theme }) => theme.colors.bg_element3};
  color: ${({ theme }) => theme.colors.text2};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => theme.colors.bg_element4};
  border-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border3};
  color: ${({ theme }) => theme.colors.primary1};
  cursor: pointer;
  transition: all 0.1s ease-out 0s;
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary1};
    box-shadow: ${({ theme }) => theme.colors.alpha_violet1} 0px 0px 0px 3px;
  }
`;

const CommentContent = styled.span`
  display: block;
  font-size: 0.875rem;
  margin: 2px 0px 8px;
  line-height: 1.3rem;
  padding: 6px 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.alpha_violet2};
  color: ${({ theme }) => theme.colors.text1};
  word-break: break-word;
  white-space: pre-line;
  box-sizing: content-box;
`;

const CommentText = styled.div`
  display: flex;
  padding: 6px 12px;
`;

const InfoGroup = styled.div`
  display: inline-flex;
  align-items: center;
`;

const CommentName = styled.span`
  display: flex;
  flex: 1;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text2};
  white-space: nowrap;
  margin-right: 13px;
`;

const Date = styled.span`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text4};
`;

const ButtonGroup = styled.span`
  display: inline-flex;
  flex: 2;
  gap: 5px;
  justify-content: flex-end;
  margin-left: 10px;
`;

const SmallButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary1};
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 12px;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary1};
  }
`;

export default CommentItem;
