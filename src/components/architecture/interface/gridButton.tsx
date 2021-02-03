import { faBorderAll, faBorderNone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron from '~/components/architecture/share/fleuron';

interface Props {
  active: boolean;
  handleClick: () => void;
}

const GridButton: React.FC<Props> = (props) => {
  const { active, handleClick } = props;

  return (
    <>
      <Wrapper>
        <FontAwesomeIcon icon={faBorderNone} />
        <Button
          onClick={() => {
            handleClick();
          }}
          active={active}
        />
        <FontAwesomeIcon icon={faBorderAll} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`flex items-center -ml-4 text-xl text-black`}

  & > * {
    ${tw`ml-4`}
  }
`;

const Button = styled.button<{ active: boolean }>`
  ${tw`bg-black h-7 w-12 rounded-full relative  transition-all duration-300`}

  &::after {
    ${tw`bg-white h-5 w-5 rounded-circle z-10 absolute inset-y-0 my-auto left-1 transition-all duration-300`}
    content: "";
  }

  ${({ active }) =>
    active &&
    css`
      ${tw`bg-primary`}
      &::after {
        transform: translateX(20px);
      }
    `}
`;

export default GridButton;
