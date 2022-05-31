import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { toggleFilter, castFilters } from "../../redux/actions";
import css from "../common.module.scss";

import fss from "./Filter.module.scss";

const Filter = ({ filters, toggle, cast }) => {
  const sumChecked = filters.reduce((sum, elem) => sum + elem.checked, 0);

  const renderFilter = (filter) => (
    <li className={fss.transfer} key={filter.id}>
      <label htmlFor={filter.id} className={fss.check}>
        <input
          type='checkbox'
          id={filter.id}
          className={fss.checkbox}
          checked={filter.checked && "checked"}
          onChange={() => toggle(filter.id)}
        />
        {filter.label}
      </label>
    </li>
  );

  return (
    <div className={`${fss.filters} ${css.box} ${css.box__fly}`}>
      <ul className={fss.transfers}>
        <li className={`${fss.transfer} ${fss.transfer__title}`}>
          <h2 className={css.title}>Количество пересадок</h2>
        </li>
        <li className={fss.transfer}>
          <label htmlFor='check-all' className={fss.check}>
            <input
              type='checkbox'
              id='check-all'
              className={fss.checkbox}
              checked={sumChecked === filters.length && "checked"}
              onChange={(event) => {
                const flag = event.target.checked;
                cast(flag);
              }}
            />
            Все
          </label>
        </li>
        {filters.map((elem) => renderFilter(elem))}
      </ul>
    </div>
  );
};

Filter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.string,
      checked: PropTypes.bool,
      value: PropTypes.number,
    })
  ).isRequired,
  toggle: PropTypes.func.isRequired,
  cast: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  filters: state.filters.filters,
});

const mapDispatchToProps = (dispatch) => ({
  toggle: (id) => dispatch(toggleFilter(id)),
  cast: (flag) => dispatch(castFilters(flag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
