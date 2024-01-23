import React, { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const AnimatedMulti: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleCreateOption = (inputValue: string) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    return newOption;
  };

  const loadOptions = (inputValue: string, callback: any) => {
    // You can fetch or process options dynamically here
    const filteredOptions = [{ value: inputValue, label: inputValue }];
    callback(filteredOptions);
  };

  return (
    <AsyncCreatableSelect
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      onCreateOption={handleCreateOption}
      loadOptions={(inputValue, callback) => loadOptions(inputValue, callback)}
      onInputChange={(input: string) => setInputValue(input)}
    />
  );
};

export default AnimatedMulti;
