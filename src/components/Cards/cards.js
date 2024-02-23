import "./teste.css"

export default function Card (props) {
    const urlImage = props.imageURL
    const title = props.name
    const category = props.category
    const urlJogo = props.url    
    const rating = props.score
    const description = props.description

    return (<><div className="main">
    <div className="card card1">
        <img src={urlImage} alt=""/>
        <h1>{title}</h1>    
        <h2>{category} <i className="fa-solid fa-star">{rating}  / 5</i></h2>    
        <h3>{urlJogo}</h3>       
        <p>{description}</p>
    </div>
</div></>)} 









