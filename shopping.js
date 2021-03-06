// Shopping Cart Functionalities

let remButtons = document.getElementsByClassName('btn-danger');

const updateCartTotal = () => {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

const removeCartItem = (event) => {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

const quantityChanged = (event) => {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

const addToCartClicked = (event) => {
    let button = event.target;
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal()
}

const addItemToCart = (title, price, imageSrc) => {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        } 
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}"">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents;

    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

const purchaseClicked = () => {
    alert('Thank you for your purchase!')
    let cartItems = document.getElementsByClassName('cart-items')[0];
    console.log(cartItems);
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal()
}

// Create New Item
const createButton = document.getElementsByClassName('btn-create')[0];


const createNewItem = () => {
    const newItemTitle = document.getElementById('title-input').value;
    const newItemPrice = document.getElementById('price-input').value;
    const newItemImgSrc = document.getElementById('img-input').value;
    
    const newEl = {
        title: newItemTitle,
        price: newItemPrice,
        img: newItemImgSrc,
    }

    const itemListEl = document.getElementsByClassName('shop-items')[0];
    const newDiv = document.createElement('div');

    const newElHtml = `
        <span class="shop-item-title">${newEl.title}</span>
        <img class="shop-item-image" src="${newEl.img}">
        <div class="shop-item-details">
            <span class="shop-item-price">$${newEl.price}</span>
            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
        </div>`

    newDiv.innerHTML = newElHtml;
    newDiv.classList.add('shop-item');
    itemListEl.append(newDiv);

    document.getElementById('title-input').value = '';
    document.getElementById('price-input').value = '';
    document.getElementById('img-input').value = '';

    const addButton = newDiv.getElementsByClassName('shop-item-button')[0];
    addButton.addEventListener('click', addToCartClicked)
}

for (let i = 0; i < remButtons.length; i++) {
    let button = remButtons[i];
    button.addEventListener("click", removeCartItem)
}

let quantityInputs = document.getElementsByClassName('cart-quantity-input');

for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged)
}

let addToCartButtons = document.getElementsByClassName('shop-item-button');
for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked)
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);

createButton.addEventListener('click', createNewItem);

