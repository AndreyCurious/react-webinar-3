import { useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {

  //return useContext(I18nContext);

  const i18n = useServices().i18n;
  const [lang, setLang] = useState(i18n.getLang());
  const t = (text, plural, lang) => i18n.translate(text, plural, lang)
  const changeLang = (value) => {
    i18n.setLang(value);
    setLang(value);
  };
  i18n.subscribe((value) => {
    setLang(value);
  })
  return { lang, changeLang, t };

}
