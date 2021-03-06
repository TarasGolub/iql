/**
 * Creates new product
 *
 * @param {object} prod - describes product`s properties (id, name, price, shortDesc, fullDesc, stock)
 * @constructor
 */
function Product(prod) {
    prod = prod || {};

    /**
     * Array to store created products and their IDs
     * Product.productList.ids helps prevent duplicate IDs
     */
    if (!Product.productList) {
        Product.productList = [];
        Product.productList.ids = [];
    }
    /**
     * shows id, name and quantity of each product
     *
     * @returns {string}
     */
    Product.showProducts = function () {
        var str = '';

        if ( isEmpty(Product.productList) ) {
            str += 'You do not have products'
            return str;
        }
        for (var i = 0; i < Product.productList.length; i++) {
            str += 'id: ' + Product.productList[i].id +
                '  name: ' + Product.productList[i].name +
                ' - ' + Product.productList[i].stock + 'pcs\n';
        }
        return str;
    };
    // stores info about the newly created product
    Product.productList.push(this);                                       //// Интересно, хоть и не логично классу продукта хранить список продуктов. 

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
        if ( id && Product.productList.ids.indexOf(id) === -1 ) {
            Product.productList.ids.push(id);
            return id;
        }
        while (true) {
            id = Math.floor(Math.random() * (10000 - 100) + 100);
            if (~Product.productList.ids.indexOf(id)) continue;          //// Прикольный способ, но лучше использовать что-то одно для одинаковой проверки (аналогичная проверка в строке 55)
            Product.productList.ids.push(id);
            return id;
        }
    }

    /**
     * Checks if num is valid number and num >= 0
     * @param num - number to check
     * @param {boolean} [throwError] - optional. Throw error if true, return 0 if false(default)
     * @returns num if it is valid number and num >= 0, 0 or throw Error if num is not a number or num < 0 .
     */
    function setValue(num, throwError) {
        // num = +num;
        if (!isNaN(num) && isFinite(num) && (num >= 0) ) {
            return num;
        }
        if (throwError) {
            console.log('Price is required');                           //// Почему эта функция что-то знает о каком-то price? Она вызывается не только для него.
            throw new Error('Ivalid value:' + num);
        }
        return 0;
    }
}

/**
 * Creates cart object. Allow only one instance of cart.
 *
 * @returns {Cart|*}
 * @constructor
 */
function Cart() {                                                      //// Синглтон. Только нужно ли?
    // return the cart if it has already been created
    if (Cart.instance) {
        return Cart.instance;
    }
    // save in instance newly created object
    Cart.instance = this;
}

/**
 * Adds product to cart
 *
 * @param item - product you want to add to cart
 * @returns {object|boolean} - product has been successfully added to the cart
 * or false if added nothing
 */
Cart.prototype.addItem = function (item) {
    var name = item.name;
    if (!name) {
        console.log('You try add to the cart not existing product');
        return false;
    }

    /**
     * checks the cart already contains the selected product
     * increases quantity if yes
     * set quantity = 1 is not
     */
    if (name in this.orderedItems) {                                 //// Теперь наименование будет уникально. id добавляемого продукта игнорится, если совпало наименование.
        this.orderedItems[name].quantity++;
    } else {
        this.orderedItems[name] = item;
        this.orderedItems[name].quantity = 1;
    }
    return item;
};

/**
 * Removes product from cart
 *
 * @param item - product you want to remove
 * @returns {object|boolean} - product has been successfully removed from the cart
 * or false if removed nothing
 */
Cart.prototype.removeItem = function (item) {
    var name = item.name;

    /**
     * does nothing if cart contains no this item
     * removes item if cart contains 1 pc
     * decreases quantity if cart contains more than 1pc
     */
    if ( !(name in this.orderedItems) ) {
        return false;
    }
    if (this.orderedItems[name].quantity === 1) {                     //// Удаляем тоже по наименованию. В качестве id теперь будет наименование.
        delete this.orderedItems[name];
        return item;
    }
    this.orderedItems[name].quantity--;
    return item;
};

/**
 * Removes all products from the cart
 *
 * @returns {boolean} - false if deleted noting, true if cleaned cart
 */
