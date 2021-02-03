import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

const mode = ['toggle', 'action'] as const;

type Mode = typeof mode[keyof typeof mode];
interface Props {
  icon?: IconDefinition;
  text?: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  mode: Mode;
  active?: boolean;
  className?: string;
}

const Button: React.FC<Props> = (props) => {
  const { icon, text, onClick, mode, active, className } = props;

  return (
    <>
      <CustomButton
        onClick={onClick}
        isSetIcon={icon ? true : false}
        isActive={active ?? false}
        mode={mode}
        className={className ?? ''}
      >
        {icon && <Icon icon={icon} />}
        {text}
      </CustomButton>
    </>
  );
};

interface ButtonProps {
  isSetIcon: boolean;
  isActive: boolean;
  mode: Mode;
}

const Icon = styled(FontAwesomeIcon)`
  ${tw`absolute inset-0 m-auto`}
`;

const CustomButton = styled.button<ButtonProps>`
  ${tw`h-8 px-2 text-center cursor-pointer relative text-base border border-black border-solid bg-white font-text font-medium`}

  box-sizing: border-box;

  ${({ isActive }) =>
    isActive &&
    css`
      ${tw`bg-black border-transparent text-white`}
    `}

  ${({ isSetIcon }) =>
    isSetIcon &&
    css`
      ${tw`w-8 p-0`}
    `}

  &:hover {
    ${tw`bg-gray text-white`}
  }

  ${({ mode }) =>
    mode === 'action' &&
    css`
      &:active {
        ${tw`bg-primary border-transparent text-white`}
        transform: translateY(2px);
      }
    `}

  ${({ mode }) =>
    mode === 'toggle' &&
    css`
      &:active {
        ${tw`bg-black border-transparent text-white`}

        transform: translateY(2px);
      }
    `}
`;

export default Button;
