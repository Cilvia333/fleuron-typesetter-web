import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import TitleSvg from '~/assets/svgs/title.svg';

const Architecture: React.FC = () => {
  return (
    <>
      <Head>
        <title>THE ARCHITECTURE OF PRINTES ORNAMENTS</title>
      </Head>
      <Main>
        <StyledTitleSvg />
        <StartButton
          onClick={() => {
            Router.push('/architecture');
          }}
        >
          <SmallText>
            Click to <br />
          </SmallText>
          Play!
        </StartButton>
        <DirectedText>Directed By Kairi Shiomi</DirectedText>
        <ExhText>Design Informatics Seminar Exhibition 2020</ExhText>
      </Main>
    </>
  );
};

const breath = keyframes`
  0% {
    transform:scale(1);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  60% {
    transform:scale(1.2);
    opacity: 0;
  }
  100% {
    transform:scale(1.2);
    opacity: 0;
  }

`;

const Main = styled.main`
  ${tw`w-screen h-screen overflow-hidden flex flex-col justify-center items-center`}

  & > * {
    ${tw`mt-32`}
  }
`;

const StyledTitleSvg = styled(TitleSvg)`
  ${tw`mt-12`}

  width: 554px;
`;

const DirectedText = styled.p`
  ${tw`leading-none text-base font-header font-semibold mb-0 select-none`}
`;

const ExhText = styled.p`
  ${tw`leading-none text-base font-header font-normal mt-4 mb-0 select-none`}
`;

const StartButton = styled.button`
  ${tw`relative bg-black font-text font-semibold text-white text-5xl hover:bg-primary hover:border-none transition-all duration-300 select-none`}

  width: 350px;
  height: 350px;

  &::after {
    ${tw`absolute border border-black border-solid top-0 bottom-0 right-0 m-auto transition-all duration-300`}
    width: 366px;
    height: 366px;
    left: -9px;
    content: '';
    z-index: -1;

    transform: scale(1);
    opacity: 0;

    animation: ${breath} 2.5s linear infinite forwards;
  }

  &:hover {
    &::after {
      ${tw`border-primary`}
      animation-name: none;
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const SmallText = styled.span`
  ${tw`text-xl`}
`;

export default Architecture;
