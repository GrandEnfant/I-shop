Vue.component('big_cart', {
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
         this.cartItems = JSON.parse(localStorage.getItem('cart'));
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
    template: `<div class="string">
            <p v-if="!cartItems.length">Cart is empty</p>
            <cart-item 
            v-for="item of cartItems" 
            :key="item.id_product"
            :img="imgCart"
            :cart-item="item"
            :totalPrice="total"
            @remove="remove"></cart-item>
 <div class="cart_total"> 
    </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="row"> 
    <div class="Cart-content">
    <div class="item1"><img class="src_img" style="height:100px;" :src="cartItem.src_img" alt="">
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
    <div class="item"><i @click="$emit('remove', cartItem)" class="fas fa-times-circle"></i> </div>`
})