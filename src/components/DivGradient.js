import "../App.css";

export default function DivGradient(props) {
  const { width, classCSS } = props;
  return <div className={`divGradient ${classCSS}`} width={width}></div>;
}
