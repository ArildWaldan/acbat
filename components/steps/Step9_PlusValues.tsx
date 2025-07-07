import React from 'react';
import { Config, PlusValue } from '../../types';
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

const Step9_PlusValues: React.FC<Props> = ({ config, updateConfig, nextStep, prevStep }) => {
    const { decor: decorId, plusValues } = config;
    if (!decorId) return null;

    const decor = DECORS[decorId];
    const decorPVs = decor.plusValues?.map(id => PLUS_VALUES[id]).filter(Boolean) || [];
    const generalPVs = [PLUS_VALUES.fraisagePoignee, PLUS_VALUES.fraisageSerrure, PLUS_VALUES.cadreIntermediaire, PLUS_VALUES.reservationsAllemandes];
    const availablePVs = [...decorPVs, ...generalPVs].reduce((acc, pv) => {
        if (pv && !acc.find(item => item.id === pv.id)) {
            acc.push(pv);
        }
        return acc;
    }, [] as PlusValue[]);
    
    const handleToggleFixedPV = (id: string) => {
        updateConfig(draft => {
            draft.plusValues[id] = !draft.plusValues[id];
        });
    };

    const handleOculusSelect = (pvId: string, model: string, finition: 'transparent' | 'satinato') => {
        updateConfig(draft => {
            const currentPV = draft.plusValues[pvId];
            if (typeof currentPV === 'object' && currentPV.oculusModel === model && currentPV.oculusFinition === finition) {
                draft.plusValues[pvId] = false;
            } else {
                draft.plusValues[pvId] = { oculusModel: model, oculusFinition: finition };
            }
        });
    };

    const renderPlusValue = (pv: PlusValue) => {
        if (pv.type === 'fixed' || (pv.type === 'surMesure' && config.customSize)) {
            if (pv.type === 'surMesure') return null; // Handled in hook
             return (
                <div key={pv.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <input
                        id={pv.id}
                        type="checkbox"
                        checked={!!plusValues[pv.id]}
                        onChange={() => handleToggleFixedPV(pv.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={pv.id} className="ml-3 text-sm text-gray-700">
                        {pv.name}
                        {pv.price ? <span className="font-semibold text-gray-900 ml-2">(+ {pv.price.toFixed(2)} €)</span> : ''}
                         {pv.info && <span className="block text-xs text-gray-500">{pv.info}</span>}
                    </label>
                </div>
            )
        }
        if (pv.type === 'oculus') {
            const currentOculusValue = plusValues[pv.id];
            return (
                <div key={pv.id}>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">{pv.name}</h3>
                     <OptionCard 
                        label="Aucun oculus"
                        onClick={() => updateConfig(draft => { draft.plusValues[pv.id] = false; })}
                        isSelected={!plusValues[pv.id]}
                    />
                    {pv.options?.filter(opt => !opt.decorSpecific || opt.decorSpecific === decorId).map(opt => (
                        <div key={opt.model} className="pl-4 border-l-2 border-gray-200 my-4">
                           <h4 className="font-medium text-gray-600 mb-2">{opt.model}</h4>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {opt.priceTransparent !== undefined && (
                                     <OptionCard
                                        label="Transparent"
                                        sublabel={`+ ${opt.priceTransparent.toFixed(2)} €`}
                                        onClick={() => handleOculusSelect(pv.id, opt.model, 'transparent')}
                                        isSelected={typeof currentOculusValue === 'object' && currentOculusValue.oculusModel === opt.model && currentOculusValue.oculusFinition === 'transparent'}
                                     />
                                )}
                                {opt.priceSatinato !== undefined && (
                                     <OptionCard
                                        label="Satinato"
                                        sublabel={`+ ${opt.priceSatinato.toFixed(2)} €`}
                                        onClick={() => handleOculusSelect(pv.id, opt.model, 'satinato')}
                                        isSelected={typeof currentOculusValue === 'object' && currentOculusValue.oculusModel === opt.model && currentOculusValue.oculusFinition === 'satinato'}
                                     />
                                )}
                           </div>
                        </div>
                    ))}
                </div>
            )
        }
        return null;
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">9. Options & Plus-Values</h2>
            <div className="space-y-6">
                {availablePVs.length > 0 ? (
                    availablePVs.map(renderPlusValue)
                ) : (
                    <InfoBox>Aucune plus-value spécifique disponible pour ce décor.</InfoBox>
                )}
            </div>
            <StepNavigator onNext={nextStep} onPrev={prevStep} />
        </div>
    );
};

export default Step9_PlusValues;