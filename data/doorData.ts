import { Decor, Cadre, PlusValue, Accessory, Serrure, Cylindre, Garniture, Charniere, Joint, KitReparation, CoulissantSystem } from '../types';

export const MC_CODES = [
    { coef: 1.4, ean: '5059340778884', libelle: 'Code MC portes coef 1,4' },
    { coef: 1.6, ean: '5059340778891', libelle: 'Code MC portes coef 1,6' },
    { coef: 1.8, ean: '5059340778907', libelle: 'Code MC portes coef 1,8' },
];

export const DECORS: { [key: string]: Decor } = {
  "authenticChene": {
      name: "Authentic Chêne",
      gamme: 'cpl',
      cadreId: 'cpl_standard_60',
      variants: {
          standard: { name: "Vantail Battant Tubulaire", height: 2040, delai: '2s', sizes: [{ width: 730, price: 105.11, code: 'MC' }, { width: 830, price: 110.98, code: 'MC' }] },
          climat: { name: "Vantail Battant Climat 3", height: 2040, delai: '8s', mandatoryKit: 'kitClimat', cadreType: 'climat', info: 'Plinthe escamotable 32 dB', sizes: [{ width: 730, price: 283.08, code: 'MC' }, { width: 830, price: 283.08, code: 'MC' }] },
          coulissant: { name: "Vantail Coulissant Tubulaire", height: 2040, delai: '2s', sizes: [{ width: 730, price: 129.34, code: 'MC' }, { width: 830, price: 129.34, code: 'MC' }, { width: 930, price: 129.34, code: 'MC' }] }
      }
  },
  "authenticBlanc": {
      name: "Authentic Blanc",
      gamme: 'cpl',
      cadreId: 'cpl_standard_60',
      plusValues: ['cadreNoirMat'],
      variants: {
          standard: { name: "Vantail Battant Tubulaire", height: 2040, delai: '2s', sizes: [{ width: 730, price: 105.11, code: 'MC' }, { width: 830, price: 110.98, code: 'MC' }] },
          climat: { name: "Vantail Battant Climat 3", height: 2040, delai: '8s', mandatoryKit: 'kitClimat', cadreType: 'climat', info: 'Plinthe escamotable 32 dB', sizes: [{ width: 730, price: 283.08, code: 'MC' }, { width: 830, price: 283.08, code: 'MC' }] },
          coulissant: { name: "Vantail Coulissant Tubulaire", height: 2040, delai: '2s', sizes: [{ width: 730, price: 129.34, code: 'MC' }, { width: 830, price: 129.34, code: 'MC' }, { width: 930, price: 129.34, code: 'MC' }] }
      }
  },
  "cheneOntario": {
      name: "Chêne Ontario",
      gamme: 'cpl',
      cadreId: 'cpl_ontario_60',
      plusValues: ['surMesure_55', 'chantCeruse', 'oculus_ontario', 'cadreNoirMat'],
      variants: {
          standard: { name: "Vantail Battant Tubulaire", height: 2040, delai: '2s', sizes: [{ width: 730, price: 129.46, codes: { G: '101275210', D: '101275211' } }, { width: 830, price: 129.46, codes: { G: '101275212', D: '101275213' } }, { width: 930, price: 143.22, code: 'MC' }] },
          climat: { name: "Vantail Battant Climat 3", info: 'Plinthe escamotable 32 dB', height: 2040, delai: '8s', cadreType: 'climat', sizes: [{ width: 730, price: 541.20, code: 'MC' }, { width: 830, price: 541.20, code: 'MC' }, { width: 930, price: 541.20, code: 'MC' }] },
          coulissant: { name: "Vantail Coulissant Tubulaire", height: 2040, delai: '8s', sizes: [{ width: 730, price: 179.70, code: '101275214' }, { width: 830, price: 179.70, code: '101275215' }, { width: 930, price: 179.70, code: 'MC' }] }
      }
  },
  "cheneOntarioTabac": { name: "Chêne Ontario Tabac", gamme: 'cpl', cadreId: 'cpl_ontario_60', plusValues: ['surMesure_55', 'chantCeruse', 'oculus_ontario', 'cadreNoirMat'], variants: { standard: { name: "Vantail Battant Tubulaire", height: 2040, delai: '8s', sizes: [{ width: 730, price: 142.07, code: 'MC' }, { width: 830, price: 142.07, code: 'MC' }, { width: 930, price: 143.22, code: 'MC' }] }, climat: { name: "Vantail Battant Climat 3", info: 'Plinthe escamotable 32 dB', height: 2040, delai: '8s', cadreType: 'climat', sizes: [{ width: 730, price: 541.20, code: 'MC' }, { width: 830, price: 541.20, code: 'MC' }, { width: 930, price: 541.20, code: 'MC' }] }, coulissant: { name: "Vantail Coulissant Tubulaire", height: 2040, delai: '8s', sizes: [{ width: 730, price: 224.46, code: 'MC' }, { width: 830, price: 224.46, code: 'MC' }, { width: 930, price: 224.46, code: 'MC' }] } } },
  "cheneOntarioBlanc": { name: "Chêne Ontario Blanc", gamme: 'cpl', cadreId: 'cpl_ontario_60', plusValues: ['surMesure_55', 'chantCeruse', 'oculus_ontario', 'cadreNoirMat'], variants: { standard: { name: "Vantail Battant Tubulaire", height: 2040, delai: '8s', sizes: [{ width: 730, price: 142.07, code: 'MC' }, { width: 830, price: 142.07, code: 'MC' }, { width: 930, price: 143.22, code: 'MC' }] }, climat: { name: "Vantail Battant Climat 3", info: 'Plinthe escamotable 32 dB', height: 2040, delai: '8s', cadreType: 'climat', sizes: [{ width: 730, price: 541.20, code: 'MC' }, { width: 830, price: 541.20, code: 'MC' }, { width: 930, price: 541.20, code: 'MC' }] }, coulissant: { name: "Vantail Coulissant Tubulaire", height: 2040, delai: '8s', sizes: [{ width: 730, price: 224.46, code: 'MC' }, { width: 830, price: 224.46, code: 'MC' }, { width: 930, price: 224.46, code: 'MC' }] } } },
  "top400": { name: "Top 400", gamme: 'cpl', cadreId: 'cpl_ontario_60', plusValues: ['surMesure_55', 'chantCeruse', 'oculus_ontario', 'cadreNoirMat'], variants: { standard: { name: "Vantail Battant Tubulaire", height: 2040, delai: '8s', sizes: [{ width: 730, price: 205.54, code: 'MC' }, { width: 830, price: 205.54, code: 'MC' }, { width: 930, price: 205.54, code: 'MC' }] }, climat: { name: "Vantail Battant Climat 3", info: 'Plinthe escamotable 32 dB', height: 2040, delai: '8s', cadreType: 'climat', sizes: [{ width: 730, price: 690.25, code: 'MC' }, { width: 830, price: 690.25, code: 'MC' }, { width: 930, price: 690.25, code: 'MC' }] }, coulissant: { name: "Vantail Coulissant Tubulaire", height: 2040, delai: '8s', sizes: [{ width: 730, price: 340.40, code: 'MC' }, { width: 830, price: 340.40, code: 'MC' }, { width: 930, price: 340.40, code: 'MC' }] } } },
  "unicolorNoir": { name: "Aspect Bois / CPL Noir anti-trace", gamme: 'cpl_plus', cadreId: 'cpl_plus_prestige_65', plusValues: ['surMesure_30', 'serrure3points', 'porteAffleurante', 'oculus_noir', 'cadreNoirMat'], variants: { standard: { name: "Vantail Battant Tubulaire", height: 2040, delai: '8s', sizes: [{ width: 730, price: 250.35, code: 'MC' }, { width: 830, price: 250.35, code: 'MC' }, { width: 930, price: 250.35, code: 'MC' }] }, climat: { name: "Vantail Battant Climat 3", info: 'Plinthe escamotable 32 dB', height: 2040, delai: '8s', cadreType: 'climat_prestige', sizes: [{ width: 730, price: 764.63, code: 'MC' }, { width: 830, price: 764.63, code: 'MC' }, { width: 930, price: 764.63, code: 'MC' }] }, coulissant: { name: "Vantail Coulissant Tubulaire", height: 2040, delai: '8s', sizes: [{ width: 730, price: 375.74, code: 'MC' }, { width: 830, price: 375.74, code: 'MC' }, { width: 930, price: 375.74, code: 'MC' }] } } },
};

