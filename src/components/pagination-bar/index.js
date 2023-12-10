import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";

function PaginationBar(props) {
  const paginationArray = props.getPaginationArray(props.currentPage, props.totalCountPages);
  return (
    <div className="PaginationBar">
      {paginationArray.map((item, index) => {
        if (item !== null) {
          return (
            <Link
              onClick={item !== props.currentPage ? () => props.loadNewPage(item) : null}
              to={`./?page=${item}`}
              key={index}
              className={`PaginationBar-button ${item === props.currentPage ? "PaginationBar-button_active" : null}`}
            >
              {item}
            </Link>
          )
        }
        return <span key={index} className="PaginationBar-dots">...</span>
      })}
    </div>
  )
}

PaginationBar.PropTypes = {
  totalCountPages: PropTypes.number,
  currentPage: PropTypes.number,
  loadNewPage: PropTypes.func,
}

PaginationBar.deafultProps = {
  totalCountPages: 0,
  currentPage: 0,
  loadNewPage: () => { }
}

export default memo(PaginationBar)