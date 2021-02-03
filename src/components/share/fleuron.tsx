import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import * as fleuron from '~/utils/fleuron';
import { Point2D, Rectangle, Grid, Angle } from '~/utils/Geometory';

export type FleuronState = {
  fleuron: fleuron.Fleuron;
  position: Point2D<Grid>;
  size: Grid;
  rotate: Angle;
  flip: boolean;
};

interface Props {
  state: FleuronState;
}

const Fleuron: React.FC<Props> = (props) => {
  const { state } = props;

  const [image, setImage] = useState('');

  useEffect(() => {
    const getImage = async () => {
      const svgImage = await require(`~/assets/fleurons/${state.fleuron.image}.svg`);
      console.log(svgImage.default);
      setImage(svgImage.default);
    };

    getImage();
  }, [state]);

  return (
    <>
      <Icon
        image={image}
        imagePosition={state.fleuron.position}
        position={state.position}
        size={state.size}
        rotate={state.rotate}
        flip={state.flip}
        iconSize={state.fleuron.rect}
      />
    </>
  );
};

interface IconProps {
  image: string;
  imagePosition: fleuron.Fleuron['position'];
  position: Point2D<Grid>;
  size: Grid;
  rotate: Angle;
  flip: boolean;
  iconSize: Rectangle<Grid>;
}

const Icon = styled.div<IconProps>`
  ${tw`w-full h-full relative bg-no-repeat bg-center`}

  ${({ image }) => css`
    background-image: url(\"${image}\");
  `}

  ${({ imagePosition }) =>
    imagePosition === 'center'
      ? css`
          ${tw`bg-center`}
        `
      : css`
          ${tw`bg-bottom`}
        `}

  ${({ flip }) =>
    flip &&
    css`
      transform: scaleX(-1);
    `}
`;

export default Fleuron;
