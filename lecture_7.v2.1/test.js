/**
 * Created by taraska on 10/27/2016.
 */

function A() {

    this.b = (function () {return function () {
            return A.prototype.aa++;
        }
    })();


}
A.prototype.aa = 0;
// A.prototype.a = 0;
var a = new A();
console.log(a.b(),a.b(),a.b());

var b = new A();
console.log(b.b(),b.b(),b.b());