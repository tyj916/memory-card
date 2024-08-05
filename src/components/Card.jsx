// eslint-disable-next-line react/prop-types
export default function Card({name, imageUrl}) {

  return (
    <button type="button" className="card">
      <img src={imageUrl} alt='' />
      <h2>{name}</h2>
    </button>
  );
}