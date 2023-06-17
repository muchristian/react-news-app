import { RangePickerProps } from "antd/lib/date-picker";
import moment from "moment";

export const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return moment() < current;
};
