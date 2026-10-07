function changeQty(button, amount) {
    var input = button.parentElement.querySelector('.qty-input');
    var currentVal = parseInt(input.value) || 1;
    var newVal = currentVal + amount;

    if (newVal >= 1) {
        input.value = newVal;
        updateCart();
    }
}

function deleteItem(link) {
    var cartItem = link.closest('.cart-item');
    if (cartItem) {
        cartItem.remove();
        updateCart();
    }
}

function toggleAllCheckboxes(status) {
    var checkboxes = document.querySelectorAll('.cart-item .item-checkbox');
    checkboxes.forEach(function (cb) {
        cb.checked = status;
    });
    updateCart();
}

function addRecommended(title, price) {
    var cartBox = document.querySelector('.cart-box');
    var bottomSubtotal = document.querySelector('.cart-subtotal-bottom');

    var newItemHTML = `
        <div class="cart-item" data-price="${price}">
            <input type="checkbox" checked class="item-checkbox" onchange="updateCart()">
            <div class="item-img">
                <svg width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="12" fill="#666">Item</text></svg>
            </div>
            <div class="item-info">
                <div class="item-title">${title}</div>
                <div class="stock-status">In Stock</div>
                <div class="item-actions">
                    <div class="qty-selector">
                        <button type="button" class="btn-qty" onclick="changeQty(this, -1)">-</button>
                        <input type="number" class="qty-input" value="1" min="1" onchange="updateCart()">
                        <button type="button" class="btn-qty" onclick="changeQty(this, 1)">+</button>
                    </div>
                    <span class="action-sep">|</span>
                    <a href="javascript:void(0)" class="action-link" onclick="deleteItem(this)">Delete</a>
                </div>
            </div>
            <div class="item-price">$<span class="item-subtotal">${price.toFixed(2)}</span></div>
        </div>
    `;

    bottomSubtotal.insertAdjacentHTML('beforebegin', newItemHTML);
    updateCart();
}

function updateCart() {
    var items = document.querySelectorAll('.cart-item');
    var totalQty = 0;
    var grandTotal = 0;

    items.forEach(function (item) {
        var checkbox = item.querySelector('.item-checkbox');
        var qtyInput = item.querySelector('.qty-input');
        var unitPrice = parseFloat(item.getAttribute('data-price')) || 0;
        var qty = parseInt(qtyInput.value);

        if (isNaN(qty) || qty < 1) {
            qty = 1;
            qtyInput.value = 1;
        }

        var itemSubtotal = unitPrice * qty;
        var subtotalElem = item.querySelector('.item-subtotal');
        if (subtotalElem) {
            subtotalElem.innerText = itemSubtotal.toFixed(2);
        }

        if (checkbox && checkbox.checked) {
            totalQty += qty;
            grandTotal += itemSubtotal;
        }
    });

    var cartBadge = document.getElementById('cart-badge');
    if (cartBadge) cartBadge.innerText = totalQty;

    var totalItemsElems = document.querySelectorAll('.total-items-text');
    totalItemsElems.forEach(function (el) {
        el.innerText = totalQty;
    });

    var grandTotalElems = document.querySelectorAll('.grand-total-text');
    grandTotalElems.forEach(function (el) {
        el.innerText = grandTotal.toFixed(2);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    updateCart();
});