export const CADRES: { [key: string]: Cadre } = {
  cpl_standard_60: { id: 'cpl_standard_60', name: "Cadre standard 60mm (0/+19mm)", delai: '2s', epaisseurs: [ { range: [75, 94], price_730: 86.37, price_830: 86.37, code: 'MC' }, { range: [95, 114], price_730: 89.55, price_830: 89.55, code: 'MC' }, { range: [120, 139], price_730: 94.64, price_830: 94.64, code: 'MC' }, { range: [140, 159], price_730: 98.02, price_830: 98.02, code: 'MC' }, { range: [160, 179], price_730: 103.90, price_830: 103.90, code: 'MC' }, { range: [180, 199], price_730: 113.11, price_830: 113.11, code: 'MC' }, { range: [200, 219], price_730: 116.50, price_830: 116.50, code: 'MC' }, { range: [220, 239], price_730: 118.30, price_830: 118.30, code: 'MC' }] },
  cpl_ontario_60: { id: 'cpl_ontario_60', name: "Cadre Ontario 60mm (-6/+18mm)", delai: '8s', epaisseurs: [ { range: [69, 93], price: 142.30, codes: { '730': { codes: { G: '101275202', D: '101275203' } }, '830': { codes: { G: '101275204', D: '101275205' } } } }, { range: [89, 113], price: 142.30, codes: { '730': { codes: { G: '101275206', D: '101275207' } }, '830': { codes: { G: '101275208', D: '101275209' } } } }, { range: [99, 123], price: 152.19, code: 'MC' }, { range: [119, 143], price: 152.19, code: 'MC' }, { range: [126, 150], price: 152.19, code: 'MC' }, { range: [144, 168], price: 152.19, code: 'MC' }, { range: [159, 183], price: 182.05, code: 'MC' }, { range: [179, 203], price: 182.05, code: 'MC' }, { range: [204, 228], price: 182.05, code: 'MC' }, { range: [219, 243], price: 182.05, code: 'MC' }, { range: [234, 258], price: 207.52, code: 'MC' }, { range: [249, 273], price: 207.52, code: 'MC' }, { range: [269, 293], price: 207.52, code: 'MC' }, { range: [289, 313], price: 207.52, code: 'MC' }, { range: [309, 333], price: 207.52, code: 'MC' }, { range: [329, 353], price: 207.52, code: 'MC' }, { range: [340, 500], price: 514.03, special: true, delai: '8s', code: 'Spéciale' }, { range: [505, 650], price: 681.89, special: true, delai: '8s', code: 'Spéciale' }] },
  cpl_plus_prestige_65: { id: 'cpl_plus_prestige_65', name: "Cadre Prestige 65mm (-5/+10mm)", delai: '8s', epaisseurs: [ { range: [80, 85], price: 212.27, code: 'MC' }, { range: [95, 110], price: 212.27, code: 'MC' }, { range: [120, 135], price: 212.27, code: 'MC' }, { range: [140, 155], price: 212.27, code: 'MC' }, { range: [160, 175], price: 212.27, code: 'MC' }, { range: [180, 195], price: 212.27, code: 'MC' }, { range: [200, 215], price: 244.10, code: 'MC' }, { range: [235, 250], price: 244.10, code: 'MC' }, { range: [265, 280], price: 244.10, code: 'MC' }, { range: [285, 300], price: 285.62, code: 'MC' }, { range: [305, 320], price: 285.62, code: 'MC' }, { range: [325, 340], price: 285.62, code: 'MC' }] },
  climat: { id: 'climat', name: "Cadre CLIMAT 3", delai: '8s', epaisseurs: [ { range: [80, 85], price: 318.39, code: 'MC' }, { range: [95, 110], price: 318.39, code: 'MC' }, { range: [120, 135], price: 318.39, code: 'MC' }, { range: [140, 155], price: 318.39, code: 'MC' }, { range: [160, 175], price: 318.39, code: 'MC' }, { range: [180, 195], price: 318.39, code: 'MC' }, { range: [200, 215], price: 366.16, code: 'MC' }, { range: [235, 250], price: 366.16, code: 'MC' }, { range: [265, 280], price: 366.16, code: 'MC' }, { range: [285, 300], price: 428.43, code: 'MC' }, { range: [325, 340], price: 428.43, code: 'MC' }] },
  climat_prestige: { id: 'climat_prestige', name: "Cadre CLIMAT 3 Prestige", delai: '8s', epaisseurs: [ { range: [80, 85], price: 318.39, code: 'MC' }, { range: [95, 110], price: 318.39, code: 'MC' }, { range: [120, 135], price: 318.39, code: 'MC' }, { range: [140, 155], price: 318.39, code: 'MC' }, { range: [160, 175], price: 318.39, code: 'MC' }, { range: [180, 195], price: 318.39, code: 'MC' }, { range: [200, 215], price: 366.16, code: 'MC' }, { range: [235, 250], price: 366.16, code: 'MC' }, { range: [265, 280], price: 366.16, code: 'MC' }, { range: [285, 300], price: 428.43, code: 'MC' }, { range: [325, 340], price: 428.43, code: 'MC' }] },
  baie_libre_cpl: { id: 'baie_libre_cpl', name: "Cadre Baie-Libre", delai: '8s', epaisseurs: [ { range: [69, 150], price: 324.34, code: 'MC' }, { range: [144, 203], price: 366.25, code: 'MC' }, { range: [204, 243], price: 372.19, code: 'MC' }, { range: [249, 353], price: 391.33, code: 'MC' }] },
  baie_libre_cpl_plus: { id: 'baie_libre_cpl_plus', name: "Cadre Baie-Libre Prestige", delai: '8s', epaisseurs: [ { range: [80, 175], price: 275.94, code: 'MC' }, { range: [180, 250], price: 317.33, code: 'MC' }, { range: [265, 340], price: 371.31, code: 'MC' }] },
  coulissant_entre_murs_prestige: { id: 'coulissant_entre_murs_prestige', name: "Cadre Coulissant Entre Murs Prestige", delai: '8s', epaisseurs: [ { range: [100, 180], price: 463.19, code: 'MC' }, { range: [180, 305], price: 495.03, code: 'MC' }, { range: [305, 345], price: 536.54, code: 'MC' }] },
};

