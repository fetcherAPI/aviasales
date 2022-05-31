import React from "react";
import PropTypes from "prop-types";

const digits = (tp) => (tp > 9 ? `${tp}` : `0${tp}`);

const formatDate = (date) =>
  `${digits(date.getHours())}:${digits(date.getMinutes())}`;

const formatDuration = (time) => `${Math.floor(time / 60)}ч ${digits(time % 60)}м`;

const WrapPart = ({ text }) => <span>{text}</span>;
WrapPart.propTypes = { text: PropTypes.string.isRequired };

export const formatPrice = (amount) => {
  const result = [];
  let price = `${amount}`.split("");
  while (price.length > 3) {
    const part = price.slice(price.length - 3);
    price = price.slice(0, price.length - 3);
    result.push(part.join(""));
  }
  result.push(price.join(""));
  return result
    .reverse()
    .map((elem) => <WrapPart key={`_${elem}`} text={elem} />);
};

export const logoSrc = (codeIATA) => `//pics.avs.io/99/36/${codeIATA}.png`;

const stopsLabel = [
  "Без пересадок",
  "1 пересадка",
  "2 пересадки",
  "3 пересадки",
];

const flyTime = (origin, duration) => {
  const originMS = Date.parse(origin);
  const destinationMS = originMS + duration * 60 * 1000;
  const date1 = new Date(originMS);
  const date2 = new Date(destinationMS);
  return `${formatDate(date1)} – ${formatDate(date2)}`;
};

export function scanData(data) {
  const { price, carrier, segments } = data;

  return {
    price, // number
    carrier, // Код авиакомпании (iata), string
    segm: [
      {
        dep: segments[0].origin, // Код города (iata), string
        arr: segments[0].destination, // Код города (iata), string
        date: segments[0].date, // Дата и время вылета туда, string
        stops: segments[0].stops, // Массив кодов (iata) городов с пересадками, string[]
        duration: segments[0].duration, // Общее время перелёта в минутах, number
      },
      {
        dep: segments[1].origin,
        arr: segments[1].destination,
        date: segments[1].date,
        stops: segments[1].stops,
        duration: segments[1].duration,
      },
    ],
  };
}

export const detail = (flight, id) => ({
  id,
  dir: `${flight.dep} – ${flight.arr}`,
  time: `${flyTime(flight.date, flight.duration)}`,
  date: new Date(flight.date).toLocaleString(),
  duration: formatDuration(flight.duration),
  label: stopsLabel[flight.stops.length],
  stops: flight.stops.join(", ") || "\u00A0",
});
