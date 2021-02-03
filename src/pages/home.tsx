import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import {
  resetServerContext,
  DragDropContext,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Editor from '~/components/editor/editor';
import IconList from '~/components/sidebar/iconList';
import ToolList from '~/components/sidebar/toolList';
import ToolBar from '~/components/toolbar/toolBar';
import { editorContext } from '~/hooks';

const Home: React.FC = () => {
  const editorCtx = useContext(editorContext);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === 'editorDroppable') {
      if (editorCtx.currentDraggingState.selectedFleuron) {
        console.log(editorCtx.currentDraggingState.position);
        // editorCtx.updateFleuron('key2', {
        //   ...editorCtx.currentDraggingState.selectedFleuron,
        //   position: editorCtx.currentDraggingState.position,
        // });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <Main>
        <DragDropContext onDragEnd={onDragEnd}>
          <ToolBarWrapper>
            <ToolBar />
          </ToolBarWrapper>
          <Wrapper>
            <EditArea>
              <EditorWrapper>
                <Droppable droppableId="editorDroppable">
                  {(provided, snapshot) => (
                    <Editor provided={provided} snapshot={snapshot} />
                  )}
                </Droppable>
              </EditorWrapper>
            </EditArea>
            <SideBarWrapper>
              <ToolList />
              <IconList />
            </SideBarWrapper>
          </Wrapper>
        </DragDropContext>
      </Main>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

//   return { props: { data: [] } };
// };

const Main = styled.main`
  ${tw`w-screen h-screen relative`}
`;

const ToolBarWrapper = styled.div`
  ${tw`w-screen border-0 border-b border-black border-solid shadow-black relative`}

  height: 128px;

  &::before {
    ${tw`w-full h-2 bg-black absolute z-10`}

    content: "";
    top: 0;
  }
`;

const Wrapper = styled.div`
  ${tw`w-screen relative flex`}

  height: calc(100% - 129px);

  & > * {
    box-sizing: border-box;
  }
`;

const EditArea = styled.section`
  ${tw`h-full bg-surface-2 relative`}

  width: 75%;
`;

const EditorWrapper = styled.div`
  ${tw`h-full mx-48 relative`}
`;

const SideBarWrapper = styled.div`
  ${tw`bg-surface-0`}

  width: 25%;
`;

export default Home;
