import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import css from "../common.module.scss";

import lss from "./Loader.module.scss";

const Loader = ({ isFetching, skipError }) => {
  const styleClass = `${lss.loader} ${!isFetching && lss.loaderHide} ${
    css.box
  }`;
  return (
    <div className={styleClass}>
      <h2 className={css.title}>
        {skipError === "" ? "Загружаем билеты…" : skipError}
      </h2>
    </div>
  );
};

Loader.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  skipError: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.general.isFetching,
  skipError: state.general.skipError,
});

export default connect(mapStateToProps)(Loader);
