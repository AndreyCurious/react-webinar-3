import { DictionaryContext } from "../../store/context";
import PropTypes from "prop-types";
import ru from "./ru"
import eng from "./eng"
import { useState, memo } from "react";

const lngs = {
  ru, eng
};

function DictionaryProvider({ children }) {
  const [currentDictionary, setCurrentDictionary] = useState(lngs.ru);
  const [currentLng, setCurrentLng] = useState('ru')
  const setRuLng = () => {
    setCurrentLng('ru')
    setCurrentDictionary(lngs.ru)
  }
  const setEngLng = () => {
    setCurrentLng('eng')
    setCurrentDictionary(lngs.eng)
  }


  return (
    <DictionaryContext.Provider value={{ setRuLng, setEngLng, currentDictionary, currentLng }}>
      {children}
    </DictionaryContext.Provider>
  )
}

DictionaryProvider.propTypes = {
  children: PropTypes.node
}

export default memo(DictionaryProvider);
