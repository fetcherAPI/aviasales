import classes from "./Filter.module.scss";

export default function FilterItem(props) {
  const { value, name } = props;

  return (
    <label className={classes.label}>
      <input
        type='checkbox'
        className={classes.checkbox}
        name='filter'
        value={value}
      />
      <div className={classes.fakeCheckbox}></div>
      <span>{name}</span>
    </label>
  );
}
