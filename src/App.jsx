import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = () => {
    const controller = new AbortController();

    setLoading(true);
    setError("");

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Something went wrong. Please try again.");
          setLoading(false);
        }
      });

    return controller;
  };

  useEffect(() => {
    const controller = fetchUsers();

    return () => controller.abort();
  }, []);

  const handleRetry = () => {
    fetchUsers();
  };

  return (
    <div className="app">
      <h1>User List</h1>

      {loading && <p>Loading users...</p>}

      {!loading && error && (
        <div>
          <p className="error">{error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <p>No users found.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="user-list">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <h2>
  {[
    "Aarya Kulkarni",
    "Riya Patil",
    "Sneha Sharma",
    "Ananya Deshmukh",
    "Priya Joshi",
    "Neha Pawar",
    "Sakshi More",
    "Pooja Shinde",
    "Kavya Patil",
    "Isha Kulkarni",
  ][user.id - 1]}
</h2>
              <p>{user.email}</p>
              <p>{user.company.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;