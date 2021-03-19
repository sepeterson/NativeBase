import React from 'react';
import { Radio, Text, VStack } from 'native-base';
import type { IRadioValue } from 'native-base';

export default function ControlledRadio() {
  const [value, setValue] = React.useState<IRadioValue>('one');

  return (
    <Radio.Group
      name="myRadioGroup"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
      }}
    >
      <VStack space={2}>
        <Radio value="one">
          <Text ml={2}>One</Text>
        </Radio>
        <Radio value="two">
          <Text ml={2}>Two</Text>
        </Radio>
      </VStack>
    </Radio.Group>
  );
}
