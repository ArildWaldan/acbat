
import React, { useState, useCallback } from 'react';
import { Config } from '../types';
import { getAIConfig } from '../services/geminiService';

interface GeminiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigure: (config: Partial<Config>) => void;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ isOpen, onClose, onConfigure }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getAIConfig(prompt);
      if (result) {
        onConfigure(result);
      } else {
        setError("L'assistant n'a pas pu générer une configuration valide.");
      }
    } catch (err) {
      if(err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, onConfigure]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 transition-opacity" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full m-4">
        <div className="p-6">
          <div className="flex items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Assistant de Configuration IA
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Décrivez la porte que vous souhaitez en langage naturel.
                  <br />
                  Ex: <em className="text-gray-600">"Une porte battante simple style Chêne Ontario de 830mm pour un mur de 10cm."</em>
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Votre description ici..."
              disabled={isLoading}
            />
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erreur: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </form>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !prompt.trim()}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-400"
          >
            {isLoading ? 'Génération...' : 'Configurer'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;