export const PLUS_VALUES: { [key: string]: PlusValue } = {
  surMesure_55: { id: 'surMesure_55', name: 'Dimensions sur mesure (gamme CPL)', type: 'surMesure', increase: 0.55, delai: '8s' },
  surMesure_30: { id: 'surMesure_30', name: 'Dimensions sur mesure (gamme CPL PLUS)', type: 'surMesure', increase: 0.30, delai: '8s' },
  chantCeruse: { id: 'chantCeruse', name: 'Chant cérusé noir', type: 'fixed', price: 16.78, delai: '8s' },
  serrure3points: { id: 'serrure3points', name: 'Serrure 3 points', type: 'fixed', price: 577.53, delai: '8s', info: 'Code C1 30977' },
  porteAffleurante: { id: 'porteAffleurante', name: 'Option porte affleurante (charnières invisibles)', type: 'fixed', price: 525.02, delai: '8s' },
  cadreNoirMat: { id: 'cadreNoirMat', name: 'Finition Cadre Noir Mat anti-trace', type: 'fixed', price: 0, delai: '8s', info: "Disponible à partir d'une ép. de mur de 80mm.", minWallDepth: 80 },
  oculus_ontario: { id: 'oculus_ontario', name: 'Oculus (fenêtre)', type: 'oculus', delai: '8s', options: [ { model: 'LA 16/40', priceTransparent: 235.55, priceSatinato: 325.28 }, { model: 'LA 16/20', priceTransparent: 492.80, priceSatinato: 591.25 }, { model: 'LA Vario M', priceTransparent: 394.35, priceSatinato: 520.80 }, { model: 'LA Vario B', priceTransparent: 394.35, priceSatinato: 520.80 }, { model: 'LA Vario S', priceTransparent: 394.35, priceSatinato: 520.80 }, { model: 'Feng Shui', priceSatinato: 520.80, decorSpecific: "top400" }] },
  oculus_noir: { id: 'oculus_noir', name: 'Oculus (fenêtre)', type: 'oculus', delai: '8s', options: [ { model: 'LA 16/40', priceTransparent: 293.04, priceSatinato: 345.67 }, { model: 'LA 16/20', priceTransparent: 334.41, priceSatinato: 377.41 }, { model: 'LA Vario M', priceTransparent: 237.64, priceSatinato: 256.39 }, { model: 'LA Vario B', priceTransparent: 237.64, priceSatinato: 256.39 }, { model: 'LA Vario S', priceTransparent: 237.64, priceSatinato: 256.39 }] },
  fraisagePoignee: { id: 'fraisagePoignee', name: 'Fraisage pour poignée cuvette', type: 'fixed', price: 48.07, delai: '8s' },
  fraisageSerrure: { id: 'fraisageSerrure', name: 'Fraisage pour serrure à condamnation', type: 'fixed', price: 55.83, delai: '8s' },
  cadreIntermediaire: { id: 'cadreIntermediaire', name: 'Plus-value cadre épaisseur intermédiaire', type: 'fixed', price: 25.32, delai: 'sur demande' },
  reservationsAllemandes: { id: 'reservationsAllemandes', name: 'Commander en réservations normes allemandes', type: 'fixed', price: 0, delai: '8s', info: 'Même prix, délai 8 semaines.'},
};

