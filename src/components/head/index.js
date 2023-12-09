import { memo } from "react";
import PropTypes from "prop-types";
import useDictionary from "../../store/use-dictionary";
import './style.css';

function Head({ title }) {
  const { setRuLng, setEngLng, currentLng } = useDictionary();
  const callbacks = {
    setRuLng: () => setRuLng(),
    setEngLng: () => setEngLng()
  }
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className="Head-buttons">
        <button className={currentLng === 'ru' ? "Head-buttons_active" : 'Head-buttons-inactive'} onClick={callbacks.setRuLng}>RU</button>
        <button className={currentLng === 'eng' ? "Head-buttons_active" : 'Head-buttons-inactive'} onClick={callbacks.setEngLng}>ENG</button>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string
};

export default memo(Head);
