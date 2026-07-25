// API se products load karo
fetch("http://localhost:3000/api/products")
.then(function(response){
    return response.json();
})
.then(function(products){

    const container=document.getElementById("products-container");

    products.forEach(function(product){

        // Product Card
        const card=document.createElement("div");
        card.className="product-card";
        card.dataset.productId=product.product_id;
        container.appendChild(card);

        // Wishlist Button
        const wishlistBtn=document.createElement("button");
        wishlistBtn.className="wishlist-btn";
        wishlistBtn.innerText="❤️";
        wishlistBtn.style.right;
        card.appendChild(wishlistBtn);

        // Image
        if(product.image_url){

            console.log(product.image_url);
            const image=document.createElement("img");
            console.log(image.src);
            image.src = "http://localhost:3000" + product.image_url;
            image.alt=product.product_name;
            image.className="product-image";
            console.log(image.src);
            card.appendChild(image);


        }

        // Product Info
        const info=document.createElement("div");
        info.className="product-info";
        card.appendChild(info);

        // Category
        const category=document.createElement("p");
        category.className="product-category";
        category.innerText="Category ID : "+product.category_id;
        info.appendChild(category);

        // Name
        const name=document.createElement("h3");
        name.className="product-name";
        name.innerText=product.product_name;
        info.appendChild(name);

        // Price
        const price=document.createElement("p");
        price.className="product-price";
        price.innerText="Rs. "+product.price;
        info.appendChild(price);

        // Stock
        const stock=document.createElement("p");
        stock.className="product-stock";
        stock.innerText="Stock : "+product.remaining_stock+" available";
        info.appendChild(stock);

        // Quantity Section
        const quantityDiv=document.createElement("div");
        quantityDiv.className="quantity-selector";
        info.appendChild(quantityDiv);

        // Minus Button
        const minusBtn=document.createElement("button");
        minusBtn.className="qty-btn";
        minusBtn.innerText="-";
        quantityDiv.appendChild(minusBtn);

        // Quantity Input
        const qtyInput=document.createElement("input");
        qtyInput.type="number";
        qtyInput.value=1;
        qtyInput.min=1;
        qtyInput.max=product.remaining_stock;
        qtyInput.className="qty-input";
        quantityDiv.appendChild(qtyInput);

        // Plus Button
        const plusBtn=document.createElement("button");
        plusBtn.className="qty-btn";
        plusBtn.innerText="+";
        quantityDiv.appendChild(plusBtn);

        // Add To Cart Button
        const cartBtn=document.createElement("button");
        cartBtn.className="add-to-cart";
        cartBtn.innerText="Add to Cart";
        info.appendChild(cartBtn);

        // Minus Quantity
        minusBtn.addEventListener("click",function(){

            if(parseInt(qtyInput.value)>1){
                qtyInput.value=parseInt(qtyInput.value)-1;
            }

        });

        // Plus Quantity
        plusBtn.addEventListener("click",function(){

            if(parseInt(qtyInput.value)<product.remaining_stock){
                qtyInput.value=parseInt(qtyInput.value)+1;
            }

        });

        // Add To Cart
        cartBtn.addEventListener("click",function(){

       const currentUser = localStorage.getItem("user");

    if(!currentUser){
    alert("Please login first.");
    window.location.href="login/login.html";
    return;

}

            fetch("http://localhost:3000/api/cart",{

                method:"POST",

                credentials:"include",
                headers:{
                    "Content-Type":"application/json",
                    
                },
                
                body:JSON.stringify({

                    product_id:product.product_id,
                    quantity:qtyInput.value

                })

            })

            .then(function(response){
                return response.json();
            })

            .then(function(data){

                alert(data.message);

            })

            .catch(function(error){

                console.log(error);

            });

        });

    });

})
.catch(function(error){

    console.log(error);

});


// Login Navbar
const currentUser=JSON.parse(localStorage.getItem("user"));

const loginNav=document.getElementById("loginNav");
const accountNav=document.getElementById("accountNav");
const accountName=document.getElementById("accountName");

if(currentUser){

    loginNav.style.display="none";
    accountNav.style.display="block";
    accountName.innerHTML="👤 "+currentUser.user_name+" ▾";

}


// Logout
const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",function(e){

    e.preventDefault();

    const currentUser=localStorage.removeItem("user");
    if(!currentUser){
        alert("please login first.");
        window.location.href="login/login.html";
        return;
    }

    window.location.href="main.html";

});

}


// Wishlist Link
document.getElementById("wishlistLink").addEventListener("click",function(e){

    e.preventDefault();

    if(!localStorage.getItem("user")){

        alert("Please login first.");

        window.location.href="login/login.html";

        return;

    }

    window.location.href="login/wishlist.html";

});


// Cart Link
document.getElementById("cartLink").addEventListener("click",function(e){

    e.preventDefault();

    if(!localStorage.getItem("user")){

        alert("Please login first.");

        window.location.href="login/login.html";

        return;

    }

    window.location.href="login/cart.html";

});