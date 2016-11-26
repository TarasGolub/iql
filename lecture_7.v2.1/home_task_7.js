/**
 * Creates new product
 *
 * @param {object} prod - describes product`s properties (id, name, price, shortDesc, fullDesc, stock)
 * @constructor
 */
function Product(prod) {
    prod = prod || {};

    // var products = Product.prototype.products; // object to store products according to v.1
    // this.showProductsList = function () {
    //     return products.showList();
    // };

    products.addToList(this);  // stores info about the newly created product

    // sets products properties, or designate a default
    this.id = setId(prod.id);
    this.name = prod.name || 'unnamed product ' + this.id;
    this.price = setValue(prod.price, true);
    this.shortDesc = prod.shortDesc || 'Empty short description';
    this.fullDesc = prod.fullDesc || 'Empty description';
    this.stock = setValue(prod.stock);

    /**
     * sets ID if it is valid or generate new ID.
     *
     * @param id
     * @returns {number} id - products ID
     */
    function setId(id) {
        if ( id && !products.hasID(id) ) {
            products.ids.push(id);
            return id;
        }
        while (true) {
            id = Math.floor(Math.random() * (10000 - 100) + 100);
            if ( products.hasID(id) ) continue;
            products.ids.push(id);
            return id;
        }
    }

    /**
     * Checks if num is valid number and num >= 0
     * @param num - number to check
     * @param {boolean} [throwError] - optional. Throw error if true, return 0 if false(default)
     * @returns {number} num if it is valid number and num >= 0, 0 or throw Error if num is not a number or num < 0 .
     */
    function setValue(num, throwError) {
        if (!isNaN(num) && isFinite(num) && (num >= 0) ) {
            return num;
        }
        if (throwError) {
            console.log('Required parameter is undefined');
            throw new Error('Invalid value:' + num);
        }
        return 0;
    }
}

/**
 * v.1
 * Object to store created products and their IDs, helps prevent duplicate IDs
 */
// Product.prototype.products = {
//     items: [],
//     showList: function () {  //shows id, name and quantity of each product
//         var str = '';
//
//         if ( isEmpty(this.items) ) {
//             str += 'You do not have products';
//             return str;
//         }
//         this.items.forEach(function (item) {
//             str += 'id: ' + item.id + '  name: ' + item.name + ' - ' + item.stock + 'pcs\n';
//         });
//         return str;
//     },
//     addToList: function (item) { //add item to the list
//         this.items.push(item);
//     },
//     hasID: function (id) { // check if id already exist
//         this.items.forEach(function (item) {
//             if (item.id === id) return true;
//         })
//     }
// };

/**
 * v.2
 * Object to store created products and their IDs
 * productList.ids helps prevent duplicate IDs
 */
var products = {
    items: [],
    ids: [],
    hasID: function (id) { // check if id already exist
        return ~this.ids.indexOf(id) ;
    },
    addToList: function (item) { //add item to the list
        this.items.push(item);
    },
    showList: function () {  //shows id, name and quantity of each product
        var str = '';

        if ( isEmpty(this.items) ) {
            str += 'You do not have products';
            return str;
        }
        this.items.forEach(function (item) {
            str += 'id: ' + item.id + '  name: ' + item.name + ' - ' + item.stock + 'pcs\n';
        });
        return str;
    }
};

/**
 * Creates cart object.
 *
 * @returns {Cart|*}
 * @constructor
 */
