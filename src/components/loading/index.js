import { memo } from "react";
import './style.css';
import useDictionary from "../../store/use-dictionary";

function Loading() {
  const { currentDictionary } = useDictionary()

  return (
    <div className="Loading">
      {currentDictionary.loading}
    </div>
  );
}

export default memo(Loading);