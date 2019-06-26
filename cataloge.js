Vue.component('products', {
    data(){
      return {
          catalogUrl: `/catalogProducts.json`,
          products: [],
          filtered: [],
          imgCatalog: `https://placehold.it/200x150`,
      }
    },
    methods: {
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },
    template: `<div class="products">
        <product 
        v-for="product of filtered" 
        :key="product.id_product"
        :product="product"
        :img="imgCatalog"></product>
    </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div><div class="product" v-for="item of products">
            <a href="singlePage.html" class="product__link"><img class="product__img" src="item.src_img" alt="product"></a>
            <div class="product__info">
                <a href="singlePage.html">
                    <p class="product__text">{{item.product_name}}</p>
                </a><span class="product__price">{{item.price}} </span></div>
            <a href="#" class="product__add"><img :src=item.src_img alt="cart add">add to cart</a>
        </div> </div>`
})


//Vue.component('products', {
//    data() {
//        return {
//            linkCatalog: "/catalogProducts.json",
//            products: [],
//        }
//    },
//    mounted(){
//        this.$parent.getJson(`${API + this.linkCatalog}`)
//            .then(data => {
//            for(let el of data){
//                this.products.push(el);
//            }
//        });
//        this.$parent.getJson(`catalogProducts.json`) 
//            .then(data => {
//            for(let el of data) {
//                this.products.push(el);
//            }
//        })
//    },
//    template:     
// 
//})
//



   