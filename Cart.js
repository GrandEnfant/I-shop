Vue.component('cart', {
    data(){
      return {
          cartUrl: `/getBasket.json`,
          cartItems: [],
          showCart: false,
          imgCart: `https://placehold.it/50x100`, 
          total: 0,
          stringCart: null
      }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                             this.stringCart = JSON.stringify(this.cartItems);
                            localStorage.setItem('cart', this.stringCart);
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                            this.stringCart =  JSON.stringify(this.cartItems);
                            localStorage.setItem('cart', this.stringCart);
                        }
                    } else {
                        console.log('error!')
                    }
                })
        },
        remove(product){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--;
                            let stringCart =  JSON.stringify(this.cartItems);
                            localStorage.setItem('cart', stringCart);
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                            let stringCart =  JSON.stringify(this.cartItems);
                            localStorage.setItem('cart', stringCart);
                        }
                    } else {
                        console.log('error!')
                    }
                })
        },
        showDateCart(){
            this.cartItems = JSON.parse(localStorage.getItem('cart'));
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    computed: {
      totalPrice: function(cartItems) {
        return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);  
      }  
    },
    template: `<div>
 <a class="button_account" @click="showCart = !showCart" @click="$root.$refs.cart.showDataCart()">My Account 
<div class="cart-block">
<div class="drop absolute width" style="display:none;" v-show="showCart">
            <p v-if="!cartItems.length">Cart is empty</p>
            <cart-item 
            v-for="item of cartItems" 
            :key="item.id_product"
            :img="imgCart"
            :cart-item="item"
            :totalPrice="total"
            @remove="remove"></cart-item>
 <div class="cart_total"> 
                             <h3 class="cart_totat_h3"> Total </h3>
                             <h3 class="carrt_total_h3">{{totalPrice}}  </h3></div>
                            <button href="" class="cart_button">Checkout</button>
                <a class="cart_button" href="Shopping_cart.html"> Go to cart </a>
    </div> </div></a> </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item" >
    <div class="drop_cart">
        <div class="cart_items">
            <div class="cart_column"><img class="src_img" style="height:100px;" :src="cartItem.src_img" alt=""></div>
            <div class="cart_column2">
                <h3 class="cart_name_item">{{cartItem.product_name}}</h3>
                <div class="stars"> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i></div>
                <p class="cart_price"> {{cartItem.quantity}} x {{cartItem.price}}</p> </div>
            <div class="cart_column"> <i @click="$emit('remove', cartItem)" class="fas fa-times-circle"></i>
            </div>
        </div>
    </div>
</div>
`
               
            //     <div class="product-bio">
            //         <img :src="img" alt="Some image">
            //         <div class="product-desc">
            //             <p class="product-title">{{cartItem.product_name}}</p>
            //             <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
            //             <p class="product-single-price">$ {{cartItem.price}} each</p>
            //         </div>
            //     </div>
            //     <div class="right-block">
            //         <p class="product-price">$ {{cartItem.quantity*cartItem.price}}</p>
            //         <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
            //     </div>
            // </div>`
})