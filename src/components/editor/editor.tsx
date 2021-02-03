import { nanoid } from 'nanoid';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { useEffectOnce } from 'react-use';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import FleuronItem from '~/components/editor/fleuronItem';
import SelectedArea from '~/components/editor/selectedArea';
import { FleuronState } from '~/components/share/fleuron';
import { toolContext, editorContext } from '~/hooks';
import {
  Point2D,
  Vec2D,
  Rectangle,
  Pixel,
  Grid,
  Area,
  AxisX,
  AxisY,
} from '~/utils/Geometory';

const dragMode = ['move', 'select'];

type DragMode = typeof dragMode[keyof typeof dragMode];
type UUID = Branded<string, 'UUID'>;

interface Props {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
}

const Editor: React.FC<Props> = (props) => {
  const { provided, snapshot } = props;
  const toolCtx = useContext(toolContext);
  const editorCtx = useContext(editorContext);
  const editorRef = useRef<HTMLDivElement>(null);

  //表示するfleurons
  const [displayFleurons, setDisplayFleurons] = useState(
    new Map<string, FleuronState>()
  );
  //選択されたfleurons
  const [selectedFleurons, setSelectedFleurons] = useState(
    new Map<string, FleuronState>()
  );
  const [selectedArea, setSelectedArea] = useState<Area<Grid>>(); //選択されたfleuronsを内包するグリッドエリア
  const [displaySelectedArea, setDisplaySelectedArea] = useState<Area<Grid>>(); //選択されたfleuronsを内包するグリッドエリア
  const [fleuronsMap, setFleuronsMap] = useState<(string | null)[][]>([[]]);
  const [moveAreaFleuronsMap, setMoveAreaFleuronsMap] = useState<
    (string | null)[][]
  >();
  const [isSeletedPosition, setIsSelectedPosition] = useState(false);
  const [dragSelectArea, setDragSelectArea] = useState<Area<Pixel>>();
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState<DragMode>();
  const [startSelectDragPosition, setStartSelectDragPosition] = useState<
    Point2D<Pixel>
  >({ x: 0, y: 0 } as Point2D<Pixel>);

  //useEffect
  useEffectOnce(() => {
    setDisplayFleurons(editorCtx.fleurons);

    updateEditorState();
  });

  useEffect(() => {
    updateEditorState();
  }, [editorRef?.current, editorCtx.gridSize]);

  useEffect(() => {
    console.log('displayFleurons', displayFleurons);
    console.log('selectedFleurons', selectedFleurons);
    console.log('fleuronsMap', fleuronsMap);
  }, [displayFleurons, selectedFleurons, fleuronsMap]);

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

  useEffect(() => {
    if (selectedFleurons.size <= 0) {
      setSelectedArea(undefined);
      return;
    }

    const minPosition: Point2D<Grid> = { x: 100, y: 100 } as Point2D<Grid>;
    const maxPosition: Point2D<Grid> = { x: -1, y: -1 } as Point2D<Grid>;
    selectedFleurons.forEach((v, key) => {
      const fleuronState = displayFleurons.get(key);
      if (!fleuronState) {
        return;
      }

      const position = fleuronState.position;
      const rect = fleuronState.fleuron.rect;
      const size = {
        x: rect.x * fleuronState.size,
        y: rect.y * fleuronState.size,
      } as Rectangle<Grid>;

      if (minPosition.x > position.x) {
        minPosition.x = position.x;
      }
      if (minPosition.y > position.y) {
        minPosition.y = position.y;
      }
      if (maxPosition.x < position.x + size.x) {
        maxPosition.x = (position.x + size.x) as AxisX<Grid>;
      }
      if (maxPosition.y < position.y + size.y) {
        maxPosition.y = (position.y + size.y) as AxisY<Grid>;
      }
    });

    setSelectedArea({
      position: minPosition,
      size: {
        x: maxPosition.x - minPosition.x,
        y: maxPosition.y - minPosition.y,
      } as Rectangle<Grid>,
    });

    setDisplaySelectedArea({
      position: minPosition,
      size: {
        x: maxPosition.x - minPosition.x,
        y: maxPosition.y - minPosition.y,
      } as Rectangle<Grid>,
    });
  }, [selectedFleurons]);

  const updateEditorState = () => {
    const array: typeof fleuronsMap = [];
    for (let y = 0; y < editorCtx.gridSize; y++) {
      array[y] = new Array(editorCtx.gridSize).fill(null);
    }

    setFleuronsMap(array);

    const currentEl = editorRef?.current;

    if (!currentEl) {
      return;
    }

    const height = (currentEl.getBoundingClientRect()?.height as Pixel) ?? null;

    if (height) {
      editorCtx.setEditorSize(height);
    }

    const positionX: number = currentEl.getBoundingClientRect()?.left ?? null;
    const positionY: number = currentEl.getBoundingClientRect()?.top ?? null;

    if (positionX !== null && positionY !== null) {
      editorCtx.setEditorPosition({
        x: positionX,
        y: positionY,
      } as Point2D<Pixel>);

      const array: Point2D<Pixel>[][] = [];
      const gridLiteralSize = height / editorCtx.gridSize;
      for (let x = 0; x < editorCtx.gridSize; x++) {
        const tmpArray: Point2D<Pixel>[] = [];
        for (let y = 0; y < editorCtx.gridSize; y++) {
          tmpArray[y] = {
            x: positionX + gridLiteralSize * x,
            y: positionY + gridLiteralSize * y,
          } as Point2D<Pixel>;
        }
        array[x] = tmpArray;
      }

      editorCtx.setGridPositions(array);
    }
  };

  const getRawPosition = (position: Point2D<Pixel>): Point2D<Pixel> => {
    const rawPosition = JSON.parse(JSON.stringify(position));

    if (rawPosition.x < editorCtx.editorPosition.x) {
      rawPosition.x = editorCtx.editorPosition.x as AxisX<Pixel>;
    }
    if (rawPosition.x > editorCtx.editorPosition.x + editorCtx.editorSize) {
      rawPosition.x = (editorCtx.editorPosition.x +
        editorCtx.editorSize) as AxisX<Pixel>;
    }
    if (rawPosition.y < editorCtx.editorPosition.y) {
      rawPosition.y = editorCtx.editorPosition.y as AxisY<Pixel>;
    }
    if (rawPosition.y > editorCtx.editorPosition.y + editorCtx.editorSize) {
      rawPosition.y = (editorCtx.editorPosition.y +
        editorCtx.editorSize) as AxisY<Pixel>;
    }

    return rawPosition;
  };

  const getGridDiff = (origin: Point2D<Pixel>, diff: Point2D<Pixel>) => {
    const originGridPosition = editorCtx.calcGridPosition(origin, editorCtx);
    const diffGridPosition = editorCtx.calcGridPosition(diff, editorCtx);

    return {
      x: diffGridPosition.x - originGridPosition.x,
      y: diffGridPosition.y - originGridPosition.y,
    } as Vec2D<Grid>;
  };

  const getArea = (
    posi1: Point2D<Pixel>,
    posi2: Point2D<Pixel>
  ): [Area<Pixel>, Area<Grid>] => {
    const fixedStartPosition = JSON.parse(JSON.stringify(posi1));
    if (fixedStartPosition.x > posi2.x) {
      fixedStartPosition.x = posi2.x;
    }
    if (fixedStartPosition.y > posi2.y) {
      fixedStartPosition.y = posi2.y;
    }

    const fixedEndPosition = JSON.parse(JSON.stringify(posi2));
    if (fixedEndPosition.x < posi1.x) {
      fixedEndPosition.x = posi1.x;
    }
    if (fixedEndPosition.y < posi1.y) {
      fixedEndPosition.y = posi1.y;
    }

    const fixedSize = {
      x: Math.abs(posi1.x - posi2.x),
      y: Math.abs(posi1.y - posi2.y),
    } as Rectangle<Pixel>;

    const pixelArea = {
      position: fixedStartPosition,
      size: fixedSize,
    } as Area<Pixel>;

    const gridDiff = getGridDiff(fixedStartPosition, fixedEndPosition);

    const gridSize = {
      x: Math.abs(gridDiff.x),
      y: Math.abs(gridDiff.y),
    } as Rectangle<Grid>;

    const gridArea = {
      position: editorCtx.calcGridPosition(fixedStartPosition, editorCtx),
      size: gridSize,
    } as Area<Grid>;

    return [pixelArea, gridArea];
  };

  const updateDisplayFleuron = (key: string, value: FleuronState) => {
    setDisplayFleurons((old) => {
      return new Map(old.set(key, value));
    });
  };

  const clearDisplayFleurons = () => {
    setDisplayFleurons((old) => {
      old.clear();
      return new Map(old);
    });
  };

  const deleteDisplayFleuron = (key: string) => {
    setDisplayFleurons((old) => {
      old.delete(key);
      return new Map(old);
    });
  };

  const updateSelectedFleuron = (key: string, value: FleuronState) => {
    setSelectedFleurons((old) => {
      return new Map(old.set(key, value));
    });
  };

  const clearSelectedFleurons = () => {
    setSelectedFleurons((old) => {
      old.clear();
      return new Map(old);
    });
  };

  const deleteSelectedFleuron = (key: string) => {
    setSelectedFleurons((old) => {
      old.delete(key);
      return new Map(old);
    });
  };

  const useSelectTool = (gridArea: Area<Grid>, isPressKey: boolean) => {
    if (
      !dragSelectArea ||
      (dragSelectArea?.size.x < 10 && dragSelectArea?.size.y < 10)
    ) {
      console.log('single');

      const fleuronId = fleuronsMap[gridArea.position.x][gridArea.position.y];
      const isSelected = fleuronId ? selectedFleurons.has(fleuronId) : false;
      const fleuron = fleuronId ? displayFleurons.get(fleuronId) : null;

      if (!((fleuronId && isPressKey) || isSelected)) {
        console.log('clear');
        clearSelectedFleurons();
      }
      if (fleuronId) {
        if (isSelected && isPressKey && isSeletedPosition) {
          console.log('delete');
          deleteSelectedFleuron(fleuronId);
        }

        if (!isSelected && fleuron) {
          console.log('add');
          updateSelectedFleuron(fleuronId, fleuron);
        }
      }
    } else {
      console.log('multi');

      for (
        let i = gridArea.position.x;
        i < gridArea.position.x + gridArea.size.x + 1;
        i++
      ) {
        for (
          let j = gridArea.position.y;
          j < gridArea.position.y + gridArea.size.y + 1;
          j++
        ) {
          const fleuronId = fleuronsMap[i][j];
          const isSelected = fleuronId
            ? selectedFleurons.has(fleuronId)
            : false;
          const fleuron = fleuronId ? displayFleurons.get(fleuronId) : null;

          if (fleuronId && !isSelected && fleuron) {
            updateSelectedFleuron(fleuronId, fleuron);
          }
          if (fleuronId && isSelected) {
            deleteSelectedFleuron(fleuronId);
          }
        }
      }
    }
  };

  const usePenTool = (gridArea: Area<Grid>, isPressKey: boolean) => {
    if (
      !dragSelectArea ||
      (dragSelectArea?.size.x < 10 && dragSelectArea?.size.y < 10)
    ) {
      if (editorCtx.currentFleuron) {
        const fleuron = editorCtx.fleuronDb.get(editorCtx.currentFleuron);

        if (!fleuron) {
          return;
        }

        const currentAngle = editorCtx.currentDefState.rotate;
        let isRotateRect = false;

        if (currentAngle === 90 && currentAngle === 270) {
          isRotateRect = true;
        }

        const currentSize: Rectangle<Grid> = {
          x: isRotateRect
            ? fleuron.rect.y * editorCtx.currentDefState.size
            : fleuron.rect.x * editorCtx.currentDefState.size,
          y: isRotateRect
            ? fleuron.rect.x * editorCtx.currentDefState.size
            : fleuron.rect.y * editorCtx.currentDefState.size,
        } as Rectangle<Grid>;

        if (
          gridArea.position.x + currentSize.x - 1 >= editorCtx.gridSize ||
          gridArea.position.y + currentSize.y - 1 >= editorCtx.gridSize
        ) {
          return;
        }

        for (
          let i = gridArea.position.x;
          i < gridArea.position.x + currentSize.x;
          i++
        ) {
          for (
            let j = gridArea.position.y;
            j < gridArea.position.y + currentSize.y;
            j++
          ) {
            if (fleuronsMap[i][j]) {
              return;
            }
          }
        }

        const newFleuronsMap = fleuronsMap;
        const uuid = nanoid();

        updateDisplayFleuron(uuid, {
          fleuron,
          position: gridArea.position,
          size: editorCtx.currentDefState.size,
          rotate: editorCtx.currentDefState.rotate,
          flip: editorCtx.currentDefState.flip,
        });

        for (
          let i = gridArea.position.x;
          i < gridArea.position.x + currentSize.x;
          i++
        ) {
          for (
            let j = gridArea.position.y;
            j < gridArea.position.y + currentSize.y;
            j++
          ) {
            newFleuronsMap[i][j] = uuid;
          }
        }

        setFleuronsMap(newFleuronsMap);
        editorCtx.setFleurons(displayFleurons);
      }
    }
  };

  const useEraserTool = (gridArea: Area<Grid>, isPressKey: boolean) => {
    if (
      !dragSelectArea ||
      (dragSelectArea?.size.x < 10 && dragSelectArea?.size.y < 10)
    ) {
      const fleuronId = fleuronsMap[gridArea.position.x][gridArea.position.y];

      if (!fleuronId) {
        return;
      }

      deleteDisplayFleuron(fleuronId);

      setFleuronsMap((old) =>
        old.map((yAxis) =>
          yAxis.map((v) => {
            return v === fleuronId ? null : v;
          })
        )
      );

      editorCtx.setFleurons(displayFleurons);
    }
  };

  //イベントハンドラ
  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isDragging) {
      return;
    }

    const rawPosition = getRawPosition({
      x: e.clientX,
      y: e.clientY,
    } as Point2D<Pixel>);

    const gridPosition = editorCtx.calcGridPosition(rawPosition, editorCtx);
    const fleuronId = fleuronsMap[gridPosition.x][gridPosition.y];
    const fleuron = fleuronId ? displayFleurons.get(fleuronId) : null;
    const isPressKey = e.ctrlKey || e.shiftKey || e.metaKey;

    if (fleuronId && fleuron) {
      if (!isPressKey && !selectedFleurons.has(fleuronId)) {
        clearSelectedFleurons();
      }

      if (isPressKey && selectedFleurons.has(fleuronId)) {
        setIsSelectedPosition(true);
      }

      updateSelectedFleuron(fleuronId, fleuron);
      setDragMode('move');
    } else {
      setDragMode('select');
    }

    setIsDragging(true);
    setStartSelectDragPosition(rawPosition);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!isDragging) {
      return;
    }

    const rawPosition = getRawPosition({
      x: e.clientX,
      y: e.clientY,
    } as Point2D<Pixel>);
    const [pixelArea, gridArea] = getArea(startSelectDragPosition, rawPosition);

    setDragSelectArea(pixelArea);

    switch (dragMode) {
      case 'move': {
        const gridDiff = getGridDiff(startSelectDragPosition, rawPosition);

        if (selectedArea && !moveAreaFleuronsMap) {
          const tmpMap: (string | null)[][] = new Array(selectedArea?.size.x);
          for (let x = 0; x < selectedArea?.size.x; x++) {
            tmpMap[x] = new Array(selectedArea?.size.y).fill(null);
          }

          const copyFleuronsMap = fleuronsMap;

          for (let i = 0; i < selectedArea?.size.x; i++) {
            for (let j = 0; j < selectedArea?.size.y; j++) {
              const fleuronId =
                copyFleuronsMap[selectedArea?.position.x + i][
                  selectedArea?.position.y + j
                ];

              if (fleuronId && selectedFleurons.has(fleuronId)) {
                tmpMap[i][j] = fleuronId;
                copyFleuronsMap[selectedArea?.position.x + i][
                  selectedArea?.position.y + j
                ] = null;
              }
            }
          }

          setDisplaySelectedArea({
            ...selectedArea,
            position: {
              x: selectedArea.position.x + gridDiff.x,
              y: selectedArea.position.y + gridDiff.y,
            } as Point2D<Grid>,
          } as Area<Grid>);

          setFleuronsMap(copyFleuronsMap);
          setMoveAreaFleuronsMap(tmpMap);
        }

        selectedFleurons.forEach((fleuron, key) => {
          updateDisplayFleuron(key, {
            ...fleuron,
            position: {
              x: fleuron.position.x + gridDiff.x,
              y: fleuron.position.y + gridDiff.y,
            } as Point2D<Grid>,
          });
        });
        break;
      }
      default:
        break;
    }
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsDragging(false);

    const rawPosition = getRawPosition({
      x: e.clientX,
      y: e.clientY,
    } as Point2D<Pixel>);
    const [pixelArea, gridArea] = getArea(startSelectDragPosition, rawPosition);
    const isPressKey = e.ctrlKey || e.shiftKey || e.metaKey;

    switch (toolCtx.currentTool) {
      case 'select': {
        if (dragMode === 'move' && moveAreaFleuronsMap && selectedArea) {
          const gridDiff = getGridDiff(startSelectDragPosition, rawPosition);

          let isOverlapping = false;

          for (let i = 0; i < selectedArea?.size.x; i++) {
            for (let j = 0; j < selectedArea?.size.y; j++) {
              const moveFleuronId = moveAreaFleuronsMap[i][j];
              const fleuronId =
                fleuronsMap[selectedArea.position.x + gridDiff.x + i][
                  selectedArea.position.y + gridDiff.y + j
                ];

              if (fleuronId && moveFleuronId) {
                isOverlapping = true;
              }
            }
          }

          if (isOverlapping) {
            console.log('overlapped', selectedArea, moveAreaFleuronsMap);

            for (let i = 0; i < selectedArea?.size.x; i++) {
              for (let j = 0; j < selectedArea?.size.y; j++) {
                fleuronsMap[selectedArea?.position.x + i][
                  selectedArea?.position.y + j
                ] = moveAreaFleuronsMap[i][j];
              }
            }

            selectedFleurons.forEach((fleuron, key) => {
              updateDisplayFleuron(key, {
                ...fleuron,
                position: {
                  x: fleuron.position.x,
                  y: fleuron.position.y,
                } as Point2D<Grid>,
              });
            });
          } else {
            console.log('正常');
            const copyFleuronsMap = fleuronsMap;

            for (let i = 0; i < selectedArea?.size.x; i++) {
              for (let j = 0; j < selectedArea?.size.y; j++) {
                copyFleuronsMap[selectedArea.position.x + gridDiff.x + i][
                  selectedArea.position.y + gridDiff.y + j
                ] = moveAreaFleuronsMap[i][j];
              }
            }

            setFleuronsMap(copyFleuronsMap);

            selectedFleurons.forEach((fleuron, key) => {
              const gridDiff = getGridDiff(
                startSelectDragPosition,
                rawPosition
              );
              updateDisplayFleuron(key, {
                ...fleuron,
                position: {
                  x: fleuron.position.x + gridDiff.x,
                  y: fleuron.position.y + gridDiff.y,
                } as Point2D<Grid>,
              });
              updateSelectedFleuron(key, {
                ...fleuron,
                position: {
                  x: fleuron.position.x + gridDiff.x,
                  y: fleuron.position.y + gridDiff.y,
                } as Point2D<Grid>,
              });
            });

            editorCtx.setFleurons(displayFleurons);
          }

          console.log(
            '結果だよ',
            displayFleurons,
            fleuronsMap,
            selectedFleurons
          );
        } else {
          useSelectTool(gridArea, isPressKey);
        }
        break;
      }
      case 'pen': {
        usePenTool(gridArea, isPressKey);
        break;
      }
      case 'eraser': {
        useEraserTool(gridArea, isPressKey);
        break;
      }
    }

    setDragSelectArea(undefined);
    setDragMode(undefined);
    setMoveAreaFleuronsMap(undefined);
    setIsSelectedPosition(false);
  };

  return (
    <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
      <GridWrapper
        ref={editorRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {/* 花形装飾描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          {[...displayFleurons.entries()].map((fleuron, i) => {
            return (
              <FleuronItem
                state={fleuron[1]}
                select={selectedFleurons.has(fleuron[0])}
                key={`fleuron_${i}`}
              />
            );
          })}
        </GridStyle>
        {/* グリッドライン描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          {[...Array(editorCtx.gridSize ** 2).keys()].map((v, i) => (
            <GridLine key={`grid_${i}`} />
          ))}
        </GridStyle>
        {/* 選択中花形装飾描画 */}
        <GridStyle gridSize={editorCtx.gridSize}>
          <SelectedArea
            area={selectedArea}
            select={selectedFleurons.size > 0}
          />
        </GridStyle>
      </GridWrapper>
      {/* {provided.placeholder} */}
      {isDragging && dragMode === 'select' && (
        <MultiSelectArea
          style={
            dragSelectArea && {
              width: `${dragSelectArea.size.x}px`,
              height: `${dragSelectArea.size.y}px`,
              transform: `translate(${dragSelectArea.position.x}px, ${dragSelectArea.position.y}px)`,
            }
          }
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`block absolute inset-0 m-auto py-10`};

  width: 80%;
`;

const GridWrapper = styled.div`
  ${tw`w-full bg-white relative border border-black border-solid`};

  &::before {
    ${tw`block`};
    content: '';
    padding-top: 100%;
  }
`;

const GridStyle = styled.div<{ gridSize: number }>`
  ${tw`w-full h-full grid absolute inset-0`};

  ${({ gridSize }) => css`
    grid-template-columns: repeat(${gridSize}, 1fr);
    grid-template-rows: repeat(${gridSize}, 1fr);
  `}
`;

const GridLine = styled.div`
  ${tw`w-full h-full border-black border border-solid border-opacity-70 pointer-events-none`};

  box-sizing: content-box;
`;

const MultiSelectArea = styled.div`
  ${tw`bg-primary bg-opacity-10 border-primary border border-solid border-opacity-70 fixed top-0 left-0 pointer-events-none`};
`;

export default Editor;
