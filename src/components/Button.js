/* eslint-disable no-nested-ternary */
import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';
import { pSBC } from '../utils/color';

const Button = ({
  children,
  className = '',
  onClick,
  link,
  color,
  variant = '',
  size,
  external,
  left,
  center,
  right,
}) => {
  return (
    <span>
      {link ? (
        <>
          {external ? (
            <a
              href={link}
              className={
                left
                  ? 'no-styling left'
                  : center
                  ? 'no-styling center'
                  : right
                  ? 'no-styling right'
                  : 'no-styling'
              }
            >
              <StyledButton
                color={color}
                size={size}
                variant={variant}
                className={className}
                onClick={onClick || null}
                link
              >
                {children}
              </StyledButton>
            </a>
          ) : (
            <Link
              className={
                left
                  ? 'no-styling left'
                  : center
                  ? 'no-styling center'
                  : right
                  ? 'no-styling right'
                  : 'no-styling'
              }
              to={link}
            >
              <StyledButton
                color={color}
                size={size}
                variant={variant}
                className={className}
                onClick={onClick || null}
                link
              >
                {children}
              </StyledButton>
            </Link>
          )}
        </>
      ) : (
        <StyledButton
          color={color}
          size={size}
          variant={variant}
          className={className}
          onClick={onClick || null}
        >
          {children}
        </StyledButton>
      )}
    </span>
  );
};

const StyledButton = styled.button`
  box-shadow: ${(props) =>
    props.variant === 'secondary' ? props.theme.shadow.two : 'none'};

  outline: none;
  padding: 12px 24px;
  border: none;
  font-size: 16px;
  // font-weight: 500;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  padding: ${(props) =>
    props.size === 'small'
      ? '8px 12px'
      : props.size === 'large'
      ? '14px 29px'
      : '12px 18px'};
  font-size: ${(props) =>
    props.size === 'small' ? '14px' : props.size === 'large' ? '18px' : '16px'};
  border-radius: ${(props) => props.theme.radius.one};
  cursor: pointer;
  transition: all 0.25s;
  background: ${(props) =>
    props.variant === 'secondary'
      ? 'white'
      : props.variant === 'outlined'
      ? 'transparent'
      : props.color === 'primary'
      ? props.theme.color.primary.main
      : props.color === 'secondary'
      ? props.theme.color.secondary.main
      : props.color === 'error'
      ? props.theme.color.error
      : props.color === 'success'
      ? props.theme.color.success
      : ''};
  color: ${(props) =>
    props.variant === 'outlined' || props.variant === 'secondary'
      ? props.color === 'primary'
        ? props.theme.color.primary.main
        : props.color === 'secondary'
        ? props.theme.color.secondary.main
        : props.color === 'error'
        ? props.theme.color.error
        : props.color === 'success'
        ? props.theme.color.success
        : ''
      : props.color === 'primary' ||
        props.color === 'secondary' ||
        props.color === 'error' ||
        props.color === 'success'
      ? 'white'
      : ''};
  border: 2px solid
    ${(props) =>
      props.variant === 'secondary'
        ? 'transparent'
        : props.color === 'primary'
        ? props.theme.color.primary.main
        : props.color === 'secondary'
        ? props.theme.color.secondary.main
        : props.color === 'error'
        ? props.theme.color.error
        : props.color === 'success'
        ? props.theme.color.success
        : props.color === 'white'
        ? '#ffffff'
        : '#efefef'};
  :hover,
  :focus,
  :focus {
    color: ${(props) =>
      (props.color === 'primary' ||
        props.color === 'secondary' ||
        props.color === 'primary' ||
        props.color === 'error' ||
        props.color === 'success') &&
      props.variant !== 'secondary'
        ? 'white'
        : props.color === 'primary'
        ? props.theme.color.primary.main
        : props.color === 'secondary'
        ? props.theme.color.secondary.main
        : props.color === 'error'
        ? props.theme.color.error
        : props.color === 'success'
        ? props.theme.color.success
        : ''};
    background: ${(props) =>
      props.variant === 'outlined'
        ? props.color === 'primary'
          ? props.theme.color.primary.main
          : props.color === 'secondary'
          ? props.theme.color.secondary.main
          : props.color === 'error'
          ? props.theme.color.error
          : props.color === 'success'
          ? props.theme.color.success
          : '#efefef'
        : props.variant === 'secondary'
        ? 'white'
        : props.variant === 'outlined'
        ? 'transparent'
        : `${
            props.color === 'primary'
              ? pSBC(props.theme.color.primary.main, -25)
              : props.color === 'secondary'
              ? pSBC(props.theme.color.secondary.main, -25)
              : props.color === 'error'
              ? pSBC(props.theme.color.error, -25)
              : props.color === 'success'
              ? pSBC(props.theme.color.success, -25)
              : pSBC('#efefef', -10)
          }`};
    border: 2px solid
      ${(props) =>
        props.variant === 'secondary'
          ? 'transparent'
          : `${
              props.color === 'primary'
                ? props.theme.color.primary.main
                : props.color === 'secondary'
                ? props.theme.color.secondary.main
                : props.color === 'error'
                ? props.theme.color.error
                : props.color === 'success'
                ? props.theme.color.success
                : '#efefef'
            }00`} !important;
    box-shadow: ${(props) =>
      props.variant === 'secondary' ? props.theme.shadow.three : 'none'};

    // transform: translateY(-1px);
  }
  :active {
    box-shadow: none !important;
  }
`;

export default Button;
