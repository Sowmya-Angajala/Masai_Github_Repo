import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/matchesSlice";
import MatchCard from "../components/MatchCard";

export default function FavoritesPage() {
  const { favorites } = useSelector(state => state.matches);
  const dispatch = useDispatch();

  if (!favorites.length) return <p>No favorites yet.</p>;

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.map(match => (
  <MatchCard
    key={`${match.team1}-${match.team2}-${match.date}`}
    match={match}
    onFavToggle={() => dispatch(removeFavorite(match.match_id))}
    isFav={true}
  />
))}

    </div>
  );
}
