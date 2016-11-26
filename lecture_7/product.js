
/**
 * @param prod obj {id, name, price, shortDesc, fullDesc, stock}
 * @constructor
 */
function Product(prod) {
    /**
     * Array to store IDs of created products
     */
    if (!Product.createdItems) {
        Product.createdItems = [];
    }
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
        if ( id && Product.createdItems.indexOf(id) === -1 ) {
            Product.createdItems.push(id);
            return id;
        }
        while (true) {
            id = Math.floor(Math.random() * (10000 - 100) + 100);
            if (~Product.createdItems.indexOf(id)) continue;
            Product.createdItems.push(id);
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
 *
 * @returns {Cart|*}
 * @constructor
 */
function Cart() {
    if (Cart.instance) {
        return Cart.instance;
    }
    Cart.instance = this;

    var orderedItems = {};

    /**
     * adds item to the cart
     * increases quantity if cart already contains item and add 1 item if not
     * decreases stock
     */
    this.addItem = function (item) {
        var name = item.name;
        if (item.stock === 0) {
            console.log(name + ' out of stock');
            return name + ' out of stock';
        }
        if (name in orderedItems) {
            orderedItems[name].quantity++;
            item.stock--;
        } else {
            orderedItems[name] = item;
            orderedItems[name].quantity= 1;
            item.stock--;
        }
    };

    /**
     * removes item from cart and increase stock
     * does nothing if cart contains no  this item
     * removes item if cart contains 1 pc
     * decreases quantity if cart contains more than 1pc
     */
    this.removeItem = function (item) {
        var name = item.name;
        if ( !(name in orderedItems) ) return;
        if (orderedItems[name].quantity === 1) {
            item.stock++;
            delete orderedItems[name];
            return;
        }
        item.stock++;
        orderedItems[name].quantity--;
    };

    /**
     *
     * @returns current full cost of order
     */
    this.price = function () {
        var totalPrice = 0;
        for (var key in orderedItems) {
            totalPrice += orderedItems[key].price * orderedItems[key].quantity;
        }
        return totalPrice;
    };

    /**
     * takes any number of arguments,
     * string for discount in percent. ("20%")
     * string or number for absolute discount (100 or "100")
     * all discount sums
     * @returns {string}
     */
    this.discount = function () {
        var currentPrice = this.price();
        var discount = 0;
        var str = 'Your discount: ';
        if (arguments.length === 0) {
            str += 'not defined. \n Total price: ' + currentPrice;
            return str;
        }
        for (var i = 0; i < arguments.length; i++) {
            if ( ~(arguments[i]+'').indexOf('%') ) {
                discount += currentPrice * parseInt(arguments[i]) / 100;
            } else if (!isNaN(+arguments[i]) && isFinite(+arguments[i]) && (+arguments[i] > 0) ) {
                discount += +arguments[i];
            } else {
                str += 'Sorry! Error in discount arguments\n Total Price: ' + currentPrice;
                return str;
            }
        }
        if ( (currentPrice - discount) > 0 ) {
            str += discount.toFixed(2) + '\nTotal price: ' + (currentPrice - discount).toFixed(2);
        } else {
            str += 'too large' + '\nTotal price: 0';
        }
        return str;
    };

    /**
     * shows the contents of the cart
     */
    this.showCart = function () {
        return orderedItems;
    };
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
    stock: 2
};
var samsung_desc = {
    id: 103,
    name: "Samsunt Note 7",
    price: 295,
    shortdesc: "Also known as Samsung Galaxy Note7 Duos",
    fullDesc: "Samsung Galaxy Note 7 is the latest mobile in India with Dual Edge screen 14.39cm ..." +
    " be different from the actual specifications and descriptions for the product.",
    stock: 3
};
var htc_desc = {
    id: 104,
    name: "HTC One M9",
    price: 327,
    shortdesc: "HTC One M9 Android smartphone",
    fullDesc: "HTC One M9 smartphone with 5.00-inch 1080x1920 display powered by 1.5GHz " +
    "processor alongside 3GB RAM and 20-megapixel rear camera",
    stock: 12
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

// console.log(Product.createdItems);
// console.log(meizu);

var cart = new Cart();
cart.addItem(samsung);
cart.addItem(samsung);
cart.addItem(samsung);
cart.addItem(samsung);
cart.addItem(samsung);
cart.addItem(samsung);
cart.removeItem(samsung);
cart.addItem(iphone);
console.log(cart.showCart());
console.log("Total Price", cart.price());
// console.log("Discount", cart.discount(1000,'10%'));
console.log(cart.discount('100', '10%'));

