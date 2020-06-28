import React from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { isTodayOrFuture } from "../../util/DateUtil";
import "../../styles/DatePicker.scss";

type Props = {
  disabled?: boolean;
  placeholder: string;
  onDateChange: (date: any) => void;
};

const DatePicker = (props: Props) => {
  return (
    <SemanticDatepicker
      clearable={!props.disabled}
      allowOnlyNumbers
      format="DD-MM-YYYY"
      placeholder={props.placeholder}
      onDateChange={props.onDateChange}
      clearOnSameDateClick={false}
      filterDate={(date) => isTodayOrFuture(date)}
      readOnly={props.disabled}
    />
  );
};

export default DatePicker;
