import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeSort } from "../../redux/actions";
import css from "../common.module.scss";

import sss from "./Sort.module.scss";

const Sort = ({ sorters, onChangeSort }) => {
  const renderSort = (sortObj) => {
    const styleClass = sortObj.active
      ? `${sss.sortBy} ${sss.sortBy__current}`
      : `${sss.sortBy}`;
    return (
      <li className={styleClass} key={sortObj.id}>
        <button
          type='button'
          className={sss.sortBtn}
          onClick={() => onChangeSort(sortObj.id)}
        >
          {sortObj.label}
        </button>
      </li>
    );
  };

  return (
    <ul className={`${sss.sort} ${css.box}`}>
      {sorters.map((elem) => renderSort(elem))}
    </ul>
  );
};

Sort.propTypes = {
  sorters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
  onChangeSort: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sorters: state.sorters.sorters,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSort: (id) => dispatch(changeSort(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
