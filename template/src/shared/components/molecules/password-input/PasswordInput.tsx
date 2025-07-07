import { TextInput } from '@/shared/components/atoms';
import type { PasswordInputProps } from '@/shared/components/atoms/text-input/types/type';
import React, { memo, useCallback, useState } from 'react';
import { IconByVariant } from '@/shared/components/atoms';

const PasswordInput: React.FC<PasswordInputProps> = ({
  defaultValue = '',
  keyboardType = 'default',
  label = '',
  labelStyle,
  maxLength = 256,
  name = '',
  onChangeText = () => {},
  onSubmitEditing = () => {},
  placeholder = '',
  returnKeyType = 'done',
  style = {},
  value = '',
  wrapperStyle = {},
  errorMessage = '',
  required = false,
}) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const handleOnChange = useCallback(
    (text: string) => {
      if (name && name.trim() !== '') {
        onChangeText(text, name);
      } else {
        onChangeText(text);
      }
    },
    [name, onChangeText]
  );

  const toggleShowPass = useCallback(() => {
    setIsShowPass((previous) => !previous);
  }, []);

  const PasswordIcon = isShowPass ? 'eyeOff' : 'eyeOn';

  return (
    <TextInput
      defaultValue={defaultValue?.toString()}
      keyboardType={keyboardType}
      maxLength={maxLength}
      onChangeText={handleOnChange}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      secureTextEntry={!isShowPass}
      value={value?.toString()}
      label={label}
      labelStyle={labelStyle}
      placeholder={placeholder}
      rightHandler={toggleShowPass}
      rightIcon={<IconByVariant path={PasswordIcon} />}
      style={style}
      wrapperStyle={wrapperStyle}
      errorMessage={errorMessage}
      required={required}
    />
  );
};

export default memo(PasswordInput);
