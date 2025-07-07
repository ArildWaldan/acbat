export enum Step {
  Type = 1,
  Gamme,
  Decor,
  Vantail,
  Cadre,
  SystemeCoulissant,
  Quincaillerie,
  Garniture,
  PlusValues,
  AccessoiresPose,
  Resume
}

export type PorteType = 'battante' | 'coulissante' | 'baie_libre' | null;
export type Gamme = 'cpl' | 'cpl_plus' | null;
export type Direction = 'gauche' | 'droit';

export interface Code {
  G?: string;
  D?: string;
}

export interface VantailSize {
  width: number;
  price: number;
  codes?: Code;
  code?: string; // For single code entries
}

export interface VantailVariant {
  name: string;
  height: number;
  delai: string;
  sizes: VantailSize[];
  cadreType?: string; // e.g., 'climat'
  mandatoryKit?: string;
  info?: string;
}

export interface Decor {
  name: string;
  gamme: Gamme;
  cadreId: string;
  variants: {
    [key: string]: VantailVariant;
  };
  plusValues?: string[];
  info?: string;
}

export interface EpaisseurCadre {
  range: [number, number];
  price?: number;
  price_730?: number;
  price_830?: number;
  price_930?: number;
  code?: string;
  codes?: {
      [vantailWidth: string]: { codes?: Code; code?: string } | undefined;
  };
  special?: boolean;
  delai?: string;
}

export interface Cadre {
  id: string;
  name: string;
  delai: string;
  epaisseurs: EpaisseurCadre[];
}

export interface PlusValue {
    id: string;
    name: string;
    type: 'surMesure' | 'fixed' | 'oculus';
    increase?: number;
    price?: number;
    delai: string;
    info?: string;
    options?: OculusOption[];
    decorSpecific?: string;
    minWallDepth?: number;
}

export interface OculusOption {
    model: string;
    priceTransparent?: number;
    priceSatinato?: number;
    decorSpecific?: string;
}

export interface Accessory {
    id: string;
    name: string;
    price: number;
    delai: string;
    code?: string;
}

export interface Serrure extends Accessory {}
export interface Cylindre extends Accessory {}
export interface Charniere extends Accessory {}

export interface Joint extends Accessory {
  colors: { [key: string]: string }
}

export interface KitReparation extends Accessory {
  colors: string[];
}

export interface CoulissantSystem extends Accessory {}

export interface Garniture {
  id: string;
  name: string;
  variations: { [key: string]: number };
  delai: string;
}

export interface Config {
  step: Step;
  porteType: PorteType;
  gamme: Gamme;
  decor: string | null;
  variant: string | null; // e.g., 'standard', 'climat', 'coulissant'
  vantailWidth: number | null;
  vantailHeight: number | null;
  wallWidth: number | null;
  wallDepth: number | null;
  direction: Direction;
  customSize: boolean;
  
  // Coulissant
  systemeCoulissant: 'applique' | 'entre_murs' | 'galandage' | null;
  kitCoulissant: string | null;
  cadreCoulissant: string | null;
  quincaillerieCoulissant: { [key: string]: boolean };

  // Quincaillerie
  serrure: Serrure | null;
  cylindre: Cylindre | null;
  garniture: {
    id: string;
    name: string;
    selectedType: string;
    price: number;
    delai: string;
  } | null;
  charniere: Charniere | null;

  // Options
  plusValues: { [key: string]: boolean | { oculusModel: string; oculusFinition: 'transparent' | 'satinato' } };
  cadreFinition: 'standard' | 'noirMat';
  
  // Accessoires
  accessoiresPose: { [key: string]: boolean | { color?: string } };
  mcCoefficient: number;
}

export interface SummaryItem {
    name: string;
    type: 'Vantail' | 'Cadre' | 'Option' | 'Accessoire' | 'Système Coulissant' | 'Quincaillerie';
    price: number | string;
    delai: string;
    code: string;
}

export interface Summary {
    items: SummaryItem[];
    totalAchatHT: number;
    totalPublicHT: number;
    longestDelai: string;
    selectedMcCode: { coef: number; ean: string; libelle: string; } | undefined;
    errors: string[];
}
