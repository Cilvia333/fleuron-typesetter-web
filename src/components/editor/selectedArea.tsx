import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { Area, Grid } from '~/utils/Geometory';

interface Props {
  area?: Area<Grid>;
  select: boolean;
}

const SelectedArea: React.FC<Props> = (props) => {
  const { area, select } = props;

  return (
    <>
      <SelectedBase area={area} select={select}>
        <ToolHandle />
        <ToolHandle />
        <ToolHandle />
        <ToolHandle />
      </SelectedBase>
    </>
  );
};

interface SelectedBaseProps {
  area?: Area<Grid>;
  select: boolean;
}

const SelectedBase = styled.div<SelectedBaseProps>`
  ${tw`w-full h-full border border-primary border-solid hidden relative`}

  ${({ area }) =>
    area &&
    css`
      grid-column-start: ${area.position.x + 1};
      grid-column-end: ${area.position.x + area.size.x + 1};
      grid-row-start: ${area.position.y + 1};
      grid-row-end: ${area.position.y + area.size.y + 1};
    `}

  ${({ select }) =>
    select &&
    css`
      ${tw`block`}
    `}
`;

const ToolHandle = styled.div`
  ${tw`w-2 h-2 bg-white border border-primary border-solid absolute m-0`}

  &:nth-child(1) {
    ${tw`-top-1 -left-1`}
  }
  &:nth-child(2) {
    ${tw`-top-1 -right-1`}
  }
  &:nth-child(3) {
    ${tw`-bottom-1 -left-1`}
  }
  &:nth-child(4) {
    ${tw`-bottom-1 -right-1`}
  }
`;

export default SelectedArea;
