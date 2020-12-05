import React, { useContext, useState, useRef, useEffect } from 'react';
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { useEffectOnce } from 'react-use';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Fleuron, { FleuronState } from '~/components/editor/fleuron';
import { toolButtonContext, editorContext } from '~/hooks';

interface Props {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
}

const mockFleuron: FleuronState = {
  id: 1,
  position: { x: 1, y: 1 },
  size: 1,
  rotate: 0,
  selected: false,
};

const Editor: React.FC<Props> = (props) => {
  const { provided, snapshot } = props;

  const toolButtonCtx = useContext(toolButtonContext);
  const editorCtx = useContext(editorContext);

  const editorRef = useRef(null);

  const [fleurons, setFleurons] = useState(
    new Map<string, FleuronState>([['key1', mockFleuron]])
  );
  const [selectedFleurons, setSelectedFleurons] = useState(
    new Map<string, boolean>()
  );
  const [isSelected, setIsSelected] = useState(false);
  const [fleuronsMap, setFleuronsMap] = useState<string[][]>([[]]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  //useEffect
  useEffectOnce(() => {
    let array: string[][] = [];
    for (let y = 0; y < editorCtx.gridSize; y++) {
      array[y] = new Array(editorCtx.gridSize).fill('');
    }

    array = array.map((v, x) => {
      return v.map((state, y) => {
        const item = fleurons.get('key1');
        if (
          item &&
          x >= item?.position?.x - 1 &&
          x < item?.position?.x - 1 + item?.size &&
          y >= item?.position?.y - 1 &&
          y < item?.position?.y - 1 + item?.size
        ) {
          return 'key1';
        }
        return '';
      });
    });

    setFleuronsMap(array);

    updateEditorState();
  });

  useEffect(() => {
    updateEditorState();
  }, [editorRef?.current, editorCtx.gridSize]);

  useEffect(() => {
    if (snapshot.isDraggingOver) {
      editorCtx.setCurrentDraggingState({
        ...editorCtx.currentDraggingState,
        isDroppable: true,
      });
    } else {
      editorCtx.setCurrentDraggingState({
        ...editorCtx.currentDraggingState,
        isDroppable: false,
      });
    }
  }, [snapshot]);

  const updateEditorState = () => {
    const height: number =
      editorRef?.current?.getBoundingClientRect()?.height ?? null;

    if (height) {
      editorCtx.setEditorSize(height);
    }

    const positionX: number =
      editorRef?.current?.getBoundingClientRect()?.left ?? null;
    const positionY: number =
      editorRef?.current?.getBoundingClientRect()?.top ?? null;

    if (positionX !== null && positionY !== null) {
      editorCtx.setEditorPosition({ x: positionX, y: positionY });

      const array: { x: number; y: number }[][] = [];
      const gridLiteralSize = height / editorCtx.gridSize;
      for (let x = 0; x < editorCtx.gridSize; x++) {
        const tmpArray: { x: number; y: number }[] = [];
        for (let y = 0; y < editorCtx.gridSize; y++) {
          tmpArray[y] = {
            x: positionX + gridLiteralSize * x,
            y: positionY + gridLiteralSize * y,
          };
        }
        array[x] = tmpArray;
      }

      editorCtx.setGridPositions(array);
    }
  };

  const updateFleurons = (key: string, value: FleuronState) => {
    setFleurons((old) => old.set(key, value));
  };

  const clearFleurons = () => {
    setFleurons((old) => {
      old.clear();
      return old;
    });
  };

  const deleteFleurons = (key: string) => {
    setFleurons((old) => {
      old.delete(key);
      return old;
    });
  };

  const updateSelectedFleurons = (key: string, value: boolean) => {
    setSelectedFleurons((old) => old.set(key, value));
  };

  const clearSelectedFleurons = () => {
    setSelectedFleurons((old) => {
      old.clear();
      return old;
    });
  };

  const deleteSelectedFleurons = (key: string) => {
    setSelectedFleurons((old) => {
      old.delete(key);
      return old;
    });
  };

  //イベントハンドラ
  const onClickEditor = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();

    const position = editorCtx.calcGridPosition(
      { x: e.clientX, y: e.clientY },
      editorCtx
    );

    if (!isSelected && fleuronsMap[position.x][position.y]) {
      setIsSelected(true);
      updateSelectedFleurons('key1', true);
    } else {
      clearSelectedFleurons();
      setIsSelected(false);
    }
  };

  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <EditorWrapper ref={editorRef} onClick={onClickEditor}>
        {/* 花形装飾描画 */}
        <Grid gridSize={editorCtx.gridSize}>
          {[...fleurons.entries()].map((fleuron, i) => {
            return (
              <Fleuron
                state={fleuron[1]}
                selected={selectedFleurons.has('key1')}
                key={`fleuron_${i}`}
              />
            );
          })}
        </Grid>
        {/* グリッドライン描画 */}
        <Grid gridSize={editorCtx.gridSize}>
          {[...Array(editorCtx.gridSize ** 2).keys()].map((v, i) => (
            <GridLine key={`grid_${i}`} />
          ))}
        </Grid>
      </EditorWrapper>
      {provided.placeholder}
    </div>
  );
};

const EditorWrapper = styled.div`
  ${tw`w-full bg-white overflow-hidden relative`};

  &::before {
    ${tw`block`};
    content: '';
    padding-top: 100%;
  }
`;

const Grid = styled.div<{ gridSize: number }>`
  ${tw`w-full h-full grid absolute inset-0`};

  ${({ gridSize }) => css`
    grid-template-columns: repeat(${gridSize}, 1fr);
    grid-template-rows: repeat(${gridSize}, 1fr);
  `}
`;

const GridLine = styled.div`
  ${tw`w-full h-full border-black border border-solid border-opacity-70`};

  box-sizing: content-box;
`;

export default Editor;
