import { Platform } from 'react-native';
import { mode } from '../tools/colors';

const baseStyle = (props: Record<string, any>) => {
  return {
    fieldStyle: {
      appearance: Platform.OS === 'web' ? 'none' : undefined,
      borderWidth: 0,
      py: 2,
      px: 2,
      bg: 'transparent',
    },
    fieldWrapperStyle: {
      borderRadius: 4,
      borderColor: 'default.500',
      borderWidth: 1,
      _hover: {
        borderColor: 'default.500',
      },
    },
    arrowStyle: {
      position: 'absolute',
      right: 2,
      top: '50%',
      style: {
        transform: [{ translateY: '-50%' }],
      },
    },
  };
};

// Select
export const Select = {
  baseStyle,
};

// SelectIcon - only for styled variant
export const SelectItem = {
  baseStyle: {
    p: 1,
    px: 2,
    borderRadius: 0,
    minH: 0,
  },
};
