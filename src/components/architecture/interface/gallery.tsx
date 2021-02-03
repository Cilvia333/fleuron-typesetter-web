import { faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
import { useWindowSize, useScroll } from 'react-use';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { molecularList } from '~/components/architecture/share/molecular';
import MolecularIcon from '~/components/architecture/share/molecularIcon';

interface Props {
  currentId: number;
  onChangeId: (id: number) => void;
}

const Gallery: React.FC<Props> = (props) => {
  const { currentId, onChangeId } = props;
  const selectRef = useRef<HTMLLIElement>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [isHoverring, setIsHoverring] = useState(false);
  const [isChangeId, setIsChangeId] = useState(false);
  const { width, height } = useWindowSize();
  const { x, y } = useScroll(listRef);

  useEffect(() => {
    if ((!isHoverring || isChangeId) && listRef.current && selectRef.current) {
      const scrollPosition = y;
      let targetPosition =
        selectRef.current?.offsetTop +
        selectRef.current?.offsetHeight / 2 -
        height / 2;

      if (isChangeId && targetPosition > scrollPosition) {
        targetPosition -= selectRef.current?.offsetHeight / 2;
      }

      listRef.current?.scroll({
        top: targetPosition,
        left: 0,
        behavior: 'smooth',
      });

      if (isChangeId) {
        setIsChangeId(false);
      }
    }
  }, [isHoverring, isChangeId]);

  const handleClickItem = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    if (currentId === id) {
      if (listRef.current && selectRef.current) {
        const scrollPosition = y;
        const position =
          selectRef.current?.offsetTop +
          selectRef.current?.offsetHeight / 2 -
          height / 2;
        listRef.current?.scroll({
          top: position,
          left: 0,
          behavior: 'smooth',
        });
      }
    } else {
      onChangeId(id);
      setIsChangeId(true);
    }
  };

  return (
    <>
      <Wrapper>
        <Title isHoverring={isHoverring}>Decoration List</Title>
        <SideBarWrapper>
          <SideBarContainer
            className="group"
            ref={sideBarRef}
            onMouseEnter={() => {
              setIsHoverring(true);
            }}
            onMouseLeave={() => {
              setIsHoverring(false);
            }}
          >
            <SideBarBG />
            <ListWrapper ref={listRef}>
              {molecularList.map((value, index) => (
                <>
                  <ListItem
                    select={currentId === index}
                    ref={currentId === index ? selectRef : null}
                    onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                      handleClickItem(e, index);
                    }}
                    key={`list_${index}`}
                  >
                    <MolecularIcon name={`${value}`} />
                  </ListItem>
                  <ListDivider key={`divider_${index}`} />
                </>
              ))}
            </ListWrapper>
            <Button>
              <FontAwesomeIcon icon={faTh} />
            </Button>
          </SideBarContainer>
        </SideBarWrapper>
      </Wrapper>
    </>
  );
};

interface ListItemProps {
  select?: boolean;
  isHoverring?: boolean;
}

const Wrapper = styled.section`
  ${tw`absolute right-0 top-0 bottom-0 w-96 overflow-hidden`}
`;

const Title = styled.h1<{ isHoverring: boolean }>`
  ${tw`text-base absolute inset-y-0 my-auto text-left w-full h-4 leading-none -right-24 transition-all duration-100 ease-out select-none`}

  ${({ isHoverring }) =>
    isHoverring &&
    css`
      ${tw`right-0 duration-300`}
    `}
`;

const SideBarWrapper = styled.div`
  ${tw`absolute h-screen w-56 right-0 top-0 bottom-0`}
`;

const SideBarContainer = styled.div`
  ${tw`h-12 w-12 absolute inset-0 m-auto hover:h-full hover:w-full`}
`;

const Button = styled.div`
  ${tw`text-2xl text-primary bg-white border-4 border-primary border-solid rounded-full h-12 w-12 group-hover:hidden block absolute inset-0 m-auto`}

  & > * {
    ${tw`absolute inset-0 m-auto`}
  }
`;

const SideBarBG = styled.div`
  ${tw`h-12 w-12 rounded-circle group-hover:h-full group-hover:w-full group-hover:rounded-none group-hover:shadow-pink transition-all inset-0 m-auto ease-out`}
  transition-duration: 0.4s;
`;

const ListWrapper = styled.ul`
  ${tw`absolute h-screen w-0 group-hover:w-56 overflow-y-scroll inset-0 m-auto p-0 opacity-0 group-hover:opacity-100`}

  ::-webkit-scrollbar {
    ${tw`w-2`}
  }
  ::-webkit-scrollbar-track {
    ${tw`bg-white`}
  }
  ::-webkit-scrollbar-thumb {
    ${tw`bg-black rounded-full`}
    box-shadow: inset 0 0 0 2px #fff;
  }

  & > * {
    ${tw`mt-8 relative inset-x-0 mx-auto`}

    &:nth-child(1) {
      margin-top: 509px;
    }

    &:nth-last-child(2) {
      margin-bottom: 509px;
    }
  }
`;

const ListDivider = styled.li`
  ${tw`h-px w-0 bg-primary group-hover:w-12 transition-all duration-300 delay-0 group-hover:delay-200`}

  &:last-of-type {
    ${tw`hidden`}
  }
`;

const ListItem = styled.li<ListItemProps>`
  ${tw`w-16 h-16 p-2 relative hover:w-32 hover:h-32 hover:p-6 transition-all duration-300 cursor-pointer`}

  &::before {
    ${tw`w-full h-full bg-transparent rounded-circle absolute inset-0 m-auto transition-all duration-300`}
    content: "";
    z-index: -1;
  }

  & > * {
    ${tw`transition-all duration-100 delay-0 group-hover:delay-200 group-hover:duration-300 opacity-0 group-hover:opacity-100`}
  }

  &:hover {
    & > * {
      ${tw`text-white duration-100`}
      transition-delay: 0 !important;
    }

    &::before {
      ${tw`bg-primary`}
    }
  }

  ${({ select }) =>
    select &&
    css`
      ${tw`w-32 h-32 transition-all duration-300 p-6`}

      & > * {
        ${tw`text-white opacity-0 group-hover:opacity-100 transition-all duration-300`}
      }

      &::before {
        ${tw`w-12 h-12 group-hover:w-full group-hover:h-full bg-primary transition-all duration-300`}
      }
    `}
`;

export default Gallery;
