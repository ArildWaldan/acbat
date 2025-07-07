import { useMemo } from 'react';
import { Config, Summary, SummaryItem, EpaisseurCadre, Cadre } from '../types';
import { DECORS, CADRES, PLUS_VALUES, ACCESSORIES, MC_CODES } from '../data/doorData';

const findBestCadre = (config: Config): (Cadre & { selectedEpaisseur: EpaisseurCadre }) | null => {
    const { decor: decorId, porteType, wallDepth } = config;

    if (porteType === 'coulissante' || !decorId || !wallDepth) return null;
    
    const decorData = DECORS[decorId];
    let cadreId = decorData.cadreId;

    if (porteType === 'baie_libre') {
        cadreId = decorData.gamme === 'cpl_plus' ? 'baie_libre_cpl_plus' : 'baie_libre_cpl';
    } else if (config.variant) {
        const variantData = decorData.variants[config.variant];
        if (variantData?.cadreType) {
            cadreId = variantData.cadreType === 'climat' && decorData.gamme === 'cpl_plus' 
                ? 'climat_prestige' 
                : variantData.cadreType;
        }
    }
    
    const cadreInfo = CADRES[cadreId];
    if (!cadreInfo) return null;

    const selectedEpaisseur = cadreInfo.epaisseurs.find(e => wallDepth >= e.range[0] && wallDepth <= e.range[1]);
    if (!selectedEpaisseur) return null;

    return { ...cadreInfo, selectedEpaisseur };
};


