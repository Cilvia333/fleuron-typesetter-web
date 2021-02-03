import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

interface Props {
  value: number;
  onChangeNumber: (num: number) => void;
}

const InputNum: React.FC<Props> = (props) => {
  const { value, onChangeNumber } = props;

  return (
    <Wrapper>
      <CustomInput
        type="number"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value = Number(e.target.value);
          onChangeNumber(value);
        }}
      />
      <ButtonWrapper>
        <Button
          onClick={() => {
            onChangeNumber(value + 1);
          }}
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </Button>
        <Button
          onClick={() => {
            onChangeNumber(value - 1);
          }}
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${tw`h-8 text-center cursor-pointer relative text-base flex`}
  width: 100px;
`;

const CustomInput = styled.input`
  ${tw`w-3/4 h-8 text-right text-lg font-text font-normal border-0 border-b border-black border-solid`}

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ButtonWrapper = styled.div`
  ${tw`w-1/4 flex justify-between flex-col pt-1`}
`;

const Button = styled.button`
  ${tw`w-full h-3 text-black`}
`;

export default InputNum;
