import { useState, useMemo, useCallback } from 'react';

export interface StableActions<K, T> {
  set: (key: K, value: T) => void;
  delete: (key: K) => void;
  clear: () => void;
}

export interface Actions<K, T> extends StableActions<K, T> {
  get: (key: K) => T;
}

const useMap = <K, T>(initialMap: Map<K, T>): [Map<K, T>, Actions<K, T>] => {
  const [map, set] = useState<Map<K, T>>(initialMap);

  const stableActions = useMemo<StableActions<K, T>>(
    () => ({
      set: (key, entry) => {
        set((prevMap) => prevMap.set(key, entry));
      },
      delete: (key) => {
        set((prevMap) => {
          prevMap.delete(key);
          return prevMap;
        });
      },
      clear: () => {
        set((prevMap) => {
          prevMap.clear();
          return prevMap;
        });
      },
    }),
    [set]
  );

  const utils = {
    get: useCallback((key) => map.get(key), [map]),
    ...stableActions,
  } as Actions<K, T>;

  return [map, utils];
};

export default useMap;
