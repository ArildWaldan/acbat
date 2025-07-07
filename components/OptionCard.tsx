
import React from 'react';

interface OptionCardProps {
  label: React.ReactNode;
  sublabel?: string;
  onClick: () => void;
  isSelected: boolean;
  disabled?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ label, sublabel, onClick, isSelected, disabled = false }) => {
  const baseClasses = "border-2 rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ease-in-out flex flex-col justify-center items-center h-full";
  const selectedClasses = "bg-blue-50 border-blue-500 ring-2 ring-blue-500";
  const unselectedClasses = "bg-white border-gray-300 hover:border-blue-400 hover:shadow-md";
  const disabledClasses = "bg-gray-100 border-gray-200 cursor-not-allowed text-gray-400";

  const classes = `${baseClasses} ${disabled ? disabledClasses : (isSelected ? selectedClasses : unselectedClasses)}`;

  return (
    <div className={classes} onClick={!disabled ? onClick : undefined}>
      <span className="font-semibold text-gray-800">{label}</span>
      {sublabel && <span className="text-sm text-gray-500 mt-1">{sublabel}</span>}
    </div>
  );
};

export default OptionCard;
