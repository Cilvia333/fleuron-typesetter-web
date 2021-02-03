import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import F214 from '~/assets/fleurons/svgs/214.svg';
import F215 from '~/assets/fleurons/svgs/215.svg';
import F218 from '~/assets/fleurons/svgs/218.svg';
import F219 from '~/assets/fleurons/svgs/219.svg';
import F263 from '~/assets/fleurons/svgs/263.svg';
import F264 from '~/assets/fleurons/svgs/264.svg';
import F268 from '~/assets/fleurons/svgs/268.svg';
import F29 from '~/assets/fleurons/svgs/29.svg';
import F310 from '~/assets/fleurons/svgs/310.svg';
import F311 from '~/assets/fleurons/svgs/311.svg';
import F312 from '~/assets/fleurons/svgs/312.svg';
import F313 from '~/assets/fleurons/svgs/313.svg';
import F314 from '~/assets/fleurons/svgs/314.svg';
import F315 from '~/assets/fleurons/svgs/315.svg';
import F466 from '~/assets/fleurons/svgs/466.svg';
import F467 from '~/assets/fleurons/svgs/467.svg';

export const iconTypes = {
  F268,
  F466,
  F467,
  F214,
  F215,
  F310,
  F263,
  F29,
  F218,
  F219,
  F264,
  F311,
  F312,
  F313,
  F314,
  F315,
};

interface Props {
  name: string;
  border?: boolean;
  className?: string;
}

const Fleuron: React.FC<Props> = ({ name, border, className, ...props }) => {
  const IconList = Object.entries(iconTypes).find(([id, data]) => id === name);
  const Icon: typeof React.Component = IconList ? IconList[1] : null;

  return (
    <Wrapper border={border ?? false} className={className}>
      <Icon {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ border: boolean }>`
  ${tw`border-0 border-solid`}

  & > svg {
    ${tw`block fill-current`}
  }

  ${({ border }) =>
    border &&
    css`
      ${tw`border`}
    `}
`;

export default Fleuron;
