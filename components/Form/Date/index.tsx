import React from "react";
import { Form, Input as Field, DatePicker } from "antd";
import { TextMessage } from "../../TextMessage/TextMessage";
import { RangePickerProps } from "antd/lib/date-picker";

interface props {
  name: string;
  label?: string;
  classes?: string;
  rules?: {}[];
  format?: string;
  placeholder: string;
  disabledDate?: RangePickerProps["disabledDate"];
  onChange?: (value: any) => any;
}

export const Date: React.FC<props> = ({
  name,
  label,
  classes,
  rules,
  format,
  disabledDate,
  ...rest
}): JSX.Element => {
  return (
    <Form.Item name={name} label={label} rules={rules} className="text-primary">
      <DatePicker
        {...rest}
        disabledDate={disabledDate}
        format={format}
        className={classes}
      />
    </Form.Item>
  );
};
