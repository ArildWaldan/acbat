
import React from 'react';

interface StepNavigatorProps {
  onNext: () => void;
  onPrev: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}

const StepNavigator: React.FC<StepNavigatorProps> = ({ onNext, onPrev, nextDisabled = false, nextLabel = 'Suivant' }) => {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={onPrev}
        className="px-6 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Précédent
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default StepNavigator;
