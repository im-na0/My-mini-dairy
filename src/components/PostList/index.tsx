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

  return (
    <PostItem key={data.id}>
      <Item to={`/post/${data.id}`} state={{ title: data.title }}>
        <ColDate $day={day}>
          <Date>{date}</Date>
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
  background-color: ${({ theme }) => theme.colors.bg_element4};
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
    box-shadow: 0px 4px 6px ${({ theme }) => theme.colors.alpha2};
  }
`;

const Item = styled(Link)`
  display: flex;
  width: 100%;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text1}
  font-size: ${({ theme }) => theme.fontSize.subTitle}px;
  transition: color 0.3s ease-in-out;
`;

const ColDate = styled.div<{ $day?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 0.2;
  margin-right: 1rem;
  color: ${({ $day, theme }) =>
    $day === "Sun" ? "red" : $day === "Sat" ? "blue" : theme.colors.text2};
`;

const Date = styled.p`
  font-size: 1.45rem;
  font-weight: 600;
`;
const Day = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
`;

const ColInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.subTitle}px;
  color: ${({ theme }) => theme.colors.text1};
  font-weight: 500;
  word-break: keep-all;
  line-height: 1.2em;
`;

const Summary = styled.p`
  font-size: 0.875rem;
  line-height: 1.3rem;
  padding: 6px 0px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.text3};
  word-break: break-word;
  white-space: pre-line;
  box-sizing: content-box;
`;
