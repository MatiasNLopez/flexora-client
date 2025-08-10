import React, { InputHTMLAttributes, forwardRef } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const baseCheckboxClassName =
  "w-4 h-4 rounded-sm border-gray-300 text-indigo-600 focus:ring-indigo-600";

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, containerClassName, labelClassName, id, ...rest }, ref) => {
    const inputId = id ?? rest.name ?? undefined;
    return (
      <label className={`inline-flex items-center gap-2 ${containerClassName ?? ""}`}>
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          className={`${baseCheckboxClassName}${className ? ` ${className}` : ""}`}
          {...rest}
        />
        {label && (
          <span className={`text-sm text-gray-700 ${labelClassName ?? ""}`}>{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

