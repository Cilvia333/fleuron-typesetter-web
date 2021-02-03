import { useState, useCallback, createContext } from 'react';

import data from '~/assets/fleurons/fleurons.json';
import { FleuronState } from '~/components/share/fleuron';
import { Fleuron } from '~/utils/fleuron';
import { Point2D, Rectangle, Pixel, Grid, Angle } from '~/utils/Geometory';

type DraggingState = {
  position: Point2D<Grid>;
  editorPosition: Point2D<Pixel>;
  isDroppable: boolean;
  selectedFleuron: FleuronState | null;
};

export type DefState = {
  size: FleuronState['size'];
  rotate: FleuronState['rotate'];
  flip: FleuronState['flip'];
};

const mockFleuron: Fleuron = data[0] as Fleuron;
const mockFleuron2: Fleuron = data[1] as Fleuron;

interface EditorContext {
  fleuronDb: Map<number, Fleuron>;
  currentFleuron: Fleuron['id'] | null;
  setCurrentFleuron: (current: Fleuron['id'] | null) => void;
  fleurons: Map<string, FleuronState>;
  setFleurons: (current: Map<string, FleuronState>) => void;
  currentDraggingState: DraggingState;
  setCurrentDraggingState: (current: DraggingState) => void;
  currentDefState: DefState;
  setCurrentDefState: (current: DefState) => void;
  gridSize: Grid;
  setGridSize: (size: Grid) => void;
  gridPositions: Point2D<Pixel>[][];
  setGridPositions: (position: Point2D<Pixel>[][]) => void;
  editorSize: Pixel;
  setEditorSize: (size: Pixel) => void;
  editorPosition: Point2D<Pixel>;
  setEditorPosition: (position: Point2D<Pixel>) => void;
  calcGridPosition: (
    position: Point2D<Pixel>,
    ctx: EditorContext
  ) => Point2D<Grid>;
}

export const editorContext = createContext<EditorContext>({
  fleuronDb: new Map<number, Fleuron>([
    [mockFleuron.id, mockFleuron],
    [mockFleuron2.id, mockFleuron2],
  ]),
  currentFleuron: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentFleuron: () => {},
  fleurons: new Map<string, FleuronState>([]),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFleurons: () => {},

  currentDraggingState: {
    position: { x: 0, y: 0 } as Point2D<Grid>,
    editorPosition: { x: 0, y: 0 } as Point2D<Pixel>,
    isDroppable: false,
    selectedFleuron: null,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentDraggingState: () => {},
  currentDefState: { size: 1, rotate: 0, flip: false } as DefState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentDefState: () => {},
  gridSize: 4 as Grid,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setGridSize: () => {},
  gridPositions: [
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  ] as Point2D<Pixel>[][],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setGridPositions: () => {},
  editorSize: 4 as Pixel,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEditorSize: () => {},
  editorPosition: { x: 0, y: 0 } as Point2D<Pixel>,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEditorPosition: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  calcGridPosition: (position: Point2D<Pixel>, ctx: EditorContext) => {
    return { x: 0, y: 0 } as Point2D<Grid>;
  },
});

export const useEditorContext = (): EditorContext => {
  const [fleuronDb, setFleuronDb] = useState(
    new Map<number, Fleuron>([
      [1, mockFleuron],
      [2, mockFleuron2],
    ])
  );
  const [currentFleuron, updateCurrentFleuron] = useState<Fleuron['id'] | null>(
    null
  );
  const setCurrentFleuron = useCallback(
    (current: Fleuron['id'] | null): void => {
      updateCurrentFleuron(current);
    },
    []
  );
  const [fleurons, updateFleurons] = useState(
    new Map<string, FleuronState>([])
  );
  const setFleurons = useCallback(
    (current: Map<string, FleuronState>): void => {
      updateFleurons(current);
    },
    []
  );

  const [currentDraggingState, setDraggingState] = useState<DraggingState>({
    position: { x: 0, y: 0 } as Point2D<Grid>,
    editorPosition: { x: 0, y: 0 } as Point2D<Pixel>,
    isDroppable: false,
    selectedFleuron: null,
  });
  const setCurrentDraggingState = useCallback(
    (current: DraggingState): void => {
      setDraggingState(current);
    },
    []
  );
  const [currentDefState, updateCurrentDefState] = useState<DefState>({
    size: 1,
    rotate: 0,
    flip: false,
  } as DefState);
  const setCurrentDefState = useCallback((current: DefState): void => {
    updateCurrentDefState(current);
  }, []);
  const [gridSize, updateGridSize] = useState(4 as Grid);
  const setGridSize = useCallback((size: Grid): void => {
    updateGridSize(size);
  }, []);
  const [gridPositions, updateGridPositions] = useState<Point2D<Pixel>[][]>([
    [],
  ]);
  const setGridPositions = useCallback((position: Point2D<Pixel>[][]): void => {
    updateGridPositions(position);
  }, []);
  const [editorSize, updateEditorSize] = useState(4 as Pixel);
  const setEditorSize = useCallback((size: Pixel): void => {
    updateEditorSize(size);
  }, []);
  const [editorPosition, updateEditorPosition] = useState<Point2D<Pixel>>({
    x: 0,
    y: 0,
  } as Point2D<Pixel>);
  const setEditorPosition = useCallback((position: Point2D<Pixel>): void => {
    updateEditorPosition(position);
  }, []);
  const calcGridPosition = useCallback(
    (position: Point2D<Pixel>, ctx: EditorContext): Point2D<Grid> => {
      const currentX = Math.floor(
        ((position.x - ctx.editorPosition.x) / ctx.editorSize) * ctx.gridSize
      );
      const currentY = Math.floor(
        ((position.y - ctx.editorPosition.y) / ctx.editorSize) * ctx.gridSize
      );

      return { x: currentX, y: currentY } as Point2D<Grid>;
    },
    []
  );
  return {
    fleuronDb,
    currentFleuron,
    setCurrentFleuron,
    fleurons,
    setFleurons,
    currentDraggingState,
    setCurrentDraggingState,
    currentDefState,
    setCurrentDefState,
    gridSize,
    setGridSize,
    gridPositions,
    setGridPositions,
    editorSize,
    setEditorSize,
    editorPosition,
    setEditorPosition,
    calcGridPosition,
  };
};