function Cart() {
    // object to store added to the order products
    this.orderedItems = {};

    /**
     * sets discount
     * @param {object} discount with 3 properties:
     *  "abs": {string} absolute discount ("100 USD")
     *  "pct": {string} percentage discount ("30%")
     *  "maxD": {string} maximum allowed discount in percentage("50%")
     */
    this.setDiscount = function (discount) {
        if (!this.discount) this.discount = {};
        this.discount.abs = parseFloat(discount.abs) || this.discount.abs || 0;
        this.discount.pct = parseFloat(discount.pct) || this.discount.pct || 0;
        this.discount.maxD = parseFloat(discount.maxD) || this.discount.maxD || 100;
        if (this.discount.maxD > 100) this.discount.maxD = 100; //max discount cannot be more then 100%
        return this.discount;
    };

    /**
     * Adds product to cart
     *
     * @param {object} item - product you want to add to cart
     * @returns {object|boolean} - product has been successfully added to the cart
     * or false if added nothing
     */
    this.addItem = function (item) {
        var name = item.name;
        var id = item.id;
        if (!name) {
            console.log('You try add to the cart not existing product');
            return false;
        }

        /**
         * checks the cart already contains the selected product
         * increases quantity if yes
         * set quantity = 1 is not
         */
        if (id in this.orderedItems) {
            this.orderedItems[id].quantity++;
        } else {
            this.orderedItems[id] = {"item": item, "quantity": 1};
        }
        return item;
    };

    /**
     * Adds product to cart by its ID
     *
     * @param {number} id - id of product you want to add to cart
     * @returns {object|boolean} - product has been successfully added to the cart
     * or false if added nothing
     */
    this.addItemById = function (id) {
        for (var key in products.items) {
            if ( !products.items.hasOwnProperty(key) ) continue;
            if ( products.items[key].id === id) {
                this.addItem(products.items[key]);
                return products.items[key];
            }
        }
        return false;
    };

    /**
     * Removes product from cart
     *
     * @param {object} item - product you want to remove
     * @returns {object|boolean} - product has been successfully removed from the cart
     * or false if removed nothing
     */
    this.removeItem = function (item) {
        var id = item.id;

        /**
         * does nothing if cart contains no this item
         * removes item if cart contains 1 pc
         * decreases quantity if cart contains more than 1pc
         */
        if ( !(id in this.orderedItems) ) {
            return false;
        }
        if (this.orderedItems[id].quantity === 1) {
            delete this.orderedItems[id];
            return item;
        }
        this.orderedItems[id].quantity--;
        return item;
    };

    /**
     * Removes product from cart by its ID
     *
     * @param {number} id - product you want to remove
     * @returns {object|boolean} - product has been successfully removed from the cart
     * or false if removed nothing
     */
    this.removeItemById = function (id) {
        for (var key in products.items) {
            if ( !products.items.hasOwnProperty(key) ) continue;
            if ( products.items[key].id === id) {
                this.removeItem(products.items[key]);
                return products.items[key];
            }
        }
        return false;
    };

    /**
     * Removes all products from the cart
     *
     * @returns {boolean} - false if deleted noting, true if cleaned cart
     */
    this.cleanCart = function () {
        if ( isEmpty(this.orderedItems) ) {
            return false;
        }
        this.orderedItems = {};
        return true;
    };

    /**
     * Sums prices of all products in the cart and subtract discounts if defined
     *
     * @returns {object} with 4 properties:
     * price {number} - price without any discounts
     * discount {number} - total discount
     * totalPrice {number} - price after subtracting discounts
     * message {string} - price, discount and totalPrice
     */
    this.getPrice = function () {
        var totalPrice = 0;
        // goes to each product in the cart and sum their prices
        for (var key in this.orderedItems) {
            if ( !this.orderedItems.hasOwnProperty(key) ) continue;
            var price = totalPrice += this.orderedItems[key].item.price * this.orderedItems[key].quantity;
        }
        // if discounts defined, calculates it
        if ( this.discount && !isEmpty(this.discount) ) {
            // if discounts defined, calculates both absolute and percent discounts and returns totalPrice - discount
            var abs = this.discount.abs;
            var pct = this.discount.pct / 100 * totalPrice;
            var minPrice = totalPrice - this.discount.maxD / 100 * totalPrice; // price with max discount
            totalPrice -= (abs + pct);
            if (totalPrice < minPrice) {
                totalPrice = minPrice;
            }
        }
        return {
            price: price,
            discount: price - totalPrice,
            totalPrice: totalPrice,
            message: '\nPrice: ' + price + '\nDiscount: ' + (price - totalPrice) + '\nTotal price: ' + totalPrice
        };
    };

    /**
     * returns an object with the contents of the cart if returnStr = false or not defined(default)
     * or string with readable info about contents of the cart if returnStr = true
     *
     * @param {boolean} returnStr
     * @returns {object|string}
     */
    this.showCart = function (returnStr) {
        if (!returnStr) return this.orderedItems;
        var cart = this.orderedItems;
        var str = '';
        for (var key in cart) {
            if ( !cart.hasOwnProperty(key) ) continue;
            str += 'id: ' + cart[key].item.id + '  name: ' +
                cart[key].item.name + '  quantity: ' + cart[key].quantity + 'pcs\n';
        }
        return str;
    };
}
var cart = new Cart();

