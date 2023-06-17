import React, { ReactNode } from "react";
import { Form, Input as Field } from "antd";

interface props {
  type: string;
  name: string;
  label?: string;
  classes?: string;
  rules?: {}[];
  prefix?: ReactNode;
  placeholder: string;
  onChange?: (value: any, dateString?: string) => any;
}

export const Input: React.FC<props> = ({
  name,
  label,
  classes,
  rules,
  prefix,
  ...rest
}): JSX.Element => {
  return (
    <Form.Item name={name} label={label} rules={rules} className="text-primary">
      <Field {...rest} prefix={prefix} className={classes} />
    </Form.Item>
  );
};
