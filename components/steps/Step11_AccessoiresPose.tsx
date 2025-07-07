import React from 'react';
import { Config, KitReparation, Joint } from '../../types';
import { ACCESSORIES } from '../../data/doorData';
import StepNavigator from '../StepNavigator';

interface Props {
  config: Config;
  updateConfig: (updater: (draft: Config) => void) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const Step11_AccessoiresPose: React.FC<Props> = ({ config, updateConfig, nextStep, prevStep }) => {
    const { accessoiresPose } = config;

    const handleToggle = (id: string) => {
        updateConfig(draft => {
            const current = draft.accessoiresPose[id];
            if (current) {
                delete draft.accessoiresPose[id];
            } else {
                const acc = ACCESSORIES.POSE[id as keyof typeof ACCESSORIES.POSE];
                if ('colors' in acc && Array.isArray(acc.colors)) {
                    // Default to first color for KitReparation
                    draft.accessoiresPose[id] = { color: acc.colors[0] };
                } else if ('colors' in acc) {
                     // Default to first color for Joint
                    draft.accessoiresPose[id] = { color: Object.keys(acc.colors)[0] };
                }
                else {
                    draft.accessoiresPose[id] = true;
                }
            }
        });
    };
    
    const handleColorChange = (id: string, color: string) => {
         updateConfig(draft => {
            draft.accessoiresPose[id] = { color };
        });
    };

    return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">10. Accessoires de Pose & Finition</h2>
      <div className="space-y-4">
        {Object.entries(ACCESSORIES.POSE).map(([id, acc]) => {
            const currentAccessoryValue = accessoiresPose[id];
            return (
                <div key={id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                        <input
                            id={id}
                            type="checkbox"
                            checked={!!currentAccessoryValue}
                            onChange={() => handleToggle(id)}
                            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                        />
                        <div className="ml-3 flex-1">
                            <label htmlFor={id} className="text-sm font-medium text-gray-800">
                                {acc.name}
                                <span className="font-bold text-gray-900 ml-2">(+ {acc.price.toFixed(2)} €)</span>
                            </label>
                            {'colors' in acc && currentAccessoryValue && (
                                <div className="mt-2">
                                    {'colors' in acc && Array.isArray(acc.colors) ? (
                                        <select
                                            value={typeof currentAccessoryValue === 'object' ? currentAccessoryValue.color : ''}
                                            onChange={(e) => handleColorChange(id, e.target.value)}
                                            className="text-xs rounded border-gray-300"
                                        >
                                            {(acc as KitReparation).colors.map(color => <option key={color} value={color}>{color}</option>)}
                                        </select>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            {(Object.entries((acc as Joint).colors)).map(([name, code]) => (
                                                <button
                                                    key={name}
                                                    title={name}
                                                    onClick={() => handleColorChange(id, name)}
                                                    className={`h-6 w-6 rounded-full border-2 ${typeof currentAccessoryValue === 'object' && currentAccessoryValue.color === name ? 'border-blue-500 ring-2 ring-blue-500' : 'border-white'}`}
                                                    style={{backgroundColor: code}}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
      <StepNavigator onNext={nextStep} onPrev={prevStep} nextLabel="Voir le résumé"/>
    </div>
  );
};

export default Step11_AccessoiresPose;