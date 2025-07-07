
import React from 'react';
import { Config } from '../../types';
import { DECORS } from '../../data/doorData';
import OptionCard from '../OptionCard';
import StepNavigator from '../StepNavigator';

interface Props {
  config: Config;
  updateConfig: (updater: (draft: Config) => void) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step3_Decor: React.FC<Props> = ({ config, updateConfig, nextStep, prevStep }) => {
  
  const decorsInGamme = Object.entries(DECORS).filter(([id, decor]) => decor.gamme === config.gamme);

  const handleSelect = (decorId: string) => {
    updateConfig(draft => {
      draft.decor = decorId;
      // Reset subsequent choices
      draft.variant = null;
      draft.vantailWidth = null;
    });
    nextStep();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">3. Choisissez un décor</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {decorsInGamme.map(([id, decor]) => (
          <OptionCard
            key={id}
            label={decor.name}
            onClick={() => handleSelect(id)}
            isSelected={config.decor === id}
          />
        ))}
      </div>
      <StepNavigator onNext={nextStep} onPrev={prevStep} nextDisabled={!config.decor} />
    </div>
  );
};

export default Step3_Decor;
