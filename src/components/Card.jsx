// eslint-disable-next-line react/prop-types
export default function Card({title, image}) {

  return (
    <button type="button" className="card">
      <img src={image} alt='' />
      <h2>{title}</h2>
    </button>
  );
}