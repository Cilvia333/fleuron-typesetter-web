import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Svg001 from '~/assets/moleculars/svg001.svg';
import Svg002 from '~/assets/moleculars/svg002.svg';
import Svg003 from '~/assets/moleculars/svg003.svg';
import Svg004 from '~/assets/moleculars/svg004.svg';
import Svg005 from '~/assets/moleculars/svg005.svg';

interface Props {
  name: string;
  className?: string;
}

const MolecularIcon: React.FC<Props> = ({ name, className, ...props }) => {
  const iconTypes = {
    Svg001,
    Svg002,
    Svg003,
    Svg004,
    Svg005,
  };
  const IconList = Object.entries(iconTypes).find(([id, data]) => id === name);
  const Icon: typeof React.Component = IconList ? IconList[1] : null;

  return (
    <Wrapper>
      <Icon className={className} {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`w-full h-full`}

  & > svg {
    ${tw`block fill-current w-full h-full`}
  }
`;

export default MolecularIcon;
