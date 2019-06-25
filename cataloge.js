Vue.component('products', {
    data() {
        return {
            linkCatalog: "/catalogProducts.json",
            products: [],
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.linkCatalog}`)
            .then(data => {
            for(let el of data){
                this.products.push(el);
            }
        });
        this.$parent.getJson(`catalogProducts.json`) 
            .then(data => {
            for(let el of data) {
                this.products.push(el);
            }
        })
    },
    template:     
    `<div><div class="product" v-for="item of products">
            <a href="singlePage.html" class="product__link"><img class="product__img" src="img/Layer2.jpg" alt="product"></a>
            <div class="product__info">
                <a href="singlePage.html">
                    <p class="product__text">{{item.product_name}}</p>
                </a><span class="product__price">{{item.price}} </span></div>
            <a href="#" class="product__add"><img :src=item.src_img alt="cart add">add to cart</a>
        </div> </div>`
})




   