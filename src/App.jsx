import { useState, useEffect } from 'react';
import ItemCard from './components/ItemCard';
import './App.css';

//stores the url of ur backend api
const API_URL = 'https://localhost:5000/api/items';

function App() {
  //creates a state varibale called items
  //Initially(before useEffect makes a request to the api to fetch data) starts with an empty array
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //when the component loads, run fetchItems()
  // [] - run this effect ONLY when the component first loads.
  //dont run it again because of state changes
  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`)
      }

      const data = await response.json();
      setItems(data);
      //variable created by javascript that contains information about the error that occurred.
    } catch (err) {
      //console.error - prints an error message to your browser's Developer Console.
      console.error("Error fetching items: ", err);
      setError("Could not load inventory. Is the API running?");
    } finally {
      setLoading(false);
    }
  }

  function handleDelete(id) {
    console.log("Delete requested for id: ", id);
  }

  return (
    <div>
      <header className="site-header">
        <h1>Stockly</h1>
        <p className="tagline">Know what's in stock, before you run out</p>
      </header>

      <section className="items-section">
        <h2>Current Inventory</h2>

        {/* //If the value on the left is true, show what's on the right. */}
        {loading && <p>Loading Inventory...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="items-grid">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;