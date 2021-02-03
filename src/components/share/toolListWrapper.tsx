import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
  title: string;
}

const ToolListWrapper: React.FC<Props> = (props) => {
  const { title, children } = props;

  return (
    <>
      <Wrapper>
        <ToolListHeader>{title}</ToolListHeader>
        <ToolButtonList>{children}</ToolButtonList>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`relative`}
`;

const ToolListHeader = styled.h2`
  ${tw`w-full relative m-0 p-0 text-black text-base font-header`}

  &::before {
    ${tw`w-full absolute bg-black`}

    content: "";
    bottom: -4px;
    height: 1px;
  }
`;

const ToolButtonList = styled.ul`
  ${tw`w-full relative p-0 flex`}

  & > * {
    ${tw`mr-2`}
  }
`;

export const ToolListDivider = styled.div`
  ${tw`h-8 bg-black`}
  width: 1px;
`;

export default ToolListWrapper;
