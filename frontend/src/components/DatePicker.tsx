import React from "react";
import ReactDatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import sv from 'date-fns/locale/sv';
import { isSameDateOrBefore } from "../utils/DateFunctions";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

registerLocale('sv', sv)

interface DatePickerProps {
    selected: Date;
    onChange: (date: Date) => void;
    minDate?: Date;
}

export default function DatePicker({ selected, onChange, minDate }: DatePickerProps) {
    const maxTime = new Date();
    let minTime = new Date();
    minTime.setHours(0, 0, 0);
    maxTime.setHours(23, 59, 59);

    if (minDate && isSameDateOrBefore(selected, minDate)) {
        minTime = minDate;
        selected = minDate;
    }

    return (
        <ReactDatePicker
            selected={selected}
            onChange={onChange}
            locale="sv"
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={minDate}
            minTime={minTime}
            maxTime={maxTime}
            showTimeSelect={true}
            shouldCloseOnSelect={true}
            className="form-control"
            required={true}
        />
    );
}
