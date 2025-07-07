import React from 'react';
import { Config, CoulissantSystem, Accessory } from '../../types';
import { ACCESSORIES } from '../../data/doorData';
import OptionCard from '../OptionCard';
import StepNavigator from '../StepNavigator';
import InfoBox from '../InfoBox';

interface Props {
  config: Config;
  updateConfig: (updater: (draft: Config) => void) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step6_SystemeCoulissant: React.FC<Props> = ({ config, updateConfig, nextStep, prevStep }) => {
  const { systemeCoulissant, kitCoulissant, quincaillerieCoulissant } = config;

  const handleSystemTypeSelect = (type: 'applique' | 'entre_murs') => {
    updateConfig(draft => {
      draft.systemeCoulissant = type;
      draft.kitCoulissant = null;
    });
  };

  const handleKitSelect = (kitId: string) => {
    updateConfig(draft => {
      draft.kitCoulissant = kitCoulissant === kitId ? null : kitId;
    });
  };

  const handleQuincaillerieToggle = (id: string) => {
     updateConfig(draft => {
        draft.quincaillerieCoulissant[id] = !draft.quincaillerieCoulissant[id];
     });
  };

  const kitsForType = systemeCoulissant === 'applique' 
    ? ACCESSORIES.COULISSANT.SYSTEMES_APPLIQUE 
    : ACCESSORIES.COULISSANT.SYSTEMES_ENTRE_MURS;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">6. Système Coulissant</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Type de pose</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptionCard
            label="En Applique"
            sublabel="Le rail est fixé au mur, la porte coulisse le long du mur."
            onClick={() => handleSystemTypeSelect('applique')}
            isSelected={systemeCoulissant === 'applique'}
          />
          <OptionCard
            label="Entre Murs / Galandage"
            sublabel="La porte coulisse dans la cloison."
            onClick={() => handleSystemTypeSelect('entre_murs')}
            isSelected={systemeCoulissant === 'entre_murs'}
          />
        </div>
      </div>

      {systemeCoulissant && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Kit ou Cadre</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(kitsForType).map((kit: CoulissantSystem) => (
              <OptionCard
                key={kit.id}
                label={kit.name}
                sublabel={`+ ${kit.price.toFixed(2)} €`}
                onClick={() => handleKitSelect(kit.id)}
                isSelected={kitCoulissant === kit.id}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Quincaillerie pour porte coulissante</h3>
         <div className="space-y-3">
             {Object.values(ACCESSORIES.COULISSANT.QUINCAILLERIE).map((item: Accessory) => (
                 <div key={item.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <input
                        id={item.id}
                        type="checkbox"
                        checked={!!quincaillerieCoulissant[item.id]}
                        onChange={() => handleQuincaillerieToggle(item.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={item.id} className="ml-3 text-sm text-gray-700">
                        {item.name}
                        <span className="font-semibold text-gray-900 ml-2">(+ {item.price.toFixed(2)} €)</span>
                    </label>
                </div>
            ))}
        </div>
        <InfoBox type='warning'>
            N'oubliez pas les options de fraisage (étape 9) si vous choisissez une serrure ou une poignée cuvette non incluse dans un kit.
        </InfoBox>
      </div>

      <StepNavigator onNext={nextStep} onPrev={prevStep} nextDisabled={!systemeCoulissant} />
    </div>
  );
};

export default Step6_SystemeCoulissant;
