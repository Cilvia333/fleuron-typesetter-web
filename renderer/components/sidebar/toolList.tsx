import {
  faMousePointer,
  faPencilAlt,
  faEraser,
} from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Button from '~/components/share/button';
import ToolListWrapper from '~/components/share/toolListWrapper';

const ToolList: React.FC = () => {
  return (
    <>
      <Wrapper>
        <ToolListWrapper title={'回転'}>
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              return;
            }}
          />
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              return;
            }}
          />
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              return;
            }}
          />
        </ToolListWrapper>
        <ToolListWrapper title={'サイズ'}>
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              return;
            }}
          />
          <Button
            icon={faMousePointer}
            mode={'action'}
            onClick={() => {
              return;
            }}
          />
        </ToolListWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`w-full flex relative border-0 border-b border-black border-solid px-4 py-2`}

  box-sizing: border-box;

  & > * {
    ${tw`mr-4`}
  }
`;

export default ToolList;