/**
 * creates new order
 *
 * @param {object} orderDetails - describes order`s properties (address, delivery type and cost, payment method)
 * @constructor
 */
function Order(cart, orderDetails) {
    if (!cart) {
        console.log('Empty order!');
        cart = new Cart();
    }
    Cart.call(this);

    this.orderedItems = cart.orderedItems;

    orders.items.push(this);
    this.id = orders.items.length;

    /**
     * sets or changes order`s properties
     *
     * @param {object} orderDetails - describes order`s properties (address, delivery type and cost,
     * discount and payment method)
     * @returns {boolean}
     */
    this.setOrderInfo = function (orderDetails) {
        orderDetails = orderDetails || {};
        // next calls will overwrite only the passed parameters
        this.addr = orderDetails.addr || this.addr || 'Address is not defined!';
        this.deliveryType = orderDetails.deliveryType || this.deliveryType || 'Self pick up';
        this.deliveryCost = orderDetails.deliveryCost || this.deliveryCost || 0;
        this.payMethod = orderDetails.payMethod || this.payMethod || 'Credit Cart';
        this.orderPrice = this.orderPrice || 0;
        return true;
    };
    // sets orders properties, or designate a default
    this.setOrderInfo(orderDetails);

    var addI = this.addItem;
    this.addItem = function (item) {
        if (item.stock === 0) return false;
        addI.apply(this, arguments);
        --item.stock;
        return item;
    };

    var remI = this.removeItem;
    this.removeItem = function (item) {
        if (item.quantity === 0) return false;
        remI.apply(this, arguments);
        ++item.stock;
        return item;
    };

    this.orderInfo = function () {
        var order = this.showCart();
        var str = ''; // str contains ordered product block info of the output
        for (var key in order) {
            if ( !order.hasOwnProperty(key) ) continue;
            str += order[key].item.name + ': ' + (order[key].quantity == 1 ?
                    (order[key].quantity + ' pc.') :
                    (order[key].quantity + ' pcs.') ) +
                ' Sum: ' + order[key].quantity * order[key].item.price + '\n';
        }
        // gets price and discount of the order
        str += '\nPrice: ' + this.getPrice().price.toFixed(2) + '\n';
        // if defined discount, outputs it and total price
        if (this.getPrice().discount) {
            str += 'Discount: ' + this.getPrice().discount.toFixed(2) + '\n';
            str += 'Total Price: ' + this.getPrice().totalPrice.toFixed(2) + '\n';
        }
        this.orderPrice = this.getPrice();
        // confSrt contains full output string about order
        var confSrt = 'Confirmation\n' +
            '\nYour order: №' + this.id +
            '\nAddres: ' + this.addr +
            '\nDelivery: ' + this.deliveryCost + ' usd' +
            '\nDelivery method: ' + this.deliveryType +
            '\n\nYour order:\n' + str +
            '\nPayment method: ' + this.payMethod +'\nThank You!';
        // console.log(confSrt);
        // removes all products from order. The order is completed, it will change nothing
        console.log(confSrt);
        return confSrt;
    };


    if ( !isEmpty(this.orderedItems) ) {
        changeStock(this.orderedItems);
        cart.cleanCart();
        this.orderInfo();
    }

    function changeStock(prods) {
        if (isEmpty(prods)) {
            return 'Your cart is empty.';
        }
        for (var key in prods) {
            if (!prods.hasOwnProperty(key)) continue;
            if (prods[key].item.stock >= prods[key].quantity) {
                prods[key].item.stock -= prods[key].quantity;
            } else {
                prods[key].quantity = prods[key].item.stock;
                prods[key].item.stock = 0;
            }
        }
    }

}
/**
 * Confirms order
 * decreases the balance of the stock ordered products
 * outputs info about order to the console
 *
 * @returns {string} with full info about order
 */


var orders = {
    items: [],
    // shows info about  all confirmed orders
    showOrders: function () {
        var str = '';
        if ( isEmpty(this.items) ) {
            str += 'You have not orders';
            return str;
        }
        this.items.forEach(function (item) {
            str += 'id:' + item.id + '\n';
            for (var key in item.orderedItems) {
                if ( !item.orderedItems.hasOwnProperty(key) ) continue;
                var ordProd = item.orderedItems[key];
                str += 'prod_id: ' + ordProd.item.id +
                    ' name: ' + ordProd.item.name +
                    ' - ' + ordProd.quantity + ' pcs ' +
                    '  price: ' + ordProd.quantity + ' * ' +  ordProd.item.price + '\n';
            }
            str += '\nPrice: ' + item.getPrice().price + '\nDiscount: ' + item.getPrice().discount + '\n\n';
        });
        return str;
    }
};

