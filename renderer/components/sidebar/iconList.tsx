import React, { useContext, useState, useEffect } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import IconItem from '~/components/sidebar/iconItem';
import { editorContext } from '~/hooks';

const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const IconList: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const editorCtx = useContext(editorContext);

  const onClickItem = (itemId: number) => {
    if (itemId === selectedItemId) {
      setSelectedItemId(null);
      editorCtx.setCurrentFleuron(null);
    } else {
      setSelectedItemId(itemId);
      console.log(itemId);
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
                {mockList.map((v, i) => (
                  <>
                    <Draggable draggableId={`${i}`} index={i} key={`icon_${i}`}>
                      {(provided, snapshot) => (
                        <IconItem
                          id={1}
                          size={1}
                          rotate={0}
                          selected={selectedItemId === i}
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
  ${tw`w-full h-full bg-surface-1 relative overflow-y-scroll`}

  & * {
    box-sizing: border-box;
  }
`;

const List = styled.div`
  ${tw`bg-white px-8 py-8 overflow-scroll flex justify-between flex-wrap`}
  box-sizing: border-box;
`;

export default IconList;
