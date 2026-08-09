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



}