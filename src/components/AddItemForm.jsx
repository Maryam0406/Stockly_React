import { useState } from 'react';

function AddItemForm({ onAddItem }) {
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);

        const newItem = {
            name,
            sku,
            quantity: Number(quantity),
            price: Number(price),
            ...(category && { category }),
        };

        const result = await onAddItem(newItem);

        if (result.success) {
            setName('');
            setSku('');
            setCategory('');
            setQuantity('');
            setPrice('');
            setError(null);
        } else {
            setError(result.error);
        }
    }

    return (
        <section className="add-item-section">
            <h2>Add New</h2>
            {error && <p className="error-message">{error}</p>}
            {/*onSubmit - Bulit-in react event handler for the form element*/}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Item name"
                    value={name}
                    //onChange is a react event handler
                    //e is the event object - contains info about the event
                    //.target - HTML element where event was triggered
                    //.value - value of the element
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    required
                />

                 <input
                    type="text"
                    placeholder="Category (optional)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    min="0"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                />

                <button type="submit">Add Item</button>    
            </form>
        </section>
    );

}

export default AddItemForm;