// checks if object is empty
function isEmpty(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}


new Product({
    id: 101,
    name: "Meizu M4",
    price: 199,
    shortdesc: "New age of China`s phones",
    fullDesc: "Meizu M4 installs Flyme 4.5 os, and carries with Helio X10 MTK6795T " +
    "64Bit Octa Core 2.2GHz processor, 3GB Ram, 16GB Rom.",
    stock: 'asa5'
});
new Product({
    name: "iPhone 7",
    price: 598,
    shortdesc: "Super new powerfull iPhone",
    fullDesc: "The iPhone 7 has a better battery than before, a more color-rich screen, .... " +
    "which -- long story short -- means they're capable of reproducing more ... there wasn't a big " +
    "difference in how much detail was captured, but colors" +
    "64Bit Octa Core 2.2GHz processor, 3GB Ram, 16GB Rom.",
    stock: 1
});
new Product({
    id: 103,
    name: "Samsunt Note 7",
    price: 295,
    shortdesc: "Also known as Samsung Galaxy Note7 Duos",
    fullDesc: "Samsung Galaxy Note 7 is the latest mobile in India with Dual Edge screen 14.39cm ..." +
    " be different from the actual specifications and descriptions for the product.",
    stock: 2
});
new Product({
    id: 104,
    name: "HTC One M9",
    price: 327,
    shortdesc: "HTC One M9 Android smartphone",
    fullDesc: "HTC One M9 smartphone with 5.00-inch 1080x1920 display powered by 1.5GHz " +
    "processor alongside 3GB RAM and 20-megapixel rear camera",
    stock: 3
});
new Product({
    name: "Pixel",
    price: 395,
    shortdesc: "The First Phone by Google",
    fullDesc: "Google's first home-made smartphone is high power, high design, and high Android." +
    "The new Pixel phones are available for pre-order today, and will start shipping later this month",
    stock: 17
});
new Product({
    id: 106,
    name: "LG G4",
    price: 120,
    shortdesc: "LG G4 Android smartphone",
    fullDesc: "From the 5.5 inch LG G4 screen size and bright, bold LG G4 Quad HD display," +
    " to the Android Lollipop OS, the LG G4's specs are turning heads.",
    stock: 3
});
new Product({
    id: 106,
    name: "Asus Zenfone 6",
    price: 350,
    shortdesc: "Asus Zenfone 6 A601CG Android smartphone",
    fullDesc: "Asus ZenFone 6 smartphone with 6.00-inch 720x1280 display powered by " +
    "2GHz processor alongside 2GB RAM and 13-megapixel rear camera. ",
    stock: 5
});

console.log('Products before orders: \n', products.showList());
cart.addItemById(103);
cart.addItemById(103);
cart.addItemById(101);
cart.addItemById(106);
cart.addItemById(106);
console.log('Added some prods',cart.showCart(true));
cart.removeItemById(106);
console.log('Removed some prods',cart.showCart(true));

var order = new Order(cart, {
    addr: 'Lomonosova str. 35',
    deliveryType: 'Meest Express',
    deliveryCost: '30 usd',
    payMethod: 'Cash'
});

console.log("\ncart: ", cart.showCart(true), "\norder:", order.showCart(true));

order.addItemById(106);
order.addItemById(106);
console.log('\nAdded some prods',order.showCart(true), '  ', order.getPrice().totalPrice);
order.removeItemById(106);
console.log('\nRemoved some prods',order.showCart(true), '  ', order.getPrice().totalPrice);

console.log('\nPrice before discount', order.getPrice());
order.setDiscount({
    abs:'100 usd',
    pct: '10%'
});
console.log('\nPrice after discount', order.getPrice());

order.setDiscount({
    abs:'1000 usd',
    pct: '100%',
    maxD: '50%'
});
console.log('\nPrice after set max discount = 50%', order.getPrice());

console.log('\nProducts after orders: \n', products.showList());

console.log('\n All orders: \n', orders.showOrders());


