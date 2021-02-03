import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { MolecularDictionary } from '~/components/architecture/moleculars/atomsList';
import Fleuron from '~/components/architecture/share/fleuron';

export const P21BList: MolecularDictionary = {
  id: 'P21B',
  atoms: [214, 215, 467, 466],
};

const P21B: React.FC = () => {
  return (
    <>
      <Wrapper>
        <F214Wrapper>
          <F214 />
          <F214 />
          <F214 />
          <F214 />
        </F214Wrapper>
        <F215Wrapper>
          <F215 />
          <F215 />
          <F215 />
          <F215 />
        </F215Wrapper>
        <F467AWrapper>
          <F467A />
          <F467A />
          <F467A />
          <F467A />
        </F467AWrapper>
        <F467BWrapper>
          <F467B />
          <F467B />
          <F467B />
          <F467B />
        </F467BWrapper>
        <F466Wrapper>
          <F466InnerWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
          </F466InnerWrapper>
          <F466InnerWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
          </F466InnerWrapper>
          <F466InnerWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
          </F466InnerWrapper>
          <F466InnerWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
          </F466InnerWrapper>
          <F466InnerWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
            <F466IconWrapper>
              <F466 />
            </F466IconWrapper>
          </F466InnerWrapper>
        </F466Wrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`relative w-pt-54 h-pt-54`}
`;

const F214Wrapper = styled.div`
  ${tw`absolute h-pt-36 w-pt-36 m-auto inset-0`}
`;

const F214 = styled((props) => <Fleuron name="F214" {...props} />)`
  ${tw`absolute h-pt-18 w-pt-18`}

  &:nth-child(1) {
    ${tw`-top-pt-18 right-0`}

    transform: rotate(0deg);
  }
  &:nth-child(2) {
    ${tw`-right-pt-18 bottom-0`}

    transform: rotate(90deg);
  }
  &:nth-child(3) {
    ${tw`-bottom-pt-18 left-0`}

    transform: rotate(180deg);
  }
  &:nth-child(4) {
    ${tw`-left-pt-18 top-0`}

    transform: rotate(270deg);
  }
`;

const F215Wrapper = styled.div`
  ${tw`absolute h-pt-36 w-pt-36 m-auto inset-0`}
`;

const F215 = styled((props) => <Fleuron name="F215" {...props} />)`
  ${tw`absolute h-pt-18 w-pt-18`}

  &:nth-child(1) {
    ${tw`-top-pt-18 left-0`}

    transform: rotate(0deg);
  }
  &:nth-child(2) {
    ${tw`-right-pt-18 top-0`}

    transform: rotate(90deg);
  }
  &:nth-child(3) {
    ${tw`-bottom-pt-18 right-0`}

    transform: rotate(180deg);
  }
  &:nth-child(4) {
    ${tw`-left-pt-18 bottom-0`}

    transform: rotate(270deg);
  }
`;

const F467AWrapper = styled.div`
  ${tw`absolute h-pt-36 w-pt-36  m-auto inset-0`}
`;

const F467A = styled((props) => <Fleuron name="F467" {...props} />)`
  ${tw`absolute h-pt-10 w-pt-10`}

  &:nth-child(1) {
    ${tw`-top-pt-10 -right-pt-10`}

    transform: rotate(180deg);
  }
  &:nth-child(2) {
    ${tw`-bottom-pt-10 -right-pt-10`}

    transform: rotate(270deg);
  }
  &:nth-child(3) {
    ${tw`-bottom-pt-10 -left-pt-10`}

    transform: rotate(0deg);
  }
  &:nth-child(4) {
    ${tw`-top-pt-10 -left-pt-10`}

    transform: rotate(90deg);
  }
`;

const F467BWrapper = styled.div`
  ${tw`absolute h-pt-30 w-pt-30  m-auto inset-0`}
`;

const F467B = styled((props) => <Fleuron name="F467" {...props} />)`
  ${tw`absolute h-pt-6 w-pt-6`}

  &:nth-child(1) {
    transform: rotate(0deg);
    top: 0;
    right: 0;
  }
  &:nth-child(2) {
    transform: rotate(90deg);
    bottom: 0;
    right: 0;
  }
  &:nth-child(3) {
    transform: rotate(180deg);
    bottom: 0;
    left: 0;
  }
  &:nth-child(4) {
    transform: rotate(270deg);
    top: 0;
    left: 0;
  }
`;

const F466Wrapper = styled.div`
  ${tw`absolute h-pt-30 w-pt-30 m-auto inset-0`}
`;

const F466InnerWrapper = styled.div`
  ${tw`absolute h-pt-6 w-pt-30 grid grid-rows-1 grid-cols-8`}

  &:nth-child(1) {
    ${tw`top-0 mx-auto inset-x-0 grid-cols-4 w-pt-18`}
  }
  &:nth-child(2) {
    ${tw`top-pt-6`}
  }
  &:nth-child(3) {
    ${tw`top-pt-12`}
  }
  &:nth-child(4) {
    ${tw`top-pt-18`}
  }
  &:nth-child(5) {
    ${tw`top-pt-24`}
    margin-left: 31px;
  }
`;

const F466 = styled((props) => <Fleuron name="F466" {...props} />)`
  ${tw`w-pt-6 absolute m-auto inset-0`}
`;

const F466IconWrapper = styled.div`
  ${tw`relative h-pt-6 w-pt-6`}

  &:nth-child(2n) {
    ${F466} {
      transform: rotate(90deg);
    }
  }

  &:nth-child(2n + 1) {
    ${F466} {
      transform: rotate(-90deg);
    }
  }
`;

export default P21B;
