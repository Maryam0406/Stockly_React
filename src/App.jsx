import { useState, useEffect } from 'react';
import ItemCard from './components/ItemCard';
import AddItemForm from './components/AddItemForm';

//stores the url of ur backend api
const API_URL = 'http://localhost:5000/api/items';

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

  async function handleDelete(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      await fetchItems(); // Refresh the list after deletion

  } catch (err) {
      console.error("Error deleting item: ", err);
      alert('Could not delete item. Please try again');     
  }
}    
  //this function sends the new item to the backend api using the post request and wiats for the response
  async function handleAddItem(newItem) {
    try {
      //fetch is the js function used to make http requests
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Failed to add item' };
      }

      await fetchItems(); // Refresh the list after adding
      return { success: true};
    } catch (err) {
      console.error("Error adding item: ", err);
      return { success: false, error: 'Network error. Is the API running' };
    }
  }
  return (
    <div>
      <header className="site-header">
        <h1>Stockly</h1>
        <p className="tagline">Know what's in stock, before you run out</p>
      </header>

      <AddItemForm onAddItem={handleAddItem} />

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