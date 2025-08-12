export default function MatchCard({ match, onFavToggle, isFav }) {
  return (
    <div style={{border:"1px solid #ccc", padding:"10px", margin:"5px"}}>
      <h3>{match.team1} vs {match.team2}</h3>
      <p>Date: {match.date}</p>
      <p>Venue: {match.venue}</p>
      <p>Winner: {match.winner || "Draw"}</p>
      <button onClick={() => onFavToggle(match)}>
        {isFav ? "Remove Favorite" : "Add to Favorites"}
      </button>
    </div>
  );
}
