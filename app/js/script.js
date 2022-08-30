const btnToggleNav = document.querySelector('.nav-open-btn');
const btnCloseNav = document.querySelector('.nav-close-btn');
const navMenu = document.querySelector('.desktop-nav');
const btnCart = document.querySelector('.cart-btn');
const profileLink = document.querySelector('.profile-link');
const cartDiv = document.querySelector('.cart');
const btnAddToCart = document.querySelector('.add-to-cart-btn');
const cartContent = document.querySelector('.cart-content');
const btnCartDelete = document.querySelector('.cart-content button');
const quantitySelector = document.querySelector('.quantity-selector');
const quantityBadge = document.querySelector('.cart-quantity-badge');
const productImageMain = document.querySelector('.product-image-main');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const thumbImages = document.querySelectorAll('.lightbox-thumbnails img');


// Show and hide for mobile navigation
const showHideNav = () => {
    if(navMenu.classList.contains('mobile-nav')) {
        navMenu.classList.remove('mobile-nav');
        return;
    }
    if(!navMenu.classList.contains('mobile-nav')) {
        navMenu.classList.add('mobile-nav');
    }
}


// Add items to cart
const addToCart = () => {
    
    clearCart();

    const img = document.createElement('img');
    img.src = document.querySelector('.lightbox-thumbnails > a img').src;
    cartContent.appendChild(img);

    const divArticle = document.createElement('div');
    const title = document.createElement('span');
    title.classList.add('cart-article-title');
    title.textContent = document.querySelector('h1').textContent;  
    divArticle.appendChild(title);

    const divPrice = document.createElement('div');
    const price = document.createElement('span');
    price.textContent = document.querySelector('.price > span').textContent; 
    
    const quantitySpan = document.createElement('span');
    const quantity = document.querySelector('.number').textContent;
    quantitySpan.textContent = "x" + quantity;

    const totalSpan = document.createElement('span');
    totalSpan.classList.add('cart-total');

    const total = price.textContent.slice(1, 4) * quantity; 
    totalSpan.textContent = "$" + total + ".00"
    
    divPrice.appendChild(price);
    divPrice.appendChild(quantitySpan);
    divPrice.appendChild(totalSpan);
    divArticle.appendChild(divPrice);

    const divButton = document.createElement('div');
    const btnDelete = document.createElement('button');
    const iconDelete = document.createElement('img');
    iconDelete.src = "./images/icon-delete.svg";

    btnDelete.addEventListener('click', function() {
        clearCart(true);
    });

    btnDelete.appendChild(iconDelete);
    divButton.appendChild(btnDelete);

    cartContent.appendChild(divArticle);
    cartContent.appendChild(divButton);

    quantityBadge.textContent = quantity; 
    quantityBadge.style.display = "block";
}


// Clear cart items 
const clearCart = (emptyAll) => {
    const btnCheckout = document.querySelector('.checkout-btn');
    
    
    if(emptyAll && confirm('Empty your cart?')) {
        while(cartContent.firstChild) {
            cartContent.removeChild(cartContent.firstChild);
        } 
        btnCheckout.style.display = "none";
        quantityBadge.style.display = "none";
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Your cart is empty";
        cartContent.appendChild(emptyMessage);
    }
   

    if(!emptyAll) {
        while(cartContent.firstChild) {
            cartContent.removeChild(cartContent.firstChild);
        } 
        btnCheckout.style.display = "block";
    }   
}

const showCart = () => {
    const style = window.getComputedStyle(cartDiv);
    if(style.getPropertyValue('display') === "flex") {
        cartDiv.style.display = "none";
        return
    }
    if(style.getPropertyValue('display') === "none") cartDiv.style.display = "flex";
}

const selectQuantity = (e) => {
    const quantityNumber = document.querySelector('.number');

    if(e.target.classList.contains('plus') && quantityNumber.textContent < 10) quantityNumber.textContent++;
    if(e.target.classList.contains('minus') && quantityNumber.textContent > 1) quantityNumber.textContent--;
}


// Lightbox 
const lightboxPopup = () => {

    const body = document.querySelector('body');
    const overlay = document.createElement('div');
    const lightbox = document.querySelector('.lightbox');
    const lightboxClone = lightbox.cloneNode(true)
    overlay.classList.add('overlay');

    
    const btnLeft = document.createElement('button');
    btnLeft.classList.add('arrow-left-popup');
    const btnLeftIcon = document.createElement('img');
    btnLeftIcon.src = "./images/icon-previous.svg";
    btnLeft.appendChild(btnLeftIcon);
    btnLeft.addEventListener('click', function() {
        lightboxArrowSlider(slideIndex -= 1, true);
    })
    
    const btnRight = document.createElement('button');
    btnRight.classList.add('arrow-right-popup');
    const btnRightIcon = document.createElement('img');
    btnRightIcon.src = "./images/icon-next.svg";
    btnRight.appendChild(btnRightIcon);
    btnRight.addEventListener('click', function() {
        lightboxArrowSlider(slideIndex += 1, true);
    })
    
    const btnClose = document.createElement('button');
    btnClose.innerHTML = "&times;";
    btnClose.classList.add('lightbox-close-btn');

    btnClose.addEventListener('click', function() {
        overlay.remove();
    });
    
    lightboxClone.querySelectorAll('.lightbox-thumbnails img').forEach(image => {
        image.addEventListener('click', function(e) {
            lightboxThumbSlider(e, true);
        })
    });

    lightboxClone.appendChild(btnLeft);
    lightboxClone.appendChild(btnRight);
    lightboxClone.appendChild(btnClose)
    overlay.appendChild(lightboxClone);
    body.appendChild(overlay);
}

let slideIndex = 1;


const lightboxArrowSlider = (index, isPopup) => {
    
    const overlayMainImg = document.querySelector('.overlay .product-image-main');
    const thumbImagesOverlay = document.querySelectorAll('.overlay .lightbox-thumbnails img');
    
    if(index < 1) slideIndex = 4;
    if(index > 4) slideIndex = 1;

    
    if(isPopup) {
        
        overlayMainImg.src = thumbImages[slideIndex - 1].src.slice(0, -14) + ".jpg"; 
        
        document.querySelector('.overlay').querySelector('.active').classList.remove('active');
        
        thumbImagesOverlay[slideIndex - 1].classList.add('active');
    }
    
    if(!isPopup) {
        productImageMain.src = thumbImages[slideIndex - 1].src.slice(0, -14) + ".jpg";
    }
}



const lightboxThumbSlider = (e, isPopup) => {
    
    const overlayMainImg = document.querySelector('.overlay .product-image-main');

    
    if(isPopup)  {
        overlayMainImg.src = e.target.src.slice(0, -14) + ".jpg";
        document.querySelector('.overlay').querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
    }
    
    if(!isPopup) {
        productImageMain.src = e.target.src.slice(0, -14) + ".jpg";
        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
    }
}


// Event listeners
btnToggleNav.addEventListener('click', showHideNav);
btnCloseNav.addEventListener('click', showHideNav);
btnAddToCart.addEventListener('click', addToCart);
quantitySelector.addEventListener('click', selectQuantity);
btnCart.addEventListener('click', showCart);
productImageMain.addEventListener('click', lightboxPopup);
arrowLeft.addEventListener('click', function() {
    lightboxArrowSlider(slideIndex -= 1);
});
arrowRight.addEventListener('click', function() {
    lightboxArrowSlider(slideIndex += 1);
});
thumbImages.forEach(image => {
    image.addEventListener('click', function(e) {
        lightboxThumbSlider(e);
    });
});
