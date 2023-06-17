import React from "react";
import { Form, Input as Field } from "antd";

interface props {
  name: string;
  label?: string;
  classes?: string[];
  rules?: {}[];
}

export const TextArea: React.FC<props> = ({
  name,
  label,
  classes,
  rules,
  ...rest
}): JSX.Element => {
  return (
    <Form.Item className={`mb-6`} name={name} label={label} rules={rules}>
      <Field.TextArea
        {...rest}
        className={`border text-typography-900 text-sm rounded focus:outline-none focus:shadow-none w-full`}
      />
    </Form.Item>
  );
};
