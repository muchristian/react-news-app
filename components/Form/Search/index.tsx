import React, { ReactNode } from "react";
import { Form, Input as Field } from "antd";

interface props {
  name: string;
  label?: string;
  classes?: string;
  suffix: ReactNode;
  placeholder?: string;
  onChange?: (value: any) => any;
}

export const Search: React.FC<props> = ({
  name,
  label,
  classes,
  ...rest
}): JSX.Element => {
  return (
    <Form.Item name={name} label={label}>
      <Field {...rest} className={classes} />
    </Form.Item>
  );
};
