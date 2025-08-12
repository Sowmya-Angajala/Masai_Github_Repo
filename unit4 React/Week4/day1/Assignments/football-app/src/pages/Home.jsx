import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMatches, addFavorite, removeFavorite } from "../redux/matchesSlice";
import MatchCard from "../components/MatchCard";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

export default function Home() {
  const dispatch = useDispatch();
  const { footballMatches, isLoading, isError, favorites, searchQuery, filters } = useSelector(state => state.matches);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const filteredMatches = footballMatches.filter(match => {
    const matchesSearch = match.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          match.team2.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeamFilter = filters.team ? (match.team1 === filters.team || match.team2 === filters.team) : true;
    const matchesWinnerFilter = filters.winner ? match.winner === filters.winner : true;
    return matchesSearch && matchesTeamFilter && matchesWinnerFilter;
  });

  const toggleFavorite = (match) => {
    const isFav = favorites.some(fav => fav.match_id === match.match_id);
    if (isFav) {
      dispatch(removeFavorite(match.match_id));
    } else {
      dispatch(addFavorite(match));
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching matches.</p>;

  return (
    <div>
      <h1>Football Matches</h1>
      <SearchBar />
      <Filters />
      
      {filteredMatches.map(match => (
  <MatchCard
    key={`${match.team1}-${match.team2}-${match.date}`}
    match={match}
    onFavToggle={toggleFavorite}
    isFav={favorites.some(f => f.match_id === match.match_id)}
  />
))}

    </div>
  );
}
