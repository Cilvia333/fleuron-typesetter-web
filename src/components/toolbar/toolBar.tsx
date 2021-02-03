import {
  faMousePointer,
  faPencilAlt,
  faEraser,
} from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Button from '~/components/share/button';
import InputNum from '~/components/share/inputNum';
import ToolListWrapper, {
  ToolListDivider,
} from '~/components/share/toolListWrapper';
import { toolContext, editorContext } from '~/hooks';
import { Grid } from '~/utils/Geometory';

const gridPreset = ['4x4', '8x8', '16x16', 'custom'];

type GridPreset = typeof gridPreset[keyof typeof gridPreset];

const ToolBar: React.FC = () => {
  const toolCtx = useContext(toolContext);
  const editorCtx = useContext(editorContext);
  const [gridSize, setGridSize] = useState(4);
  const [gridSet, setGridSet] = useState<GridPreset>('4x4');

  useEffect(() => {
    if (gridSet === 'custom') {
      editorCtx.setGridSize(gridSize as Grid);
    }
  }, [gridSize, gridSet]);

  return (
    <>
      <Wrapper>
        <AppTitle>Fleuron Typesetter</AppTitle>
        <Divider />
        <ToolListWrapper title={'ツール'}>
          <Button
            icon={faMousePointer}
            mode={'toggle'}
            active={toolCtx.currentTool === 'select'}
            onClick={() => {
              toolCtx.setCurrentTool('select');
            }}
          />
          <Button
            icon={faPencilAlt}
            mode={'toggle'}
            active={toolCtx.currentTool === 'pen'}
            onClick={() => {
              toolCtx.setCurrentTool('pen');
            }}
          />
          <Button
            icon={faEraser}
            mode={'toggle'}
            active={toolCtx.currentTool === 'eraser'}
            onClick={() => {
              toolCtx.setCurrentTool('eraser');
            }}
          />
        </ToolListWrapper>
        <ToolListWrapper title={'グリッドサイズ'}>
          <Button
            text={'4×4'}
            mode={'toggle'}
            active={gridSet === '4x4'}
            onClick={() => {
              setGridSet('4x4');
              editorCtx.setGridSize(4 as Grid);
            }}
          />
          <Button
            text={'8×8'}
            mode={'toggle'}
            active={gridSet === '8x8'}
            onClick={() => {
              setGridSet('8x8');
              editorCtx.setGridSize(8 as Grid);
            }}
          />
          <Button
            text={'16×16'}
            mode={'toggle'}
            active={gridSet === '16x16'}
            onClick={() => {
              setGridSet('16x16');
              editorCtx.setGridSize(16 as Grid);
            }}
          />
          <ToolListDivider />
          <Button
            text={'custom'}
            mode={'toggle'}
            active={gridSet === 'custom'}
            onClick={() => {
              setGridSet('custom');
              editorCtx.setGridSize(gridSize as Grid);
            }}
          />
          <InputNum
            value={gridSize}
            onChangeNumber={(num) => {
              if (0 < num && num < 100) {
                setGridSize(num);
              }
            }}
          />
        </ToolListWrapper>
        <UtilButton>Reset</UtilButton>
        <ExportButton>Export</ExportButton>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`w-full h-full bg-surface-1 relative px-4 flex items-center`}

  box-sizing: border-box;

  & * {
    box-sizing: border-box;
  }

  & > * {
    ${tw`mr-8`}
  }
`;

const AppTitle = styled.h1`
  ${tw`font-header text-4xl font-bold leading-none`}
`;

const Divider = styled.div`
  ${tw`h-1/2 bg-black`}

  width: 1px;
`;

const UtilButton = styled.button`
  ${tw`h-8 px-2 text-center cursor-pointer relative text-xl border border-black border-solid bg-white font-text font-medium text-black font-bold`}

  &:hover {
    ${tw`bg-gray text-white`}
  }

  &:active {
    ${tw`bg-black border-transparent text-white`}
    transform: translateY(2px);
  }
`;

const ExportButton = styled(UtilButton)`
  ${tw`border-primary text-primary`}

  &:hover {
    ${tw`bg-primary border-transparent text-white`}
  }

  &:active {
    ${tw`bg-primary border-transparent text-white`}
    transform: translateY(2px);
  }
`;

export default ToolBar;
