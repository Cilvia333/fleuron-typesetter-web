import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron from '~/components/architecture/share/fleuron';

interface Props {
  id: number;
  className?: string;
  onAnimationEnd?: () => void;
  onClick: (id: number) => void;
  select: boolean;
}

const AtomItem: React.FC<Props> = (props) => {
  const { id, className, onAnimationEnd, onClick, select } = props;

  return (
    <>
      <Wrapper
        className={className}
        onAnimationEnd={onAnimationEnd}
        onClick={() => {
          onClick(id);
        }}
      >
        <FleuronWrapper select={select}>
          <Fleuron name={`F${id}`} />
        </FleuronWrapper>
        <Id>{`#${id}`}</Id>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`flex items-center`}

  height: 56px;
`;

const FleuronWrapper = styled.div<{ select: boolean }>`
  ${tw`bg-no-repeat bg-bottom border border-solid text-black hover:text-primary cursor-pointer transition-all duration-300`}

  width: 56px;

  & > svg {
    ${tw`block fill-current`}
  }

  ${({ select }) =>
    select &&
    css`
      ${tw`text-primary`}
    `}
`;

const Id = styled.div`
  ${tw`ml-4 font-text text-3xl text-black select-none`}
`;

export default AtomItem;
