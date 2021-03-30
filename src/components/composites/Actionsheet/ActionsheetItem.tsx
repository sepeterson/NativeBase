import React from 'react';
import Button from '../../primitives/Button';
import type { IActionsheetItemProps } from './types';
import { useThemeProps } from '../../../hooks';

const ActionsheetItem = ({ children, ...props }: IActionsheetItemProps) => {
  const newProps = useThemeProps('ActionsheetItem', props);

  console.log('nwew props ', props, children);
  return (
    <Button variant="unstyled" {...newProps}>
      {children}
    </Button>
  );
};

export default React.memo(ActionsheetItem);
