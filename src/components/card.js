import App from "../App"

function Card(props){
return (<a href={props.data.url} target="_blank" className="card">
    <div className="card-image" style={{backgroundImage: `url(${props.data.image_url})`}}/>
    <div className="title">{props.data.title}</div>
</a>)
}

export default Card;