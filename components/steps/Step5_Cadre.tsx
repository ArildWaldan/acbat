
import React from 'react';
import { Config } from '../../types';
import { DECORS, PLUS_VALUES } from '../../data/doorData';
import StepNavigator from '../StepNavigator';
import InfoBox from '../InfoBox';
import OptionCard from '../OptionCard';

interface Props {
  config: Config;
  updateConfig: (updater: (draft: Config) => void) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step5_Cadre: React.FC<Props> = ({ config, updateConfig, nextStep, prevStep }) => {
  const { wallDepth, decor, cadreFinition } = config;

  const decorData = decor ? DECORS[decor] : null;
  const hasNoirMatOption = decorData?.plusValues?.includes('cadreNoirMat') || false;
  const noirMatPV = PLUS_VALUES['cadreNoirMat'];

  const handleFinitionChange = (finition: 'standard' | 'noirMat') => {
    if (finition === 'noirMat' && wallDepth && wallDepth < (noirMatPV.minWallDepth || 80)) {
        alert(`La finition Noir Mat est disponible uniquement pour une épaisseur de mur de ${noirMatPV.minWallDepth || 80}mm ou plus.`);
        return;
    }
    updateConfig(draft => { draft.cadreFinition = finition; });
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">5. Configurez le cadre</h2>

      <div className="mb-8">
        <label htmlFor="wall-depth" className="text-lg font-semibold text-gray-700 mb-3 block">
          Épaisseur du mur fini (en mm)
        </label>
        <input
          type="number"
          id="wall-depth"
          placeholder="ex: 100"
          value={wallDepth || ''}
          onChange={e => updateConfig(draft => { draft.wallDepth = e.target.value ? parseInt(e.target.value) : null; })}
          className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {hasNoirMatOption && (
         <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Finition du cadre</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
            <OptionCard 
                label="Standard"
                sublabel="Assorti au décor de la porte"
                onClick={() => handleFinitionChange('standard')}
                isSelected={cadreFinition === 'standard'}
            />
             <OptionCard 
                label="Noir Mat"
                sublabel="Anti-trace de doigts"
                onClick={() => handleFinitionChange('noirMat')}
                isSelected={cadreFinition === 'noirMat'}
                disabled={!wallDepth || wallDepth < (noirMatPV.minWallDepth || 80)}
            />
          </div>
          {cadreFinition === 'noirMat' && (
            <InfoBox type="info">
                {noirMatPV.info}
            </InfoBox>
          )}
        </div>
      )}
      
      <StepNavigator onNext={nextStep} onPrev={prevStep} nextDisabled={!wallDepth} />
    </div>
  );
};

export default Step5_Cadre;