export const useDoorConfig = (config: Config): { summary: Summary } => {
    const summary = useMemo<Summary>(() => {
        const items: SummaryItem[] = [];
        let totalAchatHT = 0;
        const delais: string[] = [];
        const errors: string[] = [];

        const { decor: decorId, variant: variantId, vantailWidth, customSize, porteType, direction } = config;
        
        // Vantail processing
        if (decorId && variantId && vantailWidth && (porteType === 'battante' || porteType === 'coulissante')) {
            const decorData = DECORS[decorId];
            const variantData = decorData.variants[variantId];
            const selectedVantailData = variantData.sizes.find(s => s.width === vantailWidth);

            if (!selectedVantailData && !customSize) {
                errors.push("La largeur de vantail sélectionnée n'est pas standard pour ce modèle.");
            } else {
                let vantailBasePrice = (selectedVantailData || variantData.sizes[0]).price;
                let vantailFinalPrice = vantailBasePrice;
                
                let vantailCode = 'MC';
                if (selectedVantailData?.code) {
                    vantailCode = selectedVantailData.code;
                } else if (selectedVantailData?.codes) {
                    vantailCode = direction === 'gauche' ? (selectedVantailData.codes.G ?? 'MC') : (selectedVantailData.codes.D ?? 'MC');
                }

                let vantailName = `Vantail ${decorData.name} - ${variantData.name} (${vantailWidth}mm)`;
                if(variantData.info) vantailName += ` (${variantData.info})`;

                if (customSize) {
                    const pvKey = (decorData.plusValues || []).find(k => k.startsWith('surMesure'));
                    if (pvKey) {
                        const pv = PLUS_VALUES[pvKey];
                        if (pv.increase) {
                            vantailFinalPrice *= (1 + pv.increase);
                            items.push({ name: pv.name, price: `+${pv.increase * 100}%`, delai: pv.delai, type: 'Option', code: 'Sur mesure' });
                            delais.push(pv.delai);
                        }
                    }
                }

                items.push({ name: vantailName, type: 'Vantail', price: vantailFinalPrice, delai: variantData.delai, code: vantailCode });
                totalAchatHT += vantailFinalPrice;
                delais.push(variantData.delai);

                if(variantData.mandatoryKit) {
                    const kit = ACCESSORIES.KITS[variantData.mandatoryKit as keyof typeof ACCESSORIES.KITS];
                    items.push({ name: kit.name, price: kit.price, delai: kit.delai, type: 'Accessoire', code: 'Inclus' });
                    totalAchatHT += kit.price;
                    delais.push(kit.delai);
                }
            }
        }
        
        // Cadre processing (for battante & baie_libre)
        if (porteType === 'battante' || porteType === 'baie_libre') {
            const cadreResult = findBestCadre(config);
            if (cadreResult) {
                const { name, selectedEpaisseur, delai, id: cadreId } = cadreResult;
                let price = (vantailWidth && selectedEpaisseur[`price_${vantailWidth}` as keyof EpaisseurCadre] as number) || selectedEpaisseur.price || 0;
                
                let code = 'MC';
                if(selectedEpaisseur.code) code = selectedEpaisseur.code;
                else if (selectedEpaisseur.codes && vantailWidth) {
                    const vantailCodeData = selectedEpaisseur.codes[vantailWidth.toString()];
                    if(vantailCodeData?.code) code = vantailCodeData.code;
                    else if (vantailCodeData?.codes) code = direction === 'gauche' ? (vantailCodeData.codes.G ?? 'MC') : (vantailCodeData.codes.D ?? 'MC');
                }

                let cadreName = `${name} (mur ${selectedEpaisseur.range[0]}-${selectedEpaisseur.range[1]}mm)`;
                if(config.cadreFinition === 'noirMat' && DECORS[config.decor!]?.plusValues?.includes('cadreNoirMat')) {
                    cadreName += ' - Finition Noir Mat';
                }

                if (selectedEpaisseur.special) {
                    items.push({ name: `Fabrication spéciale pour ${cadreName}`, type: 'Option', price: price, delai: selectedEpaisseur.delai || delai, code: 'Spéciale' });
                } else {
                    items.push({ name: cadreName, type: 'Cadre', price, delai, code });
                }
                totalAchatHT += price;
                delais.push(delai);
            } else if(config.wallDepth) {
                errors.push("Aucun cadre standard trouvé pour l'épaisseur de mur spécifiée. Envisagez une fabrication spéciale.");
            }
        }
        
        // Coulissant systems processing
        if (porteType === 'coulissante') {
            if(config.kitCoulissant) {
                const kit = {...ACCESSORIES.COULISSANT.SYSTEMES_APPLIQUE, ...ACCESSORIES.COULISSANT.SYSTEMES_ENTRE_MURS}[config.kitCoulissant];
                if(kit) {
                    items.push({ name: kit.name, price: kit.price, delai: kit.delai, type: 'Système Coulissant', code: 'N/A' });
                    totalAchatHT += kit.price;
                    delais.push(kit.delai);
                }
            }
             Object.entries(config.quincaillerieCoulissant).forEach(([key, value]) => {
                if(value) {
                    const quinc = ACCESSORIES.COULISSANT.QUINCAILLERIE[key as keyof typeof ACCESSORIES.COULISSANT.QUINCAILLERIE];
                    if(quinc) {
                         items.push({ name: quinc.name, price: quinc.price, delai: quinc.delai, type: 'Quincaillerie', code: 'N/A' });
                         totalAchatHT += quinc.price;
                         delais.push(quinc.delai);
                    }
                }
            });
        }


        // Quincaillerie
        if (config.charniere) {
          const { name, price, delai } = config.charniere;
          items.push({ name, price, delai, type: 'Quincaillerie', code: 'N/A'});
          totalAchatHT += price;
          delais.push(delai);
        }
        if (config.serrure) {
          const { name, price, delai } = config.serrure;
          items.push({ name, price, delai, type: 'Quincaillerie', code: 'N/A' });
          totalAchatHT += price;
          delais.push(delai);
        }
        if (config.cylindre && config.serrure?.id === 'serrure_pz') {
          const { name, price, delai } = config.cylindre;
          items.push({ name, price, delai, type: 'Quincaillerie', code: 'N/A' });
          totalAchatHT += price;
          delais.push(delai);
        }
        if (config.garniture) {
          const { name, selectedType, price, delai } = config.garniture;
          items.push({ name: `${name} (${selectedType})`, price, delai, type: 'Quincaillerie', code: 'MC' });
          totalAchatHT += price;
          delais.push(delai);
        }

        // Plus-Values
        Object.entries(config.plusValues).forEach(([key, value]) => {
          if (value) {
            const pv = PLUS_VALUES[key];
            if (pv.type === 'fixed' && pv.price) {
              items.push({ name: pv.name, price: pv.price, delai: pv.delai, type: 'Option', code: 'N/A' });
              totalAchatHT += pv.price;
              delais.push(pv.delai);
            } else if (pv.type === 'oculus' && typeof value === 'object' && value.oculusModel) {
                const oculusOption = pv.options?.find(o => o.model === value.oculusModel);
                if (oculusOption) {
                    const price = value.oculusFinition === 'transparent' ? oculusOption.priceTransparent : oculusOption.priceSatinato;
                    if(price !== undefined) {
                         items.push({ name: `Oculus ${value.oculusModel} - finition ${value.oculusFinition}`, price: price, delai: pv.delai, type: 'Option', code: 'N/A' });
                        totalAchatHT += price;
                        delais.push(pv.delai);
                    }
                }
            } else if (pv.type === 'fixed' && pv.price === 0) { // For options like German standards
                 items.push({ name: pv.name, price: 'Inclus', delai: pv.delai, type: 'Option', code: 'N/A' });
                 delais.push(pv.delai);
            }
          }
        });
        
        // Pose Accessories
        Object.entries(config.accessoiresPose).forEach(([key, value]) => {
            if (value) {
                const acc = ACCESSORIES.POSE[key as keyof typeof ACCESSORIES.POSE];
                let name = acc.name;
                if(typeof value === 'object' && value.color) {
                    name += ` - ${value.color}`;
                }
                items.push({ name, price: acc.price, delai: acc.delai, type: 'Accessoire', code: 'N/A' });
                totalAchatHT += acc.price;
                delais.push(acc.delai);
            }
        });

        const getDelaiValue = (delai: string) => {
            if (delai.toLowerCase() === 'stock') return 0;
            if (delai.toLowerCase().includes('demande')) return 99;
            const num = parseInt(delai, 10);
            return isNaN(num) ? 99 : num;
        };

        const longestDelai = delais.sort((a, b) => getDelaiValue(b) - getDelaiValue(a))[0] || 'N/A';
        
        const selectedMcCode = MC_CODES.find(mc => mc.coef === config.mcCoefficient);
        const doorAndOptionsPrice = items.filter(i => ['Vantail', 'Cadre', 'Option', 'Système Coulissant'].includes(i.type)).reduce((sum, i) => sum + (typeof i.price === 'number' ? i.price : 0), 0);
        const accessoriesPrice = items.filter(i => ['Accessoire', 'Quincaillerie'].includes(i.type)).reduce((sum, i) => sum + (typeof i.price === 'number' ? i.price : 0), 0);
        const totalPublicHT = (doorAndOptionsPrice * (selectedMcCode?.coef || 1)) + accessoriesPrice;

        return { items, totalAchatHT, totalPublicHT, longestDelai, selectedMcCode, errors };

    }, [config]);

    return { summary };
};
