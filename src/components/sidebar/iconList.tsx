import React, { useContext, useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import IconItem from '~/components/sidebar/iconItem';
import { editorContext } from '~/hooks';

const IconList: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const editorCtx = useContext(editorContext);

  const onClickItem = (itemId: number) => {
    if (itemId === selectedItemId) {
      setSelectedItemId(null);
      editorCtx.setCurrentFleuron(null);
    } else {
      setSelectedItemId(itemId);
      editorCtx.setCurrentFleuron(itemId);
    }
  };

  return (
    <>
      <IconListWrapper
        onClick={(e) => {
          setSelectedItemId(null);
        }}
      >
        <Droppable droppableId="IconListDroppable" isDropDisabled>
          {(provided, snapshot) => (
            <>
              <List
                ref={provided.innerRef}
                {...provided.droppableProps}
                key={`iconList_01`}
              >
                {[...editorCtx.fleuronDb.entries()].map((fleuron, i) => (
                  <>
                    <Draggable
                      draggableId={`${fleuron[0]}`}
                      index={i}
                      key={`icon_${i}`}
                    >
                      {(provided, snapshot) => (
                        <IconItem
                          id={fleuron[0]}
                          size={editorCtx.currentDefState.size}
                          rotate={editorCtx.currentDefState.rotate}
                          flip={editorCtx.currentDefState.flip}
                          selected={selectedItemId === fleuron[0]}
                          onClickItem={onClickItem}
                          provided={provided}
                          snapshot={snapshot}
                          key={`icon_${i}`}
                        />
                      )}
                    </Draggable>
                  </>
                ))}
              </List>
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </IconListWrapper>
    </>
  );
};

const IconListWrapper = styled.section`
  ${tw`w-full bg-surface-1 relative overflow-y-scroll`}

  & * {
    box-sizing: border-box;
  }
`;

const List = styled.div`
  ${tw`bg-white px-8 py-8 overflow-scroll flex justify-between flex-wrap`}
  box-sizing: border-box;
`;

export default IconList;
