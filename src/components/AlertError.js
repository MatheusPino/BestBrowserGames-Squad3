export default function AlertError({ alertError, classCSS }) {    
  return (
    <span className={`errorDescription ${classCSS}`}>
      {alertError.length > 0 &&
        alertError.map((item) => <p key={item.message}>{item.message}</p>)}
    </span>
  );
}
