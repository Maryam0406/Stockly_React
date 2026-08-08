function ItemCard({ item, onDelete }) {
    const isLowStock = item.quantity <= item.lowStockThreshold;

    return (
        <div className="item-card">
            <h3>{item.name}</h3>
            <span className="item-sku">{item.sku}</span>
            <span className="item-category">{item.category}</span>
            {isLowStock && <span className="low-stock-badge">Low Stock</span>}
            <div className="item-details">
                <span className="quantity">Qty: {item.quantity}</span>
                <span className="price">Price: ${item.price.toFixed(2)}</span>
            </div>
            <button className="delete-btn" onClick={() => onDelete(item.id)}>
                Delete
            </button>
        </div>
    );
}

export default ItemCard;