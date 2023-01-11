import React, { useState } from 'react';
import styled from 'styled-components';
import Input from './components/Input';

function App() {
  const [focusState, setFocusState] = useState(false);
  return (
    <>
      <Container>
        <div>
          <h2>
            국내 모든 임상시험 검색하고<br></br>온라인으로 참여하기
          </h2>
        </div>
        <Input focusState={focusState} setFocusState={setFocusState} />
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  background-color: #cae9ff;
  width: 100vw;
  height: 462.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
