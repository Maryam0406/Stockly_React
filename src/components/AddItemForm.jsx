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

}






