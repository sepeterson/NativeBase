import React from 'react';
import Text from '../Text';
import type { ISelectProps } from './types';
import { usePopover } from '../../../core';
import Box from '../Box';
import { Platform, ScrollView, unstable_createElement } from 'react-native';
import { useThemeProps } from '../../../hooks';
import { useHover } from '@react-native-aria/interactions';
import { Picker as RNPicker } from '@react-native-picker/picker';
import styled from 'styled-components';
import {
  border,
  flex,
  space,
  color,
  flexbox,
  layout,
  typography,
} from 'styled-system';
import {
  customBorder,
  customBackground,
  customOutline,
  customLayout,
  customExtra,
  customShadow,
  customTypography,
} from '../../../utils/customProps';
import { useFormControlContext } from '../../composites/FormControl';
import { Actionsheet } from '../../composites/Actionsheet';

import Divider from '../../composites/Divider';
import Pressable from '../../primitives/Pressable';
import { useControllableState } from '../../../hooks';
import HStack from '../Stack/HStack';
import Icon from '../Icon';
import { themeTools } from 'lib/typescript';

const SelectNative = (props) => unstable_createElement('select', props);

const StyledNativePicker = styled(SelectNative)<ISelectProps>(
  flex,
  color,
  space,
  layout,
  flexbox,
  border,
  typography,
  customBorder,
  customBackground,
  customOutline,
  customShadow,
  customExtra,
  customTypography,
  customLayout
);

export const SelectContext = React.createContext({
  selectedValue: '',
  onValueChange: (val: any) => {},
});

const Select = (
  {
    onValueChange,
    defaultValue,
    selectedValue,
    children,
    dropdownIcon,
    dropdownOpenIcon,
    dropdownCloseIcon,
    ...props
  }: ISelectProps,
  ref: any
) => {
  const formControlContext = useFormControlContext();

  const {
    variant,
    _item,
    placeholder,
    _hover,
    isInvalid,
    _isInvalid,
    isDisabled,
    _isDisabled,
    width,
    style,
    color,
    androidMode,
    androidIconColor,
    androidPrompt,
    ...newProps
  } = useThemeProps('Select', { ...formControlContext, ...props });

  let triggerRef = React.useRef();
  const { isHovered } = useHover({}, ref ?? triggerRef);
  let [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  let itemsList: Array<{ label: string; value: string }> = React.Children.map(
    children,
    (child: any) => {
      return {
        label: child.props.label,
        value: child.props.value,
      };
    }
  );

  const selectedItem = itemsList.find((item) => item.value === selectedValue);

  const [value, setValue] = useControllableState({
    value: selectedValue,
    defaultValue,
    onChange: (newValue) => {
      onValueChange && onValueChange(newValue);
      handleClose();
    },
  });

  if (Platform.OS === 'web') {
    return (
      <Box position="relative" {...newProps.fieldWrapperStyle}>
        <StyledNativePicker
          value={value}
          width="100%"
          height="100%"
          borderWidth={0}
          {...newProps.fieldStyle}
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </StyledNativePicker>
        <Box {...newProps.arrowStyle}>
          <Icon type="MaterialIcons" name="keyboard-arrow-down" size={4}></Icon>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Pressable
        onPress={handleOpen}
        position="relative"
        {...newProps.fieldStyle}
        {...newProps.fieldWrapperStyle}
      >
        <Text>{selectedItem ? selectedItem.label : placeholder}</Text>
        <Box style={newProps.arrowStyle}>
          <Icon type="MaterialIcons" name="keyboard-arrow-down" size={4}></Icon>
        </Box>
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={handleClose}>
        <Actionsheet.Content>
          <Actionsheet.Header>{placeholder}</Actionsheet.Header>
          <SelectContext.Provider
            value={{
              onValueChange: setValue,
              selectedValue: value,
            }}
          >
            {children}
          </SelectContext.Provider>
        </Actionsheet.Content>
        <Actionsheet.Footer>
          <Actionsheet.Item onPress={handleClose}>Cancel</Actionsheet.Item>
        </Actionsheet.Footer>
      </Actionsheet>
    </>
  );

  // const openMenu = () => {
  //   if (!isDisabled) {
  //     setPopover(<ScrollView>{children}</ScrollView>, {
  //       triggerRef,
  //       animationDuration: 200,
  //       onClose: closeMenu,
  //       placeOverTriggerElement: false,
  //       parentComponentConfig: {
  //         open: isOpen,
  //         closeMenu,
  //         closeOnSelect: true,
  //         selectedValue,
  //         selectedItemBg,
  //         _selectedItem,
  //         onValueChange,
  //         itemsList,
  //         _item,
  //         width,
  //         variant: 'styled',
  //       },
  //     });
  //     toggle(true);
  //   }
  // };
  // const selectedItemArray = itemsList.filter(
  //   (item: any) => item.value === selectedValue
  // );
  // const selectedItem =
  //   selectedItemArray && selectedItemArray.length ? selectedItemArray[0] : null;
  // let icon =
  //   !dropdownOpenIcon && !dropdownCloseIcon && dropdownIcon
  //     ? dropdownIcon
  //     : isOpen
  //     ? dropdownOpenIcon
  //       ? dropdownOpenIcon
  //       : null
  //     : dropdownCloseIcon
  //     ? dropdownCloseIcon
  //     : null;
  // const placeholderProps = selectedItem ? {} : _placeholder;

  // const StyledSelect = (
  //   <Button
  //     onPress={openMenu}
  //     width={width}
  //     ref={ref ?? triggerRef}
  //     {...newProps}
  //     justifyContent="space-between"
  //     {...(isDisabled && _isDisabled)}
  //     {...(isInvalid && _isInvalid)}
  //     {...(isHovered && _hover)}
  //     {...(Platform.OS === 'web'
  //       ? {
  //           disabled: isDisabled,
  //           cursor: isDisabled ? 'not-allowed' : 'auto',
  //         }
  //       : {})}
  //     style={style}
  //   >
  //     <Text opacity={selectedItem ? undefined : 0.5} {...placeholderProps}>
  //       {selectedItem ? selectedItem.label : placeholder}
  //     </Text>
  //     {icon}
  //   </Button>
  // );

  // const NativeSelect = (
  //   <StyledNativePicker
  //     // Not getting ref on web
  //     ref={ref ?? triggerRef}
  //     enabled={!isDisabled}
  //     {...newProps}
  //     color={color}
  //     onValueChange={onValueChange}
  //     selectedValue={selectedValue}
  //     mode={androidMode}
  //     prompt={androidPrompt}
  //     dropdownIconColor={useToken('colors', androidIconColor)}
  //     itemStyle={{
  //       color: useToken('colors', color),
  //       ..._item,
  //     }}
  //     {...(Platform.OS === 'ios' && _ios)}
  //     {...(Platform.OS === 'android' && _android)}
  //     {...(Platform.OS === 'web' && _web)}
  //     {...(isDisabled && _isDisabled)}
  //     {...(isInvalid && _isInvalid)}
  //     {...(isHovered && _hover)}
  //   >
  //     {updatedChildren}
  //   </StyledNativePicker>
  // );
  // return variant === 'styled' ? StyledSelect : NativeSelect;
};

export default React.forwardRef(Select);
