import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/matchesSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.matches.searchQuery);

  return (
    <input
      type="text"
      placeholder="Search matches..."
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      style={{margin:"10px", padding:"5px"}}
    />
  );
}
