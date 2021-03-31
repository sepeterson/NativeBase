import React from 'react';
import { Text as NativeText } from 'react-native';
import styled from 'styled-components/native';
import {
  color,
  position,
  space,
  typography,
  layout,
  flexbox,
  border,
} from 'styled-system';
import { useThemeProps } from '../../../hooks/useThemeProps';
import { useTheme } from '../../../hooks';
import {
  customBorder,
  customBackground,
  customOutline,
  customLayout,
  customExtra,
  customShadow,
  customTypography,
  customPosition,
} from '../../../utils/customProps';
import type { ITextProps } from './types';

const StyledText = styled(NativeText)<ITextProps>(
  color,
  space,
  position,
  layout,
  flexbox,
  border,
  typography,
  position,
  customPosition,
  customBorder,
  customBackground,
  customOutline,
  customShadow,
  customExtra,
  customLayout,
  customTypography
);

const Text = ({ children, ...props }: ITextProps, ref: any) => {
  const {
    isTruncated,
    noOfLines,
    bold,
    italic,
    sub,
    highlight,
    underline,
    strikeThrough,
    fontWeight,
    fontFamily,
    ...newProps
  } = useThemeProps('Text', props);

  const { fontWeights, fonts } = useTheme();
  const newFontFamily = `${fonts[fontFamily]}-${fontWeights[fontWeight]}`;

  return (
    <StyledText
      {...newProps}
      numberOfLines={noOfLines ? noOfLines : isTruncated ? 1 : undefined}
      fontStyle={italic ? 'italic' : newProps.fontStyle}
      bg={highlight ? 'warning.200' : newProps.bg}
      textDecorationLine={
        underline
          ? 'underline'
          : strikeThrough
          ? 'line-through'
          : newProps.textDecorationLine
      }
      fontSize={sub ? 10 : newProps.fontSize}
      ref={ref}
      fontFamily={newFontFamily}
    >
      {children}
    </StyledText>
  );
};

export default React.memo(React.forwardRef(Text));
export type { ITextProps };
