import React, { useState } from "react";
import { useAddPost } from "../../hooks/useMutationPost";
import { useRecoilState } from "recoil";
import { postModalState } from "../../store/postAtoms";
import { HiOutlineXMark } from "react-icons/hi2";
import styled from "styled-components";
import { formatDayTime } from "../../utils/formatData";

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const addPostMutation = useAddPost();
  const [isModalOpen, setIsModalOpen] = useRecoilState(postModalState);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    addPostMutation.mutate({ title, summary, content });
    setTitle("");
    setSummary("");
    setContent("");
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const { year, month, date } = formatDayTime();
  return (
    <>
      <Button onClick={toggleModal}>기록하기</Button>
      {isModalOpen && (
        <ModalBackdrop onClick={toggleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={toggleModal}>
              <HiOutlineXMark />
            </CloseButton>
            <Header>{`${year}년 ${month}월 ${date}일`}</Header>
            <FormContainer onSubmit={handleAddPost}>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요"
                required
              />
              <Input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="오늘 하루를 요약해보세요"
                required
              />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="오늘 하루를 기록해보세요 :)"
                required
              />
              <ButtonContainer>
                <Button type="submit">기록하기</Button>
              </ButtonContainer>
            </FormContainer>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
}

export default AddPostForm;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 102;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: saturate(180%) blur(8px);
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  margin-bottom: 12px;
  font-size: ${({ theme }) => theme.fontSize.title}px;
  font-weight: 500;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 2rem 2.5rem;
  border-radius: 10px;
  width: ${({ theme }) => theme.sizes.md};
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.title}px;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 10px;
`;

const FormContainer = styled.form`
  max-width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
  border-radius: 12px;
  width: 100%;
  height: 38px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Textarea = styled.textarea`
  padding: 1rem;
  padding-right: 4rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
  border-radius: 12px;
  width: 100%;
  height: 185px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  font-size: 0.75rem;
  line-height: 1.1em;
  white-space: nowrap;
  padding: 0.5rem 0.875rem 0.5rem 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.activeColor};
  cursor: pointer;
  transition: all 0.2s ease-in-out 0s;
  border: none;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.activeColor};
    box-shadow: ${({ theme }) => theme.colors.hoverColor} 0px 0px 0px 3px;
  }
`;
