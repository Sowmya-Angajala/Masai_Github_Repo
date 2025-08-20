import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { setFilter, clearFilter } from "../store/feedbackSlice";

const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<number | "">("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");

  function apply() {
    dispatch(setFilter({
      rating: rating === "" ? undefined : Number(rating),
      from: from || undefined,
      to: to || undefined,
      search: search || undefined,
    }));
  }

  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="flex gap-2 flex-wrap">
        <select value={rating} onChange={e => setRating(e.target.value === "" ? "" : Number(e.target.value))} className="p-2 border rounded">
          <option value="">All ratings</option>
          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} stars</option>)}
        </select>

        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="p-2 border rounded"/>
        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="p-2 border rounded"/>

        <input placeholder="Search name or comment" value={search} onChange={e => setSearch(e.target.value)} className="p-2 border rounded flex-1"/>

        <button onClick={apply} className="px-3 py-2 bg-green-600 text-white rounded">Apply</button>
        <button onClick={() => { dispatch(clearFilter()); setRating(""); setFrom(""); setTo(""); setSearch(""); }} className="px-3 py-2 bg-gray-300 rounded">Clear</button>
      </div>
    </div>
  );
}

export default Filters;
