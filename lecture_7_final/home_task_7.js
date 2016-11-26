/**
 * @param prod obj {id, name, price, shortDesc, fullDesc, stock}
 * @constructor
 */
function Product(prod) {
    /**
     * Array to store IDs of created products
     */
    if (!Product.productList) {
        Product.productList = [];
        Product.productList.ids = [];
    }
    Product.productList.push(this);


    this.id = setId(prod.id);
    this.name = prod.name || 'unnamed product ' + this.id;
    this.price = setValue(prod.price, true);
    this.shortDesc = prod.shortDesc || 'Empty short description';
    this.fullDesc = prod.fullDesc || 'Empty description';
    this.stock = setValue(prod.stock);

    /**
     * set ID if prod.id is valid or generate new ID.
     * save all IDs in array to prevent duplicate
     */
    function setId(id) {
        if ( id && Product.productList.ids.indexOf(id) === -1 ) {
            Product.productList.ids.push(id);
            return id;
        }
        while (true) {
            id = Math.floor(Math.random() * (10000 - 100) + 100);
            if (~Product.productList.ids.indexOf(id)) continue;
            Product.productList.ids.push(id);
            return id;
        }
    }

    /**
     * Checks if @param num is positive number
     * @param num
     * @param throwError - optional(bool). Throw error if true, return 0 if false(default)
     * @returns num, 0.
     */
    function setValue(num, throwError) {
        // num = +num;
        if (!isNaN(num) && isFinite(num) && (num >= 0) ) {
            return num;
        }
        if (throwError) {
            throw new Error('Ivalid value:' + num);
        }
        return 0;
    }
}

/**
 * @returns {Cart|*}
 * @constructor
 */
function Cart() {
    if (Cart.instance) {
        return Cart.instance;
    }
    Cart.instance = this;

}
Cart.prototype.orderedItems = {};

/**
 * adds item to the cart
 * increases quantity if cart already contains item and add 1 item if not
 */
Cart.prototype.addItem = function (item) {
    var name = item.name;
    if (!name) {
        console.log('You try add to the cart not existing product');
        return false;
    }
    if (name in this.orderedItems) {
        this.orderedItems[name].quantity++;
    } else {
        this.orderedItems[name] = item;
        this.orderedItems[name].quantity = 1;
    }
    return item;
};

/**
 * removes item from cart
 * does nothing if cart contains no  this item
 * removes item if cart contains 1 pc
 * decreases quantity if cart contains more than 1pc
 */
Cart.prototype.removeItem = function (item) {
    var name = item.name;
    if ( !(name in this.orderedItems) ) return false;
    if (this.orderedItems[name].quantity === 1) {
        delete this.orderedItems[name];
        return;
    }
    this.orderedItems[name].quantity--;
    return item;
};

/**
 * removes all of the items from cart
 */
Cart.prototype.cleanCart = function () {
    if ( isEmpty(this.orderedItems) ) {
        return false;
    }
    this.orderedItems = {};
    return true;
};

/**
 * discount is optional obj like {abs: '200 usd', pct '20%'}
 * returns current full cost of order
 */
Cart.prototype.getPrice = function (discount) {
    var totalPrice = 0;
    for (var key in this.orderedItems) {
        totalPrice += this.orderedItems[key].price * this.orderedItems[key].quantity;
    }
    if (!discount || isEmpty(discount)) {
        return totalPrice.toFixed(2);
    }
    var abs = parseFloat(discount.abs) || 0;
    var pct = (parseFloat(discount.pct) / 100 * totalPrice) || 0;
    totalPrice -= (abs + pct);
    return totalPrice.toFixed(2);
};

/**
 * shows the contents of the cart
 */
Cart.prototype.showCart = function () {
    return this.orderedItems;
};

Cart.prototype.showStock = function () {
    var str = '';
    for (var key in Product.productList) {
        if ( key == 'ids' ) continue;
        str += Product.productList[key].name + ': ' + Product.productList[key].stock + ' pcs\n';
    }
    return str;
};

var cart = new Cart();

