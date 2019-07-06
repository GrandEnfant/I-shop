Vue.component('cart', {
    data(){
        return {
            cartUrl: `/getBasket.json`,
            cartItems: [],
            showCart: false,
            imgCart: `https://placehold.it/50x100`,
            total: 0,
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
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
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    } else {
                        console.log('error!')
                    }
                })
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
 <a class="button_account" @click="showCart = !showCart">My Account 
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
            <button href="#" class="cart_button">Checkout</button>
                <button class="cart_button"> Go to cart </button>
    </div> </div></a> </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="item">
    <div class="item1"></div>
    </div>
    <div class="items_name">
    <h3 class="name_item"> {{cartItem.product_name}}</h3>
<br>
<p class="atribute_characteristic"> Color: </p>
<p class="volue_characteristic"> Red </p>
    <br>
    <p class="atribute_characteristic"> Size: </p>
<p class="volue_characteristic"> XII </p>
    </div>
    <div class="item"> {{cartItem.price}} </div>
    <div class="item">
    <input type="number" class="item_quantity"> </div>
    <div class="item"> Free </div>
    <div class="item">{{cartItem.quantity}} x {{cartItem.price}} </div>
    <div class="item"><i class="fas fa-times-circle"></i> </div>`
})