Cart.prototype.cleanCart = function () {
    if ( isEmpty(this.orderedItems) ) {
        return false;
    }
    this.orderedItems = {};
    return true;
};

/**
 * Sums prices of all products in the cart and subtract discounts if defined
 *
 * @param [discount] - optional object with 2 properties, example: {"abs":"100 usd, "pct":"10%"}
 * where abs {string} with absolute discount, pct {string} percent discount
 * @returns {number} price
 */
Cart.prototype.getPrice = function (discount) {                                                    //// discount лучше хранить в виде свойства корзины. Он имеет к корзине непосредственное отношение.
    var totalPrice = 0;
    // goes to each product in the cart and sum their prices
    for (var key in this.orderedItems) {
        totalPrice += this.orderedItems[key].price * this.orderedItems[key].quantity;
    }
    // if discounts not defined, returns totalPrice
    if (!discount || isEmpty(discount)) {
        return totalPrice;
    }
    // if discounts defined, calculates both absolute and percent discounts and returns totalPrice - discount
    var abs = parseFloat(discount.abs) || 0;
    var pct = (parseFloat(discount.pct) / 100 * totalPrice) || 0;
    totalPrice -= (abs + pct);                                                                     //// А кто проверит что полученная цена не отрицательна?
    return totalPrice;
};

/**
 * outputs id, name and quantity all products in the cart to the console
 *
 * @returns {object} with all products in the cart
 */
Cart.prototype.showCart = function () {
    var str = '';
    for (var key in this.orderedItems) {
        str += 'id: ' + this.orderedItems[key].id + '  name: ' +
            this.orderedItems[key].name + '  quantity: ' + this.orderedItems[key].quantity + 'pcs\n';
    }
    // console.log(str);
    return this.orderedItems;
};

/**
 * creates new element cart
 *
 * @type {Cart}
 */
var cart = new Cart();

/**
 * creates new order
 *
 * @param {object} orderDetails - describes order`s properties (address, delivery type and cost, payment method)
 * @constructor
 */
function Order(orderDetails) {
    orderDetails = orderDetails || {};

    // sets orders properties, or designate a default
    this.addr = orderDetails.addr || 'Address is not defined!';
    this.delType = orderDetails.delType || 'Self pick up';                          //// Слишком сокращенно. Потерялся смысл. "del" выглядит сокращением "delete".
    this.delCost = orderDetails.delCost || 0;
    this.payMethod = orderDetails.payMethod || 'Credit Cart';
    this.orderPrice = 0;

    // object to store added to the order products
    this.orderedItems = {};

    // shows info about  all confirmed orders
    Order.showOrders = function () {
        var str = '';
        if ( !Order.orderList || isEmpty(Order.orderList) ) {
            str += 'You have not orders';
            return str;
        }
        for (var key in Order.orderList) {
            str += 'id:' + Order.orderList[key].id + '\n';
            for (var i = 0, ord = Order.orderList[key].orderedProds; i < ord.length; i++) {
                str += 'prod_id: ' + ord[i].id +
                        ' name: ' + ord[i].name +
                        ' - ' + ord[i].quantity + ' pcs '
                        '  price: ' + ord[i].quantity + ' * ' +  ord[i].price + '\n';
            }
            str += 'Total price: ' + Order.orderList[key].orderPrice + '\n';
        }
        return str;
    }
}
// extends Order with Cart`s methods and properties
extend(Order, Cart);                                                 //// Конечно же, наследование с функцией extend тоже прототипное, но имелось ввиду без нее. При этом алгоритм может быть короче.

/**
 * Confirms order
 * decreases the balance of the stock ordered products
 * outputs info about order to the console
 *
 * @param {object} orderDiscount - optional, info about discount
 * @returns {boolean}
 */
