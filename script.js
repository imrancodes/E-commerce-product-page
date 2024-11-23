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
const detailImg = document.querySelector('.detail-img')
const closeBtn = document.querySelector('.close-btn')
const mainFrame = document.querySelector('.main-frame')
const thumbnailDetailBox = document.querySelectorAll('.thumbnail-detail-img')
const leftArrow = document.querySelector('.left')
const rightArrow = document.querySelector('.right')



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

function thumbnailFunc(thumbnailBox, otherThumbnailBox) {
    thumbnailBox.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', (e) => {
            const othersElements = Array.from(thumbnailBox).filter((item) => item !== e.target)

            othersElements.forEach((othersElement) => {
                othersElement.classList.remove('selected-img')
            })

            thumbnail.classList.add('selected-img')

            let imageSrc = thumbnail.src.split('/')[4].split('-')[2]

            mainImg.src = `images/image-product-${imageSrc}.jpg`
            mainFrame.src = `images/image-product-${imageSrc}.jpg`

            detailSrc = Number(imageSrc)

            otherThumbnailBox.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('selected-img')
                } else {
                    item.classList.remove('selected-img')
                }
            })
        })
    })
}

thumbnailFunc(thumbnailBox, thumbnailDetailBox)


closeBtn.addEventListener('click', () => {
    detailImg.classList.add('hidden')
})

mainImg.addEventListener('click', () => {
    mainFrame.src = mainImg.src
    detailImg.classList.remove('hidden')
})

let detailSrc = Number(mainFrame.src.split('/')[4].split('-')[2].split('.')[0])

thumbnailFunc(thumbnailDetailBox, thumbnailBox)


rightArrow.addEventListener('click', () => {
    detailSrc++
    if (detailSrc > thumbnailBox.length) {  
        detailSrc = 1
    }
    mainFrame.src = `images/image-product-${detailSrc}.jpg`
    mainImg.src = `images/image-product-${detailSrc}.jpg`

    updateSelectedThumbnail(thumbnailBox)
    updateSelectedThumbnail(thumbnailDetailBox)
})

leftArrow.addEventListener('click', ()=>{
    detailSrc--
    if (detailSrc < 1) {  
        detailSrc = 4
    }
    mainFrame.src = `images/image-product-${detailSrc}.jpg`
    mainImg.src = `images/image-product-${detailSrc}.jpg`

    updateSelectedThumbnail(thumbnailBox)
    updateSelectedThumbnail(thumbnailDetailBox)
})

function updateSelectedThumbnail(thumbnailBox) {
    thumbnailBox.forEach((thumbnail, index)=>{
        thumbnail.classList.remove('selected-img')

        if (index + 1 === Number(detailSrc)) {
            thumbnail.classList.add('selected-img')
        }
    })
}