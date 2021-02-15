import React from "react";
import CreatableSelect from "react-select/creatable";
import { ValueType, OptionTypeBase } from "react-select";

interface MultiSelectProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

interface IOptionType extends OptionTypeBase {
  label: string;
  value: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  values: initialValues,
  onChange,
  placeholder = "Select...",
}) => {
  const options: IOptionType[] = (initialValues ?? []).map((value) => ({
    label: value,
    value,
  }));

  const handleChange = (values: ValueType<IOptionType, true>) => {
    if (!values) {
      onChange([]);
      return;
    }

    onChange(values.map((v) => v.value));
  };

  return (
    <div>
      <CreatableSelect
        isMulti
        classNamePrefix="react-select"
        className="react-select"
        defaultValue={options}
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        noOptionsMessage={() => null}
        formatCreateLabel={(value: string) => `Add '${value}'`}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default MultiSelect;
