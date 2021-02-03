import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import Svg001, { svg001Info } from '~/components/architecture/atoms/svg001';
import Svg002, { svg002Info } from '~/components/architecture/atoms/svg002';
import Svg003, { svg003Info } from '~/components/architecture/atoms/svg003';
import Svg004, { svg004Info } from '~/components/architecture/atoms/svg004';
import Svg005, { svg005Info } from '~/components/architecture/atoms/svg005';

export interface MolecularProps {
  animation: boolean;
  onClick: (id: number) => void;
  grid: boolean;
  selectAtom: number | null;
  className?: string;
}

export interface AtomsProps {
  number: number;
  select: boolean;
  animation: boolean;
  loadAnimation: boolean;
}

export type MolecularInfo = {
  id: string;
  atoms: number[];
  page: number;
};

export const molecularTypes = {
  Svg001,
  Svg002,
  Svg003,
  Svg004,
  Svg005,
};

export const molecularInfos: MolecularInfo[] = [
  svg001Info,
  svg002Info,
  svg003Info,
  svg004Info,
  svg005Info,
];

export const molecularList = Object.entries(molecularTypes).map(
  ([id, data]) => id
);

interface Props extends MolecularProps {
  name: string;
}

const Molecular: React.FC<Props> = ({ name, ...props }) => {
  const MolecularList = Object.entries(molecularTypes).find(
    ([id, data]) => id === name
  );
  const Molecular: React.FunctionComponent<MolecularProps> = MolecularList
    ? MolecularList[1]
    : Svg001;

  return <Molecular {...props} />;
};

export const Svg = styled((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" {...props} />
))`
  ${tw`absolute inset-0 m-auto fill-current transition-all duration-300 hover:text-primary`}
  width: 600px;
  height: 600px;
  pointer-events: none;
  path {
    ${tw`transition-all duration-300`}
    pointer-events: auto;
    cursor: pointer;
  }
`;

export const Box = styled.div<{ active: boolean }>`
  ${tw`absolute inset-0 m-auto`}
  width: 600px;
  height: 600px;
  pointer-events: none;

  ${({ active }) =>
    active
      ? css`
          svg {
            ${tw`fill-current`}
          }
        `
      : css`
          svg {
            fill: transparent;
          }
        `}
`;

export const BoxSvg = styled(Svg)<{ select: boolean }>`
  ${tw`text-black`}

  ${({ select }) =>
    select &&
    css`
      ${tw`text-primary`}
    `}
`;

export const Shape = styled.div`
  ${tw`absolute inset-0 m-auto`}
  width: 600px;
  height: 600px;
  pointer-events: none;
`;

export default Molecular;
