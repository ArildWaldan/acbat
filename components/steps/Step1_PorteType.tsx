
import React from 'react';
import { Config, PorteType } from '../../types';
import OptionCard from '../OptionCard';

interface Props {
  updateConfig: (updater: (draft: Config) => void) => void;
  nextStep: () => void;
}

const Step1_PorteType: React.FC<Props> = ({ updateConfig, nextStep }) => {
  const handleSelect = (type: PorteType) => {
    updateConfig(draft => {
      draft.porteType = type;
    });
    nextStep();
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">1. Quel type d'ouverture souhaitez-vous ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OptionCard
          label="Porte Battante"
          sublabel="Ouverture classique"
          onClick={() => handleSelect('battante')}
          isSelected={false}
        />
        <OptionCard
          label="Porte Coulissante"
          sublabel="En applique ou à galandage"
          onClick={() => handleSelect('coulissante')}
          isSelected={false}
        />
        <OptionCard
          label="Passage Libre"
          sublabel="Cadre sans porte"
          onClick={() => handleSelect('baie_libre')}
          isSelected={false}
        />
      </div>
    </div>
  );
};

export default Step1_PorteType;
