import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { incTicketsAmount } from "../../../redux/actions";
import css from "../../common.module.scss";

import bss from "./MoreButton.module.scss";

const MoreButton = ({ founded, shown, handleClick }) => {
  const showButton = shown < founded - 5;
  return (
    showButton && (
      <button
        type='button'
        className={`${bss.button} ${css.box}`}
        onClick={() => handleClick()}
      >
        Показать еще 5 билетов!
      </button>
    )
  );
};

MoreButton.propTypes = {
  founded: PropTypes.number.isRequired,
  shown: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  shown: state.tickets.amount,
  founded: state.tickets.founded,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: () => dispatch(incTicketsAmount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreButton);
