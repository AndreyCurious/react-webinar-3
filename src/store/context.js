import React from 'react';

/**
 * Контекст для Store
 * @type {React.Context<Store>}
 */
export const StoreContext = React.createContext();

export const DictionaryContext = React.createContext({
  lngs: {},
  currentDictionary: {},
  setLng: () => { },
});
