import React, { useContext, useState, useEffect } from 'react';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron, { FleuronState } from '~/components/share/fleuron';
import { editorContext } from '~/hooks';
import { Angle, Point2D, Rectangle, Pixel, Grid } from '~/utils/Geometory';

interface Props {
  id: number;
  size: Grid;
  rotate: Angle;
  flip: boolean;
  selected: boolean;
  onClickItem: (itemId: number) => void;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const IconItem: React.FC<Props> = (props) => {
  const {
    id,
    size,
    rotate,
    flip,
    selected,
    onClickItem,
    provided,
    snapshot,
  } = props;
  const editorCtx = useContext(editorContext);
  const [fleuronState, setFleuronState] = useState<FleuronState>();
  const [customProvidedStyle, setCustomProvidedStyle] = useState<
    DraggableProvided['draggableProps']['style']
  >(provided.draggableProps.style);
  const [gridLength, setGridLength] = useState(0);

  useEffect(() => {
    if (snapshot.isDragging) {
      if (!fleuronState) {
        return;
      }

      editorCtx.setCurrentDraggingState({
        ...editorCtx.currentDraggingState,
        selectedFleuron: fleuronState,
      });
    }
  }, [snapshot.isDragging]);

  useEffect(() => {
    const style = provided.draggableProps.style;

    if (style) {
      if (
        editorCtx.currentDraggingState.isDroppable &&
        isDraggingStyle(style)
      ) {
        const top = style.top;
        const left = style.left;
        const transform = style.transform
          ?.replaceAll(/[a-z(); ]*/g, '')
          .split(',')
          .map((str) => parseInt(str, 10));
        if (transform !== undefined) {
          const screenPosition: Point2D<Pixel> = {
            x: left + transform[0],
            y: top + transform[1],
          } as Point2D<Pixel>;

          const gridPosition = editorCtx.calcGridPosition(
            screenPosition,
            editorCtx
          );

          if (
            0 > gridPosition.x ||
            gridPosition.x >= editorCtx.gridSize ||
            0 > gridPosition.y ||
            gridPosition.y >= editorCtx.gridSize
          ) {
            return;
          }

          const position =
            editorCtx.gridPositions[gridPosition.x][gridPosition.y];

          const newTransform = `translate(${position.x - left}px, ${
            position.y - top
          }px)`;

          setCustomProvidedStyle({ ...style, transform: newTransform });
          editorCtx.setCurrentDraggingState({
            ...editorCtx.currentDraggingState,
            position: gridPosition,
          });
        }
      }
    }
  }, [provided.draggableProps, editorCtx.currentDraggingState.isDroppable]);

  useEffect(() => {
    setGridLength(editorCtx.editorSize / editorCtx.gridSize);
  }, [editorCtx.gridSize, editorCtx.editorSize]);

  useEffect(() => {
    const fleuron = editorCtx.fleuronDb.get(id);

    if (!fleuron) {
      setFleuronState(undefined);
      return;
    }

    setFleuronState({
      fleuron,
      size,
      rotate,
      position: { x: -1, y: -1 } as Point2D<Grid>,
      flip,
    });
  }, [id, size, rotate, flip]);

  const isDraggingStyle = (style: any): style is DraggingStyle => {
    return style.position !== undefined;
  };

  const getRect = () => {
    if (!fleuronState) {
      return {
        x: 1,
        y: 1,
      } as Rectangle<Grid>;
    }

    return {
      x: fleuronState.fleuron.rect.x * size,
      y: fleuronState.fleuron.rect.y * size,
    } as Rectangle<Grid>;
  };

  const getStyle = (
    style: DraggingStyle | NotDraggingStyle | undefined,
    snapshot: DraggableStateSnapshot
  ) => {
    if (editorCtx.currentDraggingState.selectedFleuron?.fleuron.id !== id) {
      return style;
    }
    if (snapshot.isDropAnimating && snapshot.dropAnimation) {
      const { opacity, curve, duration } = snapshot.dropAnimation;
      return {
        ...customProvidedStyle,
        opacity: opacity,
        transition: `all ${curve} ${duration}s`,
      };
    } else if (editorCtx.currentDraggingState.isDroppable) {
      return customProvidedStyle;
    }

    return style;
  };
  return (
    <>
      <Item
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getStyle(provided.draggableProps.style, snapshot)}
        isDragging={snapshot.isDragging}
        rect={getRect()}
        rotate={rotate}
        selected={selected}
        gridLength={gridLength}
        onClick={(e) => {
          e.stopPropagation();
          onClickItem(id);
        }}
      >
        {fleuronState && <Fleuron state={fleuronState} />}
      </Item>
      {snapshot.isDragging && (
        <Item
          isDragging={false}
          rect={getRect()}
          rotate={rotate}
          selected={selected}
          gridLength={gridLength}
        />
      )}
    </>
  );
};

interface ItemState {
  rect: Rectangle<Grid>;
  rotate: number;
  selected: boolean;
  isDragging: boolean;
  gridLength: number;
}

const Item = styled.div<ItemState>`
  ${tw`bg-transparent opacity-100 mr-4 mb-4`}

  ${({ gridLength, rect, rotate }) => css`
    width: ${gridLength * rect.x}px;
    height: ${gridLength * rect.y}px;
    transform: rotate(${rotate}deg);
  `}

  ${({ selected }) =>
    selected &&
    css`
      ${tw`bg-primary bg-opacity-10 border-primary border border-solid`}
    `}

  ${({ isDragging }) =>
    isDragging &&
    css`
      ${tw`opacity-50`}
    `}
`;

export default IconItem;
