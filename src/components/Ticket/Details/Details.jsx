import classes from "./Details.module.scss";

export default function Details(props) {
  const { title, value } = props;

  let t = null;
  if (title) {
    // eslint-disable-next-line no-restricted-globals
    if (isFinite(title)) {
      t = `${title} пересадки`;
    }
    t = title;
  } else {
    t = "в пути";
  }

  return (
    <div className={classes.block}>
      <p className={classes.title}>{t}</p>
      <p className={classes.info}>{value}</p>
    </div>
  );
}
