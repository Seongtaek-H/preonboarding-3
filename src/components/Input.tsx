import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../image/search.svg';
import SearchWordModal from './SearchWordModal';

interface Iprops {
  focusState: boolean;
  setFocusState: Dispatch<SetStateAction<boolean>>;
}

export default function Input({ focusState, setFocusState }: Iprops) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState('');

  const [focusIndex, setFocusIndex] = useState(0);
  const [recommendWordCount, setRecommendWordCount] = useState(0);

  const onClickInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const onArrowKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        if (recommendWordCount === focusIndex) {
          setFocusIndex(0);
          break;
        }
        setFocusIndex((prev) => prev + 1);
        break;
      case 'ArrowUp':
        if (focusIndex <= 0) {
          setFocusIndex(0);
          break;
        }
        setFocusIndex((prev) => prev - 1);
        break;
      case 'Escape':
        setFocusIndex(0);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <InputContainer onClick={onClickInput}>
        <label htmlFor='input'></label>
        <StyledInputContainer>
          {!focusState && (
            <InputSearchIcon>
              <Search />
            </InputSearchIcon>
          )}
          <StyledInput
            id='input'
            type='text'
            ref={inputRef}
            placeholder='질환명을 입력해주세요'
            onFocus={() => setFocusState(true)}
            onBlur={() => setFocusState(false)}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => onArrowKeyDown(e)}
          />
          {focusState && (
            <DeleteButton onClick={() => setInputValue('')}>x</DeleteButton>
          )}
        </StyledInputContainer>
      </InputContainer>
      <SearchButton>
        <IconContainer>
          <Search />
        </IconContainer>
      </SearchButton>
      (
      <SearchWordModal
        focusIndex={focusIndex}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setRecommendWordCount={setRecommendWordCount}
      />
      )
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 490px;
  height: 73px;
  border-radius: 42px;
  border: 2px solid;
  border-color: #ffffff;
  background-color: #ffffff;
  cursor: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  :focus-within {
    border: 2px solid #017be8;
  }
`;

const InputContainer = styled.div`
  width: 90%;
  padding: 20px 10px 20px 24px;
`;

const StyledInputContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const InputSearchIcon = styled.div`
  width: 16px;
  height: 16px;
  color: #c1c1c1;
  margin-right: 10px;
`;

const StyledInput = styled.input`
  border-color: transparent;
  width: 80%;
  font-size: 18px;
  :focus {
    outline: none;
    ::-webkit-input-placeholder {
      color: transparent;
    }
  }
`;

const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: #c1c1c1;
  border-radius: 100%;
  position: absolute;
  right: 0;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const SearchButton = styled.button`
  width: 48px;
  height: 48px;
  color: white;
  border-radius: 100%;
  background-color: #0179e5;
  display: felx;
  justify-content: center;
`;

const IconContainer = styled.div`
  width: 21px;
  height: 21px;
  cursor: pointer;
`;
