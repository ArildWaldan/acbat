
import React from 'react';
import { Config } from '../../types';
import { ACCESSORIES } from '../../data/doorData';
import OptionCard from '../OptionCard';
import StepNavigator from '../StepNavigator';
import type { Garniture } from '../../types';


interface Props {
  config: Config;
  updateConfig: (updater: (draft: Config) => void) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step8_Garniture: React.FC<Props> = ({ config, updateConfig, nextStep, prevStep }) => {
  const { garniture } = config;

  const handleSelect = (g: Garniture, type: string) => {
    updateConfig(draft => {
      draft.garniture = {
        id: g.id,
        name: g.name,
        selectedType: type,
        price: g.variations[type],
        delai: g.delai,
      };
    });
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">8. Garniture (Poignées)</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <OptionCard label="Aucune garniture" onClick={() => updateConfig(draft => { draft.garniture = null; })} isSelected={!garniture} />
      </div>

      <div className="space-y-8">
        {Object.values(ACCESSORIES.GARNITURES).map(g => (
          <div key={g.id}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{g.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(g.variations).map(([type, price]) => (
                <OptionCard
                  key={type}
                  label={type}
                  sublabel={`+ ${price.toFixed(2)} €`}
                  onClick={() => handleSelect(g, type)}
                  isSelected={garniture?.id === g.id && garniture?.selectedType === type}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <StepNavigator onNext={nextStep} onPrev={prevStep} />
    </div>
  );
};

export default Step8_Garniture;
