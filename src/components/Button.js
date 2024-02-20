import "../App.css"

export default function Button(props) {
  const { text, classCSS, handleEvent } = props;

  return (
    <button type="button" className={classCSS} onClick={handleEvent}>
      {text}
    </button>
  );
}
