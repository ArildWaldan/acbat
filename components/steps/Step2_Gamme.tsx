
import React from 'react';
import { Config, Gamme } from '../../types';
import OptionCard from '../OptionCard';
import StepNavigator from '../StepNavigator';

interface Props {
  config: Config;
  updateConfig: (updater: (draft: Config) => void) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step2_Gamme: React.FC<Props> = ({ config, updateConfig, nextStep, prevStep }) => {
  const handleSelect = (gamme: Gamme) => {
    updateConfig(draft => {
      draft.gamme = gamme;
    });
    nextStep();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">2. Choisissez une gamme</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OptionCard
          label="Tubulaire/CPL"
          sublabel="Chants arrondis & angulaires"
          onClick={() => handleSelect('cpl')}
          isSelected={config.gamme === 'cpl'}
        />
        <OptionCard
          label="Tubulaire/CPL PLUS"
          sublabel="Aspect Bois Prestige / Anti-trace"
          onClick={() => handleSelect('cpl_plus')}
          isSelected={config.gamme === 'cpl_plus'}
        />
      </div>
      <StepNavigator onNext={nextStep} onPrev={prevStep} nextDisabled={!config.gamme} />
    </div>
  );
};

export default Step2_Gamme;
