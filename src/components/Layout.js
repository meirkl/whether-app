import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Content>
        <Header />
        {children}
      </Content>
      <Footer />
    </Container>
  );
};

export default Layout;
