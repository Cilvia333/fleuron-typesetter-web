import { P21BList } from '~/components/architecture/moleculars/p21b';
import { iconTypes } from '~/components/architecture/share/fleuron';

export type MolecularDictionary = {
  id: string;
  atoms: number[];
};

export type AtomDictionary = {
  id: number;
  moleculars: string[];
};

export const molecularDictionary: MolecularDictionary[] = [P21BList];

export const atomDictionary: AtomDictionary[] = Object.entries(iconTypes).map(
  ([id, data]) => {
    const tmpArray: string[] = [];
    const parseId = parseInt(id.replace('F', ''));

    molecularDictionary.forEach((molecular) => {
      if (molecular.atoms.includes(parseId)) {
        tmpArray.push(molecular.id);
      }
    });

    return { id: parseId, moleculars: tmpArray } as AtomDictionary;
  }
);
