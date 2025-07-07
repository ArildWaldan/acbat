import React from 'react';
import { Config, Serrure, Cylindre, Charniere } from '../../types';
import { ACCESSORIES } from '../../data/doorData';
import OptionCard from '../OptionCard';
import StepNavigator from '../StepNavigator';

interface Props {
  config: Config;
  updateConfig: (updater: (draft: Config) => void) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step7_Quincaillerie: React.FC<Props> = ({ config, updateConfig, nextStep, prevStep }) => {
  const { serrure, cylindre, charniere } = config;

  const handleSerrureSelect = (s: Serrure | null) => {
    updateConfig(draft => {
      draft.serrure = s;
      if (s?.id !== 'serrure_pz') {
        draft.cylindre = null;
      }
    });
  };

  const handleCylindreSelect = (c: Cylindre | null) => {
    updateConfig(draft => { draft.cylindre = c; });
  };
  
  const handleCharniereSelect = (c: Charniere | null) => {
      updateConfig(draft => { draft.charniere = c; });
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">7. Quincaillerie (Porte Battante)</h2>
      
      <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Charnières</h3>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <OptionCard label="Aucune" onClick={() => handleCharniereSelect(null)} isSelected={!charniere} />
               {Object.values(ACCESSORIES.CHARNIERES).map(c => (
                   <OptionCard
                      key={c.id}
                      label={c.name}
                      sublabel={`+ ${c.price.toFixed(2)} €`}
                      onClick={() => handleCharniereSelect(c)}
                      isSelected={charniere?.id === c.id}
                   />
               ))}
           </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Serrure</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <OptionCard label="Aucune" onClick={() => handleSerrureSelect(null)} isSelected={!serrure} />
          {Object.values(ACCESSORIES.SERRURES).map(s => (
            <OptionCard
              key={s.id}
              label={s.name}
              sublabel={`+ ${s.price.toFixed(2)} €`}
              onClick={() => handleSerrureSelect(s)}
              isSelected={serrure?.id === s.id}
            />
          ))}
        </div>
      </div>

      {serrure?.id === 'serrure_pz' && (
        <div className="mb-8 pl-6 border-l-4 border-blue-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Cylindre (pour serrure PZ)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <OptionCard label="Aucun" onClick={() => handleCylindreSelect(null)} isSelected={!cylindre} />
            {Object.values(ACCESSORIES.CYLINDRES).map(c => (
              <OptionCard
                key={c.id}
                label={c.name}
                sublabel={`+ ${c.price.toFixed(2)} €`}
                onClick={() => handleCylindreSelect(c)}
                isSelected={cylindre?.id === c.id}
              />
            ))}
          </div>
        </div>
      )}

      <StepNavigator onNext={nextStep} onPrev={prevStep} />
    </div>
  );
};

export default Step7_Quincaillerie;
