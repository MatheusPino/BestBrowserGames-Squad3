import "../App.css";

export default function Input(props) {
  const { type, name, value, handleEvent, label, classCSS } = props;

  return (
    <>
      {label && (
        <label htmlFor={name} className="label">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        className={`inputBorderGradient ${classCSS}`}
        onChange={handleEvent}
      ></input>
    </>
  );
}