Order.prototype.confirmOrder = function (orderDiscount) {
    // returns false and outputs message to console if no products in the order
    var order = this.showCart();
    if ( isEmpty(order) ) {
        console.log('Your cart is empty.');
        return false;
    }

    // array to store all orders
    Order.orderList = Order.orderList || [];
    this.orderedProds = [];
    Order.orderList.push(this);

    // set index number
    this.id = Order.orderList.length;

    this.orderDiscount = orderDiscount || {};

    /**
     * change quantity of ordered products if it exceeds quantity of products in stock
     * decreases quantity of products in stock
     */
    var str = ''; // str contains ordered product block info of the output
    for (var key in order) {
        this.orderedProds.push(order[key]);
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
    // gets price of the order and saves it
    str += '\nPrice: ' + this.getPrice() + '\n';
    this.orderPrice = this.getPrice();
    // if defined discount, gets price with discount and save it
    if ( !isEmpty(this.orderDiscount) ) {
        str += 'Discount: ' + ( this.orderPrice - this.getPrice(this.orderDiscount) ) + '\n';
        this.orderPrice = this.getPrice(this.orderDiscount);
        str += 'Total Price: ' + this.orderPrice + '\n';
    }

    // confSrt contains full output string about order
    var confSrt = 'Confirmation\n' +
        '\nYour order: №' + this.id +
        '\nAddres: ' + this.addr +
        '\nDelivery: ' + this.delCost + ' usd' +
        '\nDelivery method: ' + this.delType +
        '\n\nYour order:\n' + str +
        '\nPayment method: ' + this.payMethod +'\nThank You!';
    console.log(confSrt);
    // removes all products from order. The order is completed, it will change nothing
    this.cleanCart();
};

/**
 * sets or changes order`s properties
 *
 * @param {object} orderDetails - describes order`s properties (address, delivery type and cost,
 * discount and payment method)
 * @returns {boolean}
 */
Order.prototype.setOrderInfo = function (orderDetails) {
    // does nothing if is not orderDetails or it is empty
    if ( !orderDetails || isEmpty(orderDetails) ) {
        return false;
    }
    if (orderDetails.addr) this.addr = orderDetails.addr;
    if (orderDetails.delType) this.delType = orderDetails.delType;
    if (orderDetails.delCost) this.delCost = orderDetails.delCost;
    if (orderDetails.payMethod) this.payMethod = orderDetails.payMethod;
    return true;
}
var order = new Order();

// extends Child with Parent`s methods and properties
function extend(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

// checks if object is empty
function isEmpty(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}



var meizu_desc = {                                                                            //// Все эти промежуточные переменные не слишком нужны. Можно это подставлять прямо в конструктор, будет понятнее.
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

var meizu = new Product(meizu_desc);                                        //// Абсолютно однородная информация, лучше ее хранить в массиве. Зачем столько переменных в глобальной области видимости?
var iphone = new Product(iphone_desc);
var samsung = new Product(samsung_desc);
var htc = new Product(htc_desc);
var pixel = new Product(pixel_desc);
var lg = new Product(lg_desc);
var asus = new Product(asus_desc);

var orderDesc1 = {
    addr: 'Lomonosova str. 35',
    delType: 'Meest Express',
    delCost: '30 usd',
    payMethod: 'Cash'
}

var orderDesc2 = {
    addr: 'Galitska ave. 315',
    delType: 'DHL',
}

var order1 = new Order(orderDesc1);
var order2 = new Order();

console.log('Products before orders: \n', Product.showProducts());
order1.addItem(meizu);
order1.addItem(samsung);
order1.addItem(iphone);
order1.addItem(lg);
order1.removeItem(lg);

order2.addItem(iphone);
order2.addItem(samsung);
order2.addItem(lg);
order2.addItem(lg);
order2.addItem(lg);
order2.addItem(lg);
order2.addItem(htc);
order2.removeItem(lg);
order2.removeItem(htc);
order2.removeItem(asus);

var discount1 = {
    abs:'100 usd',
    pct: '10%'
}

console.log('order1.showCart():', order1.showCart());
console.log('order1.getPrice():', order1.getPrice());
console.log('order1.getPrice(discount1):', order1.getPrice(discount1));

console.log('order2.showCart():', order2.showCart());
console.log('order2.getPrice():', order2.getPrice());

order2.setOrderInfo(orderDesc2);

order1.confirmOrder(discount1);
order2.confirmOrder();

console.log('Products after orders: \n', Product.showProducts());
console.log('Orders: \n', Order.showOrders());

