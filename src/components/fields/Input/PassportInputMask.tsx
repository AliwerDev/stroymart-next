import { InputMask } from '@react-input/mask';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PassportInputMask: React.FC<any> = (props) => {
  const [mask, setMask] = useState('______________');
  const [replacement, setReplacement] = useState<{ [key: string]: RegExp }>({
    _: /^[A-Za-z0-9]$/,
  });
  const [inputType, setInputType] = useState<'passport' | 'pinfl' | 'unknown'>('unknown');

  // Function to determine input type based on first character
  const determineInputType = (value: string): 'passport' | 'pinfl' | 'unknown' => {
    if (!value) return 'unknown';

    const firstChar = value.charAt(0).toUpperCase();

    if (/[A-Za-z]/.test(firstChar)) {
      return 'passport';
    }

    if (/\d/.test(firstChar)) {
      return 'pinfl';
    }

    return 'unknown';
  };

  // Function to update mask and replacement based on input type
  const updateMaskAndReplacement = (type: 'passport' | 'pinfl' | 'unknown') => {
    switch (type) {
      case 'passport':
        setMask('zz _______');
        setReplacement({
          z: /[A-Za-z]/,
          _: /\d/,
        });
        break;
      case 'pinfl':
        setMask('______________');
        setReplacement({
          _: /\d/,
        });
        break;
      default:
        setMask('______________');
        setReplacement({
          _: /^[A-Za-z0-9]$/,
        });
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    const newInputType = determineInputType(value);

    // Only update mask if input type has changed
    if (newInputType !== inputType) {
      setInputType(newInputType);
      updateMaskAndReplacement(newInputType);
    }

    // Validate input based on type
    let isValid = true;

    if (newInputType === 'passport') {
      // Passport format: AA 1234567 (2 letters A-F, space, 7 digits)
      isValid = /^[A-Za-z]{0,2}( ?\d{0,7})?$/.test(value);
    } else if (newInputType === 'pinfl') {
      // PINFL format: 14 digits
      isValid = /^\d{0,14}$/.test(value);
    }

    // Only call external onChange if input is valid or empty
    if (isValid || value === '') {
      if (props.onChange) {
        props.onChange(value.toUpperCase());
      }
    }
  };

  // Initialize mask based on initial value
  useEffect(() => {
    if (props.value) {
      const initialType = determineInputType(props.value);
      setInputType(initialType);
      updateMaskAndReplacement(initialType);
    }
  }, [props.value]);

  return (
    <InputMask
      mask={mask}
      replacement={replacement}
      showMask={false}
      separate={false}
      {...props}
      onChange={handleChange}
      value={props.value}
    />
  );
};

export default PassportInputMask;
