import React, { useState } from "react";
import { IPost } from "../../../config/firebasetype";
import { useUpdatePost } from "../../../hooks/useMutationPost";
import styled from "styled-components";
import { queryClient } from "../../../config/queryClient";

interface EditPostFormProps {
  post: IPost;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditPostForm({ post, setIsEditing }: EditPostFormProps) {
  const [title, setTitle] = useState(post.title);
  const [summary, setSummary] = useState(post.summary);
  const [content, setContent] = useState(post.content);
  const updateMutation = useUpdatePost();

  const onUpdateSuccess = (updatedData: Partial<IPost>) => {
    queryClient.setQueryData(
      ["Post", post.id],
      (oldData: IPost | undefined) => {
        return oldData
          ? { ...oldData, ...updatedData }
          : (updatedData as IPost);
      },
    );
    setIsEditing && setIsEditing(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        postId: post.id!,
        updatedData: { title, summary, content },
      });
      onUpdateSuccess && onUpdateSuccess({ title, summary, content });
    } catch (error) {
      console.error("업데이트 에러:", error);
    }
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleUpdate}>
          <div>
            <Label>제목을 입력해주세요</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>오늘 하루를 요약해보세요</Label>
            <Input
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>오늘 하루를 기록해보세요 :)</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <ButtonGroup>
            <Button type="submit">기록하기</Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </>
  );
}

export default EditPostForm;

const FormContainer = styled.div`
  width: ${({ theme }) => theme.sizes.sm};
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.bg_element4};
  border-radius: 8px;
  margin: 20px 0 20px;
  padding: 1rem;
`;

const Form = styled.form`
  margin: 1em 0;
`;

const Label = styled.label`
  font-size: 0.78rem;
  margin: 1rem 0.3rem 0.2rem;
  display: block;
  color: ${({ theme }) => theme.colors.text3};
`;

const Input = styled.input`
  padding: 1rem;
  border: none;
  outline: none;
  border-radius: 12px;
  width: 100%;
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
  height: 185px;
  background-color: ${({ theme }) => theme.colors.bg_element3};
  color: ${({ theme }) => theme.colors.text2};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  font-size: 0.75rem;
  line-height: 1.1em;
  white-space: nowrap;
  padding: 8px 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary1};
  cursor: pointer;
  transition: all 0.2s ease-in-out 0s;
  border: none;
  color: ${({ theme }) => theme.colors.text6};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary1};
    box-shadow: ${({ theme }) => theme.colors.alpha_violet1} 0px 0px 0px 3px;
  }
`;
