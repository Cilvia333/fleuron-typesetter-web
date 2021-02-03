import React, { useState, useEffect } from 'react';
import { useToggle, useMeasure } from 'react-use';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import AtomItem from './atomItem';

interface Props {
  ids: number[];
  molecularId: number;
  onClick: (id: number) => void;
  selectAtom: number | null;
}

const AtomList: React.FC<Props> = (props) => {
  const { ids, molecularId, onClick, selectAtom } = props;
  const [postId, setPostId] = useState(molecularId);
  const [displayIds, setDisplayIds] = useState(ids);
  const [animeState, toggleAnimeState] = useToggle(true);
  const [activeAnime, toggleActiveAnime] = useToggle(true);
  const [rectRef, rect] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    if (postId !== molecularId) {
      toggleAnimeState(false);
      toggleActiveAnime(true);
      setPostId(molecularId);
    }
  }, [ids, molecularId]);

  return (
    <>
      <Wrapper height={rect.height}>
        <ListWrapper ref={rectRef}>
          {displayIds.map((id, index) => (
            <StyledItem
              animeState={animeState}
              activeAnime={activeAnime}
              delay={animeState ? index * 100 + 500 : 0}
              onClick={onClick}
              onAnimationEnd={() => {
                if (!animeState) {
                  toggleAnimeState(true);
                  setDisplayIds(ids);
                } else {
                  toggleActiveAnime(false);
                }
              }}
              id={id}
              select={selectAtom === id}
              key={`atomItem_${index}`}
            />
          ))}
        </ListWrapper>
      </Wrapper>
    </>
  );
};

interface ItemProps {
  animeState: boolean;
  activeAnime: boolean;
  delay: number;
}

const fadeIn = keyframes`
  from {
    transform: translateX(10%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-10%);
    opacity: 0;
  }
`;

const Wrapper = styled.div<{ height: number }>`
  ${tw`w-full relative transition-all duration-500 ease-in-out`}

  ${({ height }) => css`
    height: ${height}px;
  `}
`;

const ListWrapper = styled.div`
  ${tw`w-full relative`}

  & > * {
    ${tw`mb-4`}
  }
`;

const StyledItem = styled(AtomItem)<ItemProps>`
  ${tw`opacity-0`}

  ${({ delay }) => css`
    animation: 500ms ease-out forwards ${delay}ms;
  `}

  ${({ activeAnime, animeState }) =>
    animeState
      ? css`
          animation-name: ${fadeIn};
        `
      : css`
          animation-name: ${fadeOut};
        `}
`;

export default AtomList;
