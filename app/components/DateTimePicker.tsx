import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  selected: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
}
// push thihs code add more code
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selected,
  onChange,
  minDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (date: Date | null) => {
    if (date) {
      onChange(date);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left ${
          selected ? "text-gray-800" : "text-gray-500"
        }`}
      >
        {selected ? selected.toLocaleString() : "Select date and time"}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-lg p-2">
          <DatePicker
            selected={selected}
            onChange={handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={minDate}
            inline
            calendarClassName="border-0"
          />
          <div className="flex justify-end p-2 border-t">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