function Order(orderDetails) {
    orderDetails = orderDetails || {};
    Order.orderList = Order.orderList || [];

    var order = cart.showCart();
    console.log('ORDER:', order);
    if ( isEmpty(order) ) {
        console.log('Your cart is empty.');
        return;
    }

    Order.orderList.push(this);
    this.id = Order.orderList.length;
    this.addr = orderDetails.addr || 'Address is not defined!';
    this.delType = orderDetails.delType || 'Self pick up';
    this.delCost = orderDetails.delCost || 0;
    this.payMethod = orderDetails.payMethod || 'Credit Cart';
    this.orderDiscount = orderDetails.orderDiscount || {};
    this.orderPrice = 0;

    var str = '';
    console.log('cart', cart);
    console.log('order', this);
    for (var key in order) {
        console.log(key);
        if (order[key].stock >= order[key].quantity) {
            order[key].stock -= order[key].quantity;
        } else {
            str +='!!! ' + order[key].stock + ' instead of the expected ' + order[key].quantity + ' !!! ';
            order[key].quantity = order[key].stock;
            order[key].stock = 0;
        }
        str += key + ': ' + (order[key].quantity == 1 ?
                (order[key].quantity + ' pc.') :
                (order[key].quantity + ' pcs.') ) +
        ' Sum: ' + order[key].quantity * order[key].price + '\n';
    }
    str += '\nPrice: ' + cart.getPrice() + '\n';
    this.orderPrice = cart.getPrice();
    if ( !isEmpty(this.orderDiscount) ) {
        str += 'Discount: ' + ( this.orderPrice - cart.getPrice(this.orderDiscount) ) + '\n';
        this.orderPrice = cart.getPrice(this.orderDiscount);
        str += 'Total Price: ' + this.orderPrice + '\n';

    }
    var confSrt = 'Confirmation\n' +
        '\nYour order: №' + this.id +
        '\nAddres: ' + this.addr +
        '\nDelivery: ' + this.delCost + ' usd' +
        '\nDelivery method: ' + this.delType +
        '\n\nYour order:\n' + str +
        '\nPayment method: ' + this.payMethod +'\nThank You!';
    console.log(confSrt);
    cart.cleanCart();


}
extend(Order, Cart);


function extend(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

function isEmpty(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}



var meizu_desc = {
    id: 101,
    name: "Meizu M4",
    price: 199,
    shortdesc: "New age of China`s phones",
    fullDesc: "Meizu M4 installs Flyme 4.5 os, and carries with Helio X10 MTK6795T " +
    "64Bit Octa Core 2.2GHz processor, 3GB Ram, 16GB Rom.",
    stock: 'asa5'
};
var iphone_desc = {
    name: "iPhone 7",
    price: 598,
    shortdesc: "Super new powerfull iPhone",
    fullDesc: "The iPhone 7 has a better battery than before, a more color-rich screen, .... " +
    "which -- long story short -- means they're capable of reproducing more ... there wasn't a big " +
    "difference in how much detail was captured, but colors" +
    "64Bit Octa Core 2.2GHz processor, 3GB Ram, 16GB Rom.",
    stock: 1
};
var samsung_desc = {
    id: 103,
    name: "Samsunt Note 7",
    price: 295,
    shortdesc: "Also known as Samsung Galaxy Note7 Duos",
    fullDesc: "Samsung Galaxy Note 7 is the latest mobile in India with Dual Edge screen 14.39cm ..." +
    " be different from the actual specifications and descriptions for the product.",
    stock: 2
};
var htc_desc = {
    id: 104,
    name: "HTC One M9",
    price: 327,
    shortdesc: "HTC One M9 Android smartphone",
    fullDesc: "HTC One M9 smartphone with 5.00-inch 1080x1920 display powered by 1.5GHz " +
    "processor alongside 3GB RAM and 20-megapixel rear camera",
    stock: 3
};
var pixel_desc = {
    name: "Pixel",
    price: 395,
    shortdesc: "The First Phone by Google",
    fullDesc: "Google's first home-made smartphone is high power, high design, and high Android." +
    "The new Pixel phones are available for pre-order today, and will start shipping later this month",
    stock: 17
};
var lg_desc = {
    id: 106,
    name: "LG G4",
    price: 120,
    shortdesc: "LG G4 Android smartphone",
    fullDesc: "From the 5.5 inch LG G4 screen size and bright, bold LG G4 Quad HD display," +
    " to the Android Lollipop OS, the LG G4's specs are turning heads.",
    stock: 3
};
var asus_desc = {
    id: 106,
    name: "Asus Zenfone 6",
    price: 350,
    shortdesc: "Asus Zenfone 6 A601CG Android smartphone",
    fullDesc: "Asus ZenFone 6 smartphone with 6.00-inch 720x1280 display powered by " +
    "2GHz processor alongside 2GB RAM and 13-megapixel rear camera. ",
    stock: 5
};

var meizu = new Product(meizu_desc);
var iphone = new Product(iphone_desc);
var samsung = new Product(samsung_desc);
var htc = new Product(htc_desc);
var pixel = new Product(pixel_desc);
var lg = new Product(lg_desc);
var asus = new Product(asus_desc);


cart.addItem(meizu);
cart.addItem(iphone);
cart.addItem(iphone);
cart.addItem(samsung);
cart.addItem(samsung);
cart.addItem(samsung);
cart.addItem(samsung);
cart.removeItem(iphone);

var orderDetails = {
    addr: '5322 Otter Lane Middleberge FL 32068 ',
    delType: 'DHL',
    delCost: 35,
    orderDiscount: {
        abs: "200 usd",
        pct: "20%"
    }
};

// console.log(cart.showCart());
// console.log("Total Price", cart.getPrice());
// // console.log("Discount", cart.setDiscount(1000,'10%'));
// console.log(cart.setDiscount('100', '10%'));
//
var order = new Order(orderDetails);
// console.log(order.showCart());