export const ACCESSORIES = {
  KITS: {
    kitClimat: { id: 'kitClimat', name: 'Kit gâche et charnières renforcées (pour porte Climat)', price: 15.68, delai: '8s'},
  },
  SERRURES: {
    'serrure_pz': { id: 'serrure_pz', name: 'Serrure pour cylindre (PZ)', price: 7.59, delai: '2s' },
    'serrure_wc': { id: 'serrure_wc', name: 'Serrure pour condamnation (WC)', price: 9.63, delai: '2s' },
  } as { [key: string]: Serrure },
  CYLINDRES: {
    'cyl_wx': { id: 'cyl_wx', name: 'Cylindre haute sécurité WX (16 goupilles)', price: 43.68, delai: '2s' },
    'cyl_f6s': { id: 'cyl_f6s', name: 'Cylindre débrayable F6S (6 goupilles)', price: 18.01, delai: '2s' },
    'cyl_std': { id: 'cyl_std', name: 'Cylindre débrayable (6 goupilles)', price: 9.90, delai: '2s' },
  } as { [key: string]: Cylindre },
  GARNITURES: {
    'utrecht_alta': { id: 'utrecht_alta', name: "Garniture UTRECHT / ALTA - Inox mat", variations: { 'Clé L (BB)': 11.74, 'Clé I (PZ)': 11.74, 'WC sans voyant': 19.67, 'WC avec voyant': 19.67 }, delai: '2s'},
    'stockholm_creux': { id: 'stockholm_creux', name: "Garniture STOCKHOLM - Inox mat creux", variations: { 'Béquilles seules': 16.29 }, delai: '2s' },
    'hambourg': { id: 'hambourg', name: "Garniture HAMBOURG - Alu noir mat (sur plaque)", variations: { 'Clé L (BB)': 26.12, 'Clé I (PZ)': 27.15, WC: 37.69 }, delai: '2s'},
    'christina': { id: 'christina', name: "Garniture CHRISTINA - Inox mat", variations: { 'Clé L (BB)': 32.87, 'Clé I (PZ)': 32.87, WC: 46.47 }, delai: '2s'},
    'toulon': { id: 'toulon', name: "Garniture TOULON - Alu noir mat", variations: { 'Clé L (BB)': 39.84, 'Clé I (PZ)': 40.80, WC: 52.35 }, delai: '2s' },
    'stockholm_noir': { id: 'stockholm_noir', name: "Garniture STOCKHOLM - Alu laqué noir mat", variations: { 'Clé L (BB)': 29.12, 'Clé I (PZ)': 29.12, WC: 41.32 }, delai: '2s' },
  } as { [key: string]: Garniture },
  CHARNIERES: {
    'std_nickele': { id: 'std_nickele', name: 'Charnière standard vantail (V0020 Nickelé)', price: 0.56, delai: '2s' },
    'std_cadre_nickele': { id: 'std_cadre_nickele', name: 'Charnière standard cadre (V3400 Nickelé)', price: 1.04, delai: '2s' },
    'renforcee_complete_nickele': { id: 'renforcee_complete_nickele', name: 'Charnière renforcée complète (V4426WF Nickelé)', price: 10.90, delai: '2s' },
    'renforcee_cadre_nickele': { id: 'renforcee_cadre_nickele', name: 'Charnière renforcée cadre (V4400WF Nickelé)', price: 2.80, delai: '2s' },
    'std_complete_noir': { id: 'std_complete_noir', name: 'Charnière standard complète (V3420 Noir mat)', price: 7.64, delai: '2s' },
    'renforcee_complete_noir': { id: 'renforcee_complete_noir', name: 'Charnière renforcée complète (V4426WF Noir mat)', price: 16.44, delai: '2s' },
  } as { [key: string]: Charniere },
  COULISSANT: {
    SYSTEMES_APPLIQUE: {
        'bario1': { id: 'bario1', name: 'Kit coulissant en applique BARIO 1', price: 178.20, delai: '2s' },
        'bario2': { id: 'bario2', name: 'Kit coulissant en applique BARIO 2', price: 190.30, delai: '2s' },
        'kit_verre': {id: 'kit_verre', name: 'Kit rail coulissant complet pour vantail verre', price: 265.06, delai: '2s'}
    } as { [key: string]: CoulissantSystem },
    SYSTEMES_ENTRE_MURS: {
      'cache_rail': { id: 'cache_rail', name: 'Cadre Entre Murs: Cache Rail', price: 396.50, delai: '8s' },
      'rail_cache_rail': { id: 'rail_cache_rail', name: 'Cadre Entre Murs: Rail + Cache Rail', price: 471.68, delai: '8s' },
      'rail_cache_poteau': { id: 'rail_cache_poteau', name: 'Cadre Entre Murs: Rail + Cache Rail + Poteau', price: 487.74, delai: '8s' },
      'devant_mur': { id: 'devant_mur', name: 'Cadre Entre Murs: Devant mur', price: 1162.70, delai: '8s' },
      'entre_murs_100_150': { id: 'entre_murs_100_150', name: 'Cadre Entre murs (ép. 100-150mm)', price: 459.03, delai: '8s' },
      'entre_murs_165_210': { id: 'entre_murs_165_210', name: 'Cadre Entre murs (ép. 165-210mm)', price: 496.32, delai: '8s' },
      'entre_murs_240_335': { id: 'entre_murs_240_335', name: 'Cadre Entre murs (ép. 240-335mm)', price: 518.71, delai: '8s' },
    } as { [key: string]: CoulissantSystem },
    QUINCAILLERIE: {
      'poignee_cuvette_noir': { id: 'poignee_cuvette_noir', name: 'Paire de poignées cuvette Acier noir', price: 9.91, delai: 'stock' },
      'embouts_bario_noir': { id: 'embouts_bario_noir', name: "Paire d'embouts pour rail BARIO", price: 10.89, delai: 'stock' },
      'serrure_ronde_chrome': { id: 'serrure_ronde_chrome', name: 'Kit serrure à condamnation ronde Chromée', price: 18.79, delai: 'stock' },
      'serrure_ronde_noir': { id: 'serrure_ronde_noir', name: 'Kit serrure à condamnation ronde Noire', price: 18.79, delai: 'stock' },
      'serrure_carree_chrome': { id: 'serrure_carree_chrome', name: 'Kit serrure à condamnation carrée Chromée', price: 20.68, delai: 'stock' },
      'serrure_carree_noir': { id: 'serrure_carree_noir', name: 'Kit serrure à condamnation carrée Noire', price: 20.68, delai: 'stock' },
      'serrure_rosace_ronde_inox': { id: 'serrure_rosace_ronde_inox', name: 'Kit serrure galandage sur rosaces rondes Inox', price: 34.92, delai: 'stock' },
      'serrure_rosace_carree_inox': { id: 'serrure_rosace_carree_inox', name: 'Kit serrure galandage sur rosaces carrées Inox', price: 35.97, delai: 'stock' },
    } as { [key: string]: Accessory },
  },
  POSE: {
    'mousse': {id: 'mousse', name: 'Mousse expansive B2 bicomposante 400ml', price: 14.67, delai: 'stock'},
    'cales': {id: 'cales', name: 'Lot de 6 cales de réglages', price: 4.95, delai: 'stock'},
    'positionneur': {id: 'positionneur', name: 'Positionneur TMS', price: 48.45, delai: 'stock'},
    'profil_finition': {id: 'profil_finition', name: 'Profil de finition CPL 22x60x2200mm', price: 33.77, delai: '8s'},
    'kit_reparation': {id: 'kit_reparation', name: 'Kit de réparation CIRE pour CPL', price: 74.47, delai: '2s', colors: ['Gris', 'Noir', 'Blanc', 'Brun']} as KitReparation,
    'joint_phonique': {id: 'joint_phonique', name: 'Joint de porte phonique (5ML)', price: 14.57, delai: '2s', colors: {'Gris': '#808080', 'Noir': '#000000', 'Blanc': '#FFFFFF', 'Brun': '#A52A2A'}} as Joint,
    'rosaces_carrees_inox': {id: 'rosaces_carrees_inox', name: 'Paire de rosaces clé "I" PZ carrées Inox Mat', price: 4.28, delai: '2s'},
    'fourreau_6_8': {id: 'fourreau_6_8', name: 'Fourreau d\'adaptation 6/8 mm', price: 0.16, delai: '2s'},
    'fourreau_7_8': {id: 'fourreau_7_8', name: 'Fourreau d\'adaptation 7/8 mm', price: 0.99, delai: '2s'},
  }
};
