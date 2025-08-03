import React, { useEffect, useState } from "react";
import axios from "axios";

function UserCard({ name, email, city }) {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '10px',
            width: '250px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
            <h3>{name}</h3>
            <p>Email: {email}</p>
            <p>City: {city}</p>
        </div>
    );
}

function FetchData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch users. Please try again later.");
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredData = data.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>User List</h2>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    padding: '8px',
                    width: '250px',
                    marginBottom: '20px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />
            {filteredData.length > 0 ? (
                filteredData.map((user) => (
                    <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        city={user.address.city}
                    />
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default FetchData;
