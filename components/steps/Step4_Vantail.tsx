
import React, { useEffect } from 'react';
import { Config } from '../../types';
import { DECORS } from '../../data/doorData';
import OptionCard from '../OptionCard';
import StepNavigator from '../StepNavigator';
import InfoBox from '../InfoBox';

interface Props {
  config: Config;
  updateConfig: (updater: (draft: Config) => void) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

const Step4_Vantail: React.FC<Props> = ({ config, updateConfig, nextStep, prevStep, goToStep }) => {
  const { porteType, decor: decorId, variant: variantId, direction, vantailWidth, customSize } = config;

  useEffect(() => {
    if (porteType === 'baie_libre') {
      goToStep(5); // Skip to cadre selection
    } else if (porteType === 'coulissante') {
      updateConfig(draft => {
        draft.variant = 'coulissant';
      });
    } else if (porteType === 'battante' && !variantId) {
       updateConfig(draft => {
        draft.variant = 'standard';
      });
    }
  }, [porteType, variantId, goToStep, updateConfig]);


  if (!decorId || porteType === 'baie_libre') return null;

  const decor = DECORS[decorId];
  const availableVariants = porteType === 'battante' 
    ? Object.entries(decor.variants).filter(([key]) => key !== 'coulissant')
    : Object.entries(decor.variants).filter(([key]) => key === 'coulissant');
  
  const selectedVariant = variantId ? decor.variants[variantId] : null;
  const availableWidths = selectedVariant?.sizes.map(s => s.width) || [];

  const handleVariantSelect = (id: string) => {
    updateConfig(draft => {
      draft.variant = id;
      draft.vantailWidth = null;
    });
  };

  const handleWidthSelect = (width: number) => {
    updateConfig(draft => {
      draft.vantailWidth = width;
      draft.customSize = false;
    });
  };
  
  const handleCustomWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      updateConfig(draft => {
          draft.vantailWidth = val ? parseInt(val, 10) : null;
          draft.customSize = true;
      });
  };

  const isNextDisabled = !vantailWidth || !direction;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">4. Configurez le vantail</h2>

      {porteType === 'battante' && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Type de vantail</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableVariants.map(([id, variant]) => (
              <OptionCard
                key={id}
                label={variant.name}
                onClick={() => handleVariantSelect(id)}
                isSelected={variantId === id}
              />
            ))}
          </div>
        </div>
      )}

      {selectedVariant && (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Largeur du vantail</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableWidths.map(width => (
                    <OptionCard 
                        key={width}
                        label={`${width} mm`}
                        onClick={() => handleWidthSelect(width)}
                        isSelected={vantailWidth === width && !customSize}
                    />
                ))}
                 <div className="col-span-2 md:col-span-4">
                    <label htmlFor="custom-width" className="block text-sm font-medium text-gray-700 mb-2">
                      Ou entrez une largeur sur mesure (mm)
                    </label>
                    <input
                        type="number"
                        id="custom-width"
                        placeholder="ex: 855"
                        value={customSize && vantailWidth ? vantailWidth : ''}
                        onChange={handleCustomWidthChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {customSize && <InfoBox type="warning">Le sur-mesure entraîne une plus-value et un délai supplémentaire.</InfoBox>}
                </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Sens d'ouverture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <OptionCard
                label="Poussant Gauche"
                onClick={() => updateConfig(draft => { draft.direction = 'gauche'; })}
                isSelected={direction === 'gauche'}
              />
              <OptionCard
                label="Poussant Droit"
                onClick={() => updateConfig(draft => { draft.direction = 'droit'; })}
                isSelected={direction === 'droit'}
              />
            </div>
             <InfoBox type="warning">
                <strong>Attention:</strong> Les serrures sont non-réversibles. Le choix du sens d'ouverture est définitif.
             </InfoBox>
          </div>
        </>
      )}

      <StepNavigator onNext={() => goToStep(porteType === 'coulissante' ? 6 : 5)} onPrev={prevStep} nextDisabled={isNextDisabled} />
    </div>
  );
};

export default Step4_Vantail;
