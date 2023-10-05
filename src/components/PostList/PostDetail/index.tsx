import React from "react";
import DeletePostButton from "../DeletePostButton";
import styled from "styled-components";
import { IPost } from "../../../config/firebasetype";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { formatDayTime } from "../../../utils/formatData";

interface PostDetailProps {
  data: IPost;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

function PostDetail({ data, setIsEditing }: PostDetailProps) {
  const handleEditClick = () => {
    setIsEditing && setIsEditing((prev) => !prev);
  };
  const { year, month, date, hours, minutes } = formatDayTime(
    data.createdAt?.toDate(),
  );

  return (
    <>
      <ContentContainer>
        <TitleContainer>
          <Col justify="space-between">
            <Title>{data.title}</Title>
            <InlineButtonGroup>
              <Button onClick={handleEditClick}>
                <FiEdit />
              </Button>
              <DeletePostButton postId={data.id!} />
            </InlineButtonGroup>
          </Col>
          <Col justify="flex-start">
            <Date>
              <AiTwotoneCalendar /> {`${year}.${month}.${date}`}
            </Date>{" "}
            <Time>
              <BiTime /> {``}
              {`${hours}:${minutes}`}
            </Time>
          </Col>
        </TitleContainer>
        <PostContent>{data.content}</PostContent>
        <SummaryContainer>
          <Desc>💡</Desc>
          <Summary>{data.summary}</Summary>
        </SummaryContainer>
      </ContentContainer>
    </>
  );
}

const ContentContainer = styled.div`
  width: ${({ theme }) => theme.sizes.sm};
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  margin: 20px 0 20px;
  padding: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 16px);
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
`;

const Col = styled.div<{ justify?: string }>`
  display: flex;
  justify-content: ${(props) => props.justify || "space-between"};
  align-items: center;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.subTitle}px;
  font-weight: 500;
  word-break: keep-all;
  line-height: 1.2em;
`;

const ColDate = styled.span`
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 3px;
  color: ${({ theme }) => theme.colors.tagText};
`;

const Date = styled(ColDate)`
  margin-right: 0.5rem;
`;

const Time = styled(ColDate)``;

const SummaryContainer = styled.p`
  font-size: 0.875rem;
  margin: 2px 0px 20px;
  line-height: 1.3rem;
  padding: 6px 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  word-break: break-word;
  white-space: pre-line;
  box-sizing: content-box;

  & > span {
    font-size: 0.8rem;
  }
`;

const Desc = styled.span`
  margin-right: 5px;
`;
const Summary = styled.span``;

const PostContent = styled.p`
  color: #666;
  font-size: 0.87rem;
  margin-bottom: 16px;
  line-height: 1.7em;
`;

const InlineButtonGroup = styled.div`
  display: inline-flex;
  gap: 5px;
  margin-left: 10px;
`;

const Button = styled.div`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.tagText};
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 12px;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.activeColor};
  }
`;

export default PostDetail;
