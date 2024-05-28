import React from "react";

interface LabelInputWrapperProps {
  label: string;
  vertical?: boolean;
  className?: string;
  children: React.ReactNode;
}

const LabelInputWrapper = ({ label, children, className }: LabelInputWrapperProps) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center mx-4 my-2 ${className}`}>
      <label className="whitespace-nowrap mr-4">{label}</label>
      {children}
    </div>
  );
};

export default LabelInputWrapper;