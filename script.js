const cart = document.querySelector('.cart')
const cartDetail = document.querySelector('.cart-detail')
const quantityMore = document.querySelectorAll('.more')
const quantityLess = document.querySelector('.less')
let quantity = document.querySelector('.quantity-no')
const cartInfo = document.querySelector('.cart-info')
const checkoutBtn = document.querySelector('.checkout-btn')
const cartEmpty = document.querySelector('.cart-empty')
const cartQuantity = document.querySelector('.quantity')
const cartPrice = document.querySelector('.cart-price')
const deleteBtn = document.querySelector('.delete-icon')
const cartItemNo = document.querySelector('.cart-item-no')
const addToCart = document.querySelector('.add-to-cart')
const thumbnailBox = document.querySelectorAll('.thumbnail-img')
const mainImg = document.querySelector('.main-img')


cart.addEventListener('click', () => {
    cartDetail.classList.toggle('hidden')
})

let quantityNo = Number(quantity.innerText)

deleteProduct()
cartNotification()

quantityMore.forEach((more) => {
    more.addEventListener('click', () => {
        quantity.innerText = ++quantityNo
        cartQuantity.innerText = quantityNo
        cartPrice.innerText = `$${125 * quantityNo}.00`
        updateCart()
        cartNotification()
    })
})


quantityLess.addEventListener('click', () => {
    if (quantityNo <= 0) {
        quantity.innerText = 0
        cartQuantity.innerText = 0
    } else {
        quantity.innerText = --quantityNo
        cartQuantity.innerText = quantityNo
        cartPrice.innerText = `$${125 * quantityNo}.00`
    }
    updateCart()
    cartNotification()
})

function deleteProduct() {
    deleteBtn.addEventListener('click', () => {
        quantityNo = 0
        quantity.innerText = 0
        updateCart()
        cartNotification()
    })
}

function updateCart() {
    if (quantityNo > 0) {
        cartEmpty.classList.add('hidden')
        checkoutBtn.classList.remove('hidden')
        cartInfo.classList.remove('hidden')
        cartInfo.classList.add('cart-info-display')
    } else {
        cartEmpty.classList.remove('hidden')
        checkoutBtn.classList.add('hidden')
        cartInfo.classList.add('hidden')
        cartInfo.classList.remove('cart-info-display')
    }
}

function cartNotification() {
    if (quantityNo <= 0) {
        cartItemNo.classList.add('hidden')
    } else {
        cartItemNo.classList.remove('hidden')
    }
    cartItemNo.innerText = quantityNo
}

thumbnailBox.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (e) => {
        const othersElements = Array.from(thumbnailBox).filter((item) => item !== e.target)

        othersElements.forEach((othersElement) => {
            othersElement.classList.remove('selected-img')
        })

        thumbnail.classList.add('selected-img')

        mainImg.src = `images/image-product-${thumbnail.src.split('/')[4].split('-')[2]}.jpg`
    })
})