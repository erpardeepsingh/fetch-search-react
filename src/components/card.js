import App from "../App"

function Card(props){
return (<div className="card">
    <div className="card-image" style={{backgroundImage: `url(${props.data.image_url})`}}/>
    <div className="title">{props.data.title}</div>
</div>)
}

export default Card;