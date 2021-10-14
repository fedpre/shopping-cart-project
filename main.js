const addToCartButton = document.querySelectorAll(".shop-item-button")


addToCartButton.forEach(button => {
    button.addEventListener("click", () => {
        let itemNames = document.querySelectorAll('.shop-item-title');
        let itemCosts = document.querySelectorAll('.shop-item-price');
        let purchaseEl = {};

        for (let i = 0; i < itemNames.length; i++) {

        }

        console.log(purchaseEl)

        const parentEl = document.querySelector('.cart-items')
        const newItem = document.createElement('div')
        newItem.setAttribute('class', 'cart-row')
        const newItemHtml = `
                            <div class="cart-item cart-column">
                                <img class="cart-item-image" src="./notion_habit_tracker_logo.jpg" width="100" height="100">
                                <span class="cart-item-title">${purchaseEl.name}</span>
                            </div>
                            <span class="cart-price cart-column">$${purchaseEl.cost}</span>
                            <div class="cart-quantity cart-column">
                                <input class="cart-quantity-input" type="number" value="1">
                                <button class="btn btn-danger" type="button">REMOVE</button>
                            </div>`

        newItem.innerHTML = newItemHtml;
        parentEl.appendChild(newItem);
    })
} )