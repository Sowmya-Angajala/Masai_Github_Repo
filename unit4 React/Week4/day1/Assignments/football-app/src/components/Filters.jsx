import { useDispatch } from "react-redux";
import { setFilters } from "../redux/matchesSlice";
import { useState } from "react";

export default function Filters() {
  const [team, setTeam] = useState("");
  const [winner, setWinner] = useState("");
  const dispatch = useDispatch();

  const applyFilters = () => {
    dispatch(setFilters({ team, winner }));
  };

  return (
    <div style={{margin:"10px"}}>
      <input
        type="text"
        placeholder="Filter by team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by winner"
        value={winner}
        onChange={(e) => setWinner(e.target.value)}
      />
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  );
}
