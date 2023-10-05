import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IPost } from "../../config/firebasetype";
import { formatDate } from "../../utils/formatData";

interface PostListProps {
  data: IPost;
}

function PostList({ data }: PostListProps) {
  const { date, day } = formatDate(data.createdAt?.toDate());
  const isWeekend = day === "Sun" || day === "Sat";

  return (
    <PostItem key={data.id}>
      <Item to={`/post/${data.id}`} state={{ title: data.title }}>
        <ColDate>
          <Date $isWeekend={isWeekend}>{date}</Date>
          <Day>{day.toUpperCase()}</Day>
        </ColDate>
        <ColInfo>
          <Title>{data.title}</Title>
          <Summary>{data.summary}</Summary>
        </ColInfo>
      </Item>
    </PostItem>
  );
}

export default PostList;

const PostItem = styled.li`
  width: ${({ theme }) => theme.sizes.sm};
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  border-radius: 20px;
  padding: 20px 20px 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Item = styled(Link)`
  display: flex;
  width: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.subTitle}px;
  transition: color 0.3s ease-in-out;
`;

const ColDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0.2;
  margin-right: 1rem;
`;
const Date = styled.p<{ $isWeekend?: boolean }>`
  font-size: 1.45rem;
  color: ${({ $isWeekend }) => ($isWeekend ? "red" : "black")};
`;
const Day = styled.span`
  font-size: 0.8rem;
`;

const ColInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.subTitle}px;
  font-weight: 500;
  word-break: keep-all;
  line-height: 1.2em;
`;

const Summary = styled.p`
  font-size: 0.875rem;
  line-height: 1.3rem;
  padding: 6px 0px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.black};
  word-break: break-word;
  white-space: pre-line;
  box-sizing: content-box;
`;
