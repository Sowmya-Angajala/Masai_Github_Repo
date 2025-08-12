export default function Card({ title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>This is a sample card.</p>
      <button>Click Me</button>
    </div>
  );
}
