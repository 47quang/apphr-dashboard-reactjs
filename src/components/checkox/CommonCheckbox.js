import Label from '../text/Label';

const CommonCheckbox = ({ containerClassName, inputClassName, label, checkboxId, value, onChange, onBlur, isDisable }) => {
  return (
    <div className={containerClassName}>
      <input
        id={checkboxId}
        className={inputClassName}
        type="checkbox"
        checked={value}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={isDisable}
      />
      <Label labelID={checkboxId} text={label} />
    </div>
  );
};
export default CommonCheckbox;
