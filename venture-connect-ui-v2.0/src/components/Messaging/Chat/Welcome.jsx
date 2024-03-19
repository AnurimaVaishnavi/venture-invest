import React from "react";
import styled from "styled-components";

export default function Welcome({ currentUser }) {
  return (
    <Container>
      {/* <img src="" alt="Robot" /> */}
      <h1>
        Welcome, <span>{currentUser.username}!!</span>
      </h1>
      <h3></h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    // color: #4e0eff;
  }
`;