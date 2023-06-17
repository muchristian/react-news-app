import React, { Children, ReactNode } from "react";
import { Form, Select as Slt, SelectProps } from "antd";

const { Option } = Slt;

interface props {
  name: string;
  label?: string;
  classes?: string;
  mode?: "multiple";
  allowClear?: boolean;
  rules?: {}[];
  children?: JSX.Element;
  placeholder?: string;
  defaultValue?: string[];
  disabled?: boolean;
  onSelect?: (value: any) => any;
  onDeselect?: (value: any) => any;
  onChange?: (value: any) => any;
  options: SelectProps["options"];
}

export const Select: React.FC<props> = ({
  name,
  label,
  classes,
  rules,
  children,
  onSelect,
  onDeselect,
  options,
  ...rest
}): JSX.Element => {
  return (
    <Form.Item name={name} label={label} rules={rules} className="text-primary">
      <Slt
        {...rest}
        onSelect={onSelect}
        onDeselect={onDeselect}
        options={options}
        className={classes}
      />
    </Form.Item>
  );
};
