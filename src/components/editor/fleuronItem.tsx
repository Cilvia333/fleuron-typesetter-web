import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron, { FleuronState } from '~/components/share/fleuron';
import { Point2D, Rectangle, Grid, Angle } from '~/utils/Geometory';

interface Props {
  state: FleuronState;
  select?: boolean;
  move?: boolean;
}

const FleuronItem: React.FC<Props> = (props) => {
  const { state, select, move } = props;

  return (
    <>
      <Wrapper
        position={state.position}
        size={state.size}
        rotate={state.rotate}
        iconSize={state.fleuron.rect}
        select={select ?? false}
      >
        <Fleuron state={state} />
      </Wrapper>
    </>
  );
};

interface IconProps {
  position: Point2D<Grid>;
  size: Grid;
  rotate: Angle;
  iconSize: Rectangle<Grid>;
  select: boolean;
}

const Wrapper = styled.div<IconProps>`
  ${tw`w-full h-full relative`}
  cursor: grab;

  ${({ position, size, rotate, iconSize }) => css`
    grid-column-start: ${position.x + 1};
    grid-column-end: ${position.x + 1 + size * iconSize.x};
    grid-row-start: ${position.y + 1};
    grid-row-end: ${position.y + 1 + size * iconSize.y};

    transform: rotate(${rotate}deg);
  `}

  ${({ select }) =>
    select &&
    css`
      ${tw`bg-primary bg-opacity-10`}
    `}
`;

export default FleuronItem;
