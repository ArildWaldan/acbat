import React, { useState, useCallback, useMemo } from 'react';
import { produce } from 'immer';
import { Config, Step } from './types';
import { INITIAL_CONFIG } from './constants';
import Step1_PorteType from './components/steps/Step1_PorteType';
import Step2_Gamme from './components/steps/Step2_Gamme';
import Step3_Decor from './components/steps/Step3_Decor';
import Step4_Vantail from './components/steps/Step4_Vantail';
import Step5_Cadre from './components/steps/Step5_Cadre';
import Step6_SystemeCoulissant from './components/steps/Step6_SystemeCoulissant';
import Step7_Quincaillerie from './components/steps/Step7_Quincaillerie';
import Step8_Garniture from './components/steps/Step8_Garniture';
import Step9_PlusValues from './components/steps/Step9_PlusValues';
import Step10_Resume from './components/steps/Step10_Resume';
import Step11_AccessoiresPose from './components/steps/Step11_AccessoiresPose';
import GeminiAssistant from './components/GeminiAssistant';
import { useDoorConfig } from './hooks/useDoorConfig';

const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step}
              </div>
            </div>
            {step < totalSteps && <div className={`w-12 h-1 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-300'}`}></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};


export default function App() {
  const [config, setConfig] = useState<Config>(INITIAL_CONFIG);
  const [isAssistantOpen, setAssistantOpen] = useState(false);

  const { summary } = useDoorConfig(config);

  const updateConfig = useCallback((updater: (draft: Config) => void) => {
    setConfig(produce(updater));
  }, []);
  
  const resetConfig = useCallback(() => {
    setConfig(INITIAL_CONFIG);
  }, []);

  const goToStep = useCallback((step: Step) => {
    updateConfig(draft => {
      draft.step = step;
    });
  }, [updateConfig]);

  const nextStep = useCallback(() => {
    const { step, porteType } = config;
    let next = step + 1;
    
    // Skip irrelevant steps
    if (step === Step.Vantail && porteType === 'battante') next = Step.Cadre;
    if (step === Step.Vantail && porteType === 'coulissante') next = Step.SystemeCoulissant;
    if (step === Step.Vantail && porteType === 'baie_libre') next = Step.Cadre;

    if (step === Step.Cadre) { // After frame selection
      if (porteType === 'battante') next = Step.Quincaillerie;
      if (porteType === 'baie_libre') next = Step.Resume;
    }

    if (step === Step.SystemeCoulissant) next = Step.Garniture;
    
    goToStep(next);
  }, [config, goToStep]);

  const prevStep = useCallback(() => {
     const { step, porteType } = config;
     let prev = step - 1;

     if (step === Step.Resume && porteType === 'baie_libre') prev = Step.Cadre;
     if (step === Step.Garniture && porteType === 'coulissante') prev = Step.SystemeCoulissant;
     if (step === Step.SystemeCoulissant) prev = Step.Vantail;
     if (step === Step.Cadre) prev = Step.Vantail;
     if (step === Step.Quincaillerie && porteType === 'battante') prev = Step.Cadre;
     
     goToStep(prev > 0 ? prev : 1);
  }, [config, goToStep]);
  
  const handleAssistantConfig = (newConfig: Partial<Config>) => {
    updateConfig(draft => {
      Object.assign(draft, INITIAL_CONFIG, newConfig, { step: Step.Type }); 
    });
    setAssistantOpen(false);
  };

  const totalSteps = 11;

  const renderStep = () => {
    const props = { config, updateConfig, nextStep, prevStep, goToStep, resetConfig };
    switch (config.step) {
      case Step.Type: return <Step1_PorteType {...props} />;
      case Step.Gamme: return <Step2_Gamme {...props} />;
      case Step.Decor: return <Step3_Decor {...props} />;
      case Step.Vantail: return <Step4_Vantail {...props} />;
      case Step.Cadre: return <Step5_Cadre {...props} />;
      case Step.SystemeCoulissant: return <Step6_SystemeCoulissant {...props} />;
      case Step.Quincaillerie: return <Step7_Quincaillerie {...props} />;
      case Step.Garniture: return <Step8_Garniture {...props} />;
      case Step.PlusValues: return <Step9_PlusValues {...props} />;
      case Step.AccessoiresPose: return <Step11_AccessoiresPose {...props} />;
      case Step.Resume: return <Step10_Resume config={config} summary={summary} updateConfig={updateConfig} prevStep={prevStep} resetConfig={resetConfig} />;
      default: return <Step1_PorteType {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-gray-800">
              Configurateur de Portes d'Intérieur
            </h1>
            <p className="text-gray-600 mt-2">
              Créez votre porte sur-mesure en suivant les étapes.
            </p>
             <button
              onClick={() => setAssistantOpen(true)}
              className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Assistant de Configuration IA
            </button>
          </div>
        </header>
        
        <main className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
           {config.step !== Step.Resume && <StepIndicator currentStep={config.step} totalSteps={totalSteps -1} />}
          {renderStep()}
        </main>
        
        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>Propulsé par la technologie React & Gemini. Créé par un Ingénieur Frontend Senior.</p>
        </footer>
      </div>
      
      <GeminiAssistant
        isOpen={isAssistantOpen}
        onClose={() => setAssistantOpen(false)}
        onConfigure={handleAssistantConfig}
      />
    </div>
  );
}
