import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { getSick } from '../apis/api';
import { getCacheData, setCasheData } from '../apis/getCacheData';
import { useDebounce } from '../hooks/useDebounce';
import { ReactComponent as Search } from '../image/search.svg';

interface Iprops {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  focusIndex: number;
  setRecommendWordCount: Dispatch<SetStateAction<number>>;
}

export default function SearchWordModal({
  inputValue,
  setInputValue,
  focusIndex,
  setRecommendWordCount,
}: Iprops) {
  const [sickData, setSickData] = useState([]);

  const recommentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (recommentRef.current) {
      setRecommendWordCount(recommentRef.current.childElementCount);
    }
  }, [setRecommendWordCount, sickData]);

  useDebounce(
    async () => {
      if (inputValue === '') {
        setSickData([]);
        return;
      }
      if (localStorage.getItem(inputValue) === null)
        try {
          const { data } = await getSick(inputValue);
          setSickData(data);
          setCasheData(inputValue, data);
        } catch (e) {
          console.log(e);
        }
      else {
        const res = await getCacheData(inputValue);
        setSickData(res);
      }
    },
    300,
    inputValue
  );

  return (
    <Container>
      <SearchWord>
        <InputSearchIcon>
          <Search />
        </InputSearchIcon>
        {inputValue === '' ? '검색어가 없습니다.' : <b>{inputValue}</b>}
      </SearchWord>
      <RecommendWordList ref={recommentRef}>
        <p>추천 검색어</p>
        {sickData[0] !== null ? (
          sickData.map((item: { sickCd: string; sickNm: string }, index) => (
            <RecommendWord
              key={item.sickNm}
              onClick={() => setInputValue(item.sickNm)}
              isFocus={index + 1 === focusIndex ? true : false}
            >
              <InputSearchIcon>
                <Search />
              </InputSearchIcon>
              {item
                .sickNm!.split(new RegExp(`(${inputValue})`, 'gi'))
                .map((item, index) => {
                  return item === inputValue ? (
                    <span key={index} style={{ fontWeight: 700 }}>
                      {item}
                    </span>
                  ) : (
                    item
                  );
                })}
            </RecommendWord>
          ))
        ) : (
          <p>추천 검색어가 없습니다.</p>
        )}
      </RecommendWordList>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 20px;
  width: 100%;
  background-color: white;
  position: absolute;
  top: 100%;
  left: 0px;
  margin-top: 8px;
  padding-top: 24px;
  padding-bottom: 16px;
  box-shadow: rgb(30 32 37 / 10%) 0px 2px 10px;
`;

const SearchWord = styled.div`
  padding: 0px 24px;
  display: flex;
`;
const InputSearchIcon = styled.div`
  width: 16px;
  height: 16px;
  color: #c1c1c1;
  margin-right: 10px;
`;

const RecommendWordList = styled.div`
  padding: 0px 24px;
`;

const RecommendWord = styled.div<{ isFocus?: boolean }>`
  display: flex;
  margin-top: 10px;
  cursor: pointer;
  :hover {
    background-color: #e9e9e9;
  }
  background-color: ${(props) => (props.isFocus ? '#e9e9e9' : '#fff')};
`;
