
// Quản lý cart
function ready() {  
    // Hàm xóa cart 
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')  
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i] 
        button.addEventListener('click', removeCartItem) 
    }
    // Hàm lấy số lượng và xử lý
    var quantityInputs = document.getElementsByClassName('cart-quantity-input') 
    for (var i = 0; i < quantityInputs.length; i++) { 
        var input = quantityInputs[i] 
        input.addEventListener('change', quantityChanged) 
    }
    // Xử lý sự kiện khi onclick vào 1 button của 1 cart bất kì
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i] 
        console.log(button)
        button.addEventListener('click', addToCartClicked) 
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}
// Hàm chốt đơn hàng khi click vào button Purchase
function purchaseClicked() { 
    alert('Thank you for your purchase') 
    var cartItems = document.getElementsByClassName('cart-items')[0] 
    while (cartItems.hasChildNodes()) { 
        cartItems.removeChild(cartItems.firstChild) 
    }
    updateCartTotal() 
}
// Hàm xóa sản phẩm chứa button bạn click
function removeCartItem(event) {  
    var buttonClicked = event.target 
    buttonClicked.parentElement.parentElement.remove() 
    updateCartTotal() 
}
// Hàm xử lý vấn đề khi bạn chọn số lượng sản phẩm âm
function quantityChanged(event) { 
    var input = event.target 
    if (isNaN(input.value) || input.value <= 0) { 
        input.value = 1
    }
    updateCartTotal() 
}
// Hàm thêm cart
function addToCartClicked(event) { 
    var button = event.target 
    var shopItem = button.parentElement.parentElement 
    console.log(shopItem)
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText 
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText 
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src 
    addItemToCart(title, price, imageSrc) 
    updateCartTotal() 
}

function addItemToCart(title, price, imageSrc) { 
    var cartRow = document.createElement('div') 
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title') 
    for (var i = 0; i < cartItemNames.length; i++) { 
        if (cartItemNames[i].innerText == title) { 
            alert('This item is already added to the cart')
            return
        }
    }
    // Cart con
    var cartRowContents = `
        <div class="cart-item cart-column text-conten">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column text-conten">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Remove</button>
        </div>`
    cartRow.innerHTML = cartRowContents 
    cartItems.append(cartRow) 
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
// Hàm update tổng số tiền
function updateCartTotal() { 
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row') 
    var total = 0 // Tổng bằng 0
    for (var i = 0; i < cartRows.length; i++) { 
        var cartRow = cartRows[i] 
        var priceElement = cartRow.getElementsByClassName('cart-price')[0] 
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] 
        var price = parseFloat(priceElement.innerText.replace('$', '')) 
        var quantity = quantityElement.value 
        total = total + (price * quantity) 
    }
    total = Math.round(total * 100) / 100 
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total 
}   
