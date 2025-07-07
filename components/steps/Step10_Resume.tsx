import React, { useState } from 'react';
import { Config, Summary } from '../../types';
import { MC_CODES } from '../../data/doorData';
import StepNavigator from '../StepNavigator';
import InfoBox from '../InfoBox';

interface Props {
  config: Config;
  summary: Summary;
  updateConfig: (updater: (draft: Config) => void) => void;
  prevStep: () => void;
  resetConfig: () => void;
}

const WarrantyInfo: React.FC = () => (
    <div style={{fontSize: '0.9em'}}>
        <p><strong>Garantie :</strong> Nos vantaux et cadres sont garantis 24 mois suivant la livraison contre tout défaut de fabrication.</p>
        <p className="mt-2"><strong>Conditions de stockage et de montage (essentielles pour la garantie) :</strong></p>
        <ul className="list-disc list-inside mt-1">
            <li>Stockage à l'abri de l'humidité et de trop fortes variations de température.</li>
            <li><strong>Stockage à plat impératif</strong> et à température ambiante 48h avant le montage pour éviter toutes déformations.</li>
            <li>Montage et pose selon notice de montage.</li>
        </ul>
        <p className="mt-2"><strong>Commandes :</strong> Après validation des commandes sous 48h, aucune modification ou annulation ne sera acceptée.</p>
        <p className="mt-2">Les litiges dus aux transports ne sont pas pris en compte dans cette garantie, voir nos conditions générales de vente.</p>
    </div>
);

const MeasurementGuide: React.FC<{onClose: () => void}> = ({onClose}) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Guide de Mesures (p. 24-25)</h3>
                <div className="mt-4 text-sm text-gray-600 space-y-2">
                    <p>Ces tableaux aident à déterminer les dimensions idéales pour la maçonnerie (ouverture murale).</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Largeur 730:</strong> Idéal 780mm (range 756-830)</li>
                        <li><strong>Largeur 830:</strong> Idéal 880mm (range 856-930)</li>
                        <li><strong>Largeur 930:</strong> Idéal 980mm (range 956-1030)</li>
                    </ul>
                     <p><strong>Hauteur:</strong> Idéal 2070mm (range 2065-2085)</p>
                     <InfoBox type="warning">
                         Un jeu réduit peut nécessiter d'encastrer les attaches dans le mur. Un jeu important peut nécessiter un bois de calage. Ces tableaux ne tiennent pas compte des défauts de niveau ou d'aplomb.
                     </InfoBox>
                </div>
            </div>
             <div className="bg-gray-50 px-4 py-3 sm:px-6 text-right">
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                    Fermer
                </button>
            </div>
        </div>
    </div>
);


const Step10_Resume: React.FC<Props> = ({ config, summary, updateConfig, prevStep, resetConfig }) => {
    const [showWarranty, setShowWarranty] = useState(false);
    const [showMeasurements, setShowMeasurements] = useState(false);

    if (summary.errors.length > 0) {
        return (
            <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-red-700 mb-6">Erreur de configuration</h2>
                <InfoBox type="warning">
                    <ul className="list-disc list-inside">
                        {summary.errors.map((e, i) => <li key={i}>{e}</li>)}
                    </ul>
                </InfoBox>
                <StepNavigator onNext={()=>{}} onPrev={prevStep} nextDisabled={true} />
            </div>
        )
    }

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Résumé de votre configuration</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit / Option</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Délai</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Prix Achat HT</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {summary.items.map((item, index) => (
              <tr key={index} className={item.type === 'Vantail' || item.type === 'Cadre' ? 'bg-gray-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right font-mono">{item.code || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.delai || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{typeof item.price === 'number' ? `${item.price.toFixed(2)} €` : item.price}</td>
              </tr>
            ))}
          </tbody>
           <tfoot>
                <tr className="font-bold bg-gray-100">
                    <td colSpan={3} className="px-6 py-3 text-right text-sm text-gray-800">Total Achat HT</td>
                    <td className="px-6 py-3 text-right text-sm text-gray-800">{summary.totalAchatHT.toFixed(2)} €</td>
                </tr>
            </tfoot>
        </table>
      </div>

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-xl font-bold text-blue-800 mb-4">Calcul du Prix Public</h3>
        <div className="max-w-xs">
            <label htmlFor="mc-coeff" className="block text-sm font-medium text-gray-700">Coefficient MC</label>
            <select 
                id="mc-coeff"
                value={config.mcCoefficient}
                onChange={e => updateConfig(draft => { draft.mcCoefficient = parseFloat(e.target.value)})}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
                {MC_CODES.map(mc => (<option key={mc.coef} value={mc.coef}>{`x ${mc.coef.toFixed(1)}`}</option>))}
            </select>
        </div>
        {summary.selectedMcCode && <p className="text-xs text-gray-500 mt-1">EAN: {summary.selectedMcCode.ean}</p>}
        
        <div className="mt-4">
            <p className="text-lg font-semibold text-gray-700">Prix Public Final HT:</p>
            <p className="text-3xl font-extrabold text-blue-700">{summary.totalPublicHT.toFixed(2)} €</p>
        </div>
        <div className="mt-2">
            <p className="text-sm font-semibold text-gray-700">Délai estimé le plus long: <span className="text-blue-700">{summary.longestDelai}</span></p>
        </div>
      </div>

       <div className="mt-6 space-y-4">
            <InfoBox>
                <strong className="cursor-pointer" onClick={()=>setShowWarranty(!showWarranty)}>Garantie & Conditions ({showWarranty ? 'Cacher' : 'Afficher'})</strong>
                {showWarranty && <div className="mt-2"><WarrantyInfo /></div>}
            </InfoBox>
            <button
                onClick={() => setShowMeasurements(true)}
                className="text-sm text-blue-600 hover:underline"
            >
                Afficher le guide de mesures
            </button>
       </div>
       {showMeasurements && <MeasurementGuide onClose={() => setShowMeasurements(false)}/>}
      
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
         <button onClick={prevStep} className="px-6 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Précédent</button>
         <button onClick={resetConfig} className="px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">Nouvelle Configuration</button>
      </div>
    </div>
  );
};

export default Step10_Resume;
