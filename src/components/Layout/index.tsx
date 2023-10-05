import React, { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ThemeSwitch from "../Switch";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container>
        <Header>
          <Title>
            <Link to="/">My Blog</Link>
          </Title>
        </Header>
        <Wrapper>{children}</Wrapper>
      </Container>
      <Footer>
        <ThemeSwitch />
      </Footer>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Header = styled.div``;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text1};
  font-size: ${({ theme }) => theme.fontSize.title}px;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Wrapper = styled.div`
  width: ${({ theme }) => theme.sizes.sm};
  max-height: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.div`
  position: fixed;
  right: 15px;
  bottom: 15px;
  padding: 0 15px;
`;

export default Layout;
