import React from 'react';
import type { ISelectItemProps } from './types';
import { usePopover } from '../../../core';
import Button from '../Button';
import Text from '../Text';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { useThemeProps } from '../../../hooks';
import { Platform } from 'react-native';
import { Actionsheet } from '../../composites/Actionsheet';
import { SelectContext } from './Select';
import HStack from '../../primitives/Stack/HStack';
import Box from '../../primitives/Box';
import Icon from '../Icon';

export const Item = ({
  isDisabled,
  label,
  value,
  _label,
  style,
  ...props
}: ISelectItemProps) => {
  const { ...newProps } = useThemeProps('SelectItem', props);
  const { onValueChange, selectedValue } = React.useContext(SelectContext);

  if (Platform.OS === 'web') {
    return <option label={label} value={value} />;
  } else {
    return (
      <Actionsheet.Item
        onPress={() => {
          onValueChange(value);
        }}
        startIcon={
          selectedValue === value ? (
            <Icon type="MaterialIcons" name="check" size={6}></Icon>
          ) : (
            <Box size={6} />
          )
        }
      >
        <Text>{label}</Text>
      </Actionsheet.Item>
    );
  }
  // const {
  //   selectedValue,
  //   closeMenu,
  //   selectedItemBg,
  //   _selectedItem,
  //   onValueChange,
  //   itemsList,
  //   _item,
  //   width,
  // } = parentComponentConfig;
  // let currentIndex = -1;
  // itemsList.forEach((item: any, index: number) => {
  //   if (item.value === value) {
  //     currentIndex = index;
  //   }
  // });
  // let textProps = { ..._item, ..._label };
  // if (selectedValue === value) {
  //   textProps = { ..._selectedItem };
  // }
  // return (
  //   <Button
  //     width={width ?? 150}
  //     {...newProps}
  //     bg={selectedValue === value ? selectedItemBg : undefined}
  //     justifyContent="flex-start"
  //     style={style}
  //     onPress={() => {
  //       if (!isDisabled) {
  //         onValueChange(value, currentIndex);
  //         closeMenu && closeMenu();
  //       }
  //     }}
  //   >
  //     <Text fontSize="sm" key={`select-item-${value}`} {...textProps}>
  //       {label}
  //     </Text>
  //   </Button>
  // );
  // }
};

export default React.memo(Item);
