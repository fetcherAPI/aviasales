import React from "react";
import PropTypes from "prop-types";

import css from "../../common.module.scss";

import { scanData, formatPrice, logoSrc, detail } from "./ticketFunctions";
import tss from "./Ticket.module.scss";

const Ticket = ({ data }) => {
  const { price, carrier, segm } = scanData(data);
  const details = [detail(segm[0], "head"), detail(segm[1], "back")];

  return (
    <li className={`${tss.ticket} ${css.box} ${css.box__fly}`}>
      <h3 className={tss.ticketPrice}>
        {formatPrice(price)}
        {"P"}
      </h3>
      <img
        className={tss.ticketLogo}
        src={logoSrc(carrier)}
        alt={`${carrier} airlines logo`}
        title={carrier}
      />
      <ul className={`${tss.ticketDetails} ${tss.details}`}>
        <li className={tss.detailsCol}>
          {details.map((elem) => (
            <dl key={elem.id} className={tss.detailsList}>
              <dt className={tss.dt}>{elem.dir}</dt>
              <dd className={tss.dd} title={elem.date}>
                {elem.time}
              </dd>
            </dl>
          ))}
        </li>
        <li className={tss.detailsCol}>
          {details.map((elem) => (
            <dl key={elem.id} className={tss.detailsList}>
              <dt className={tss.dt}>В пути</dt>
              <dd className={tss.dd}>{elem.duration}</dd>
            </dl>
          ))}
        </li>
        <li className={tss.detailsCol}>
          {details.map((elem) => (
            <dl key={elem.id} className={tss.detailsList}>
              <dt className={tss.dt}>{elem.label}</dt>
              <dd className={tss.dd}>{elem.stops}</dd>
            </dl>
          ))}
        </li>
      </ul>
    </li>
  );
};

Ticket.propTypes = {
  data: PropTypes.shape({
    price: PropTypes.number,
    carrier: PropTypes.string,
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        origin: PropTypes.string,
        destination: PropTypes.string,
        date: PropTypes.string,
        stops: PropTypes.arrayOf(PropTypes.string),
        duration: PropTypes.number,
      })
    ),
  }).isRequired,
};

export default Ticket;
