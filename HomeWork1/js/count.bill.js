/**
 * Created by taraska on 10/5/2016.
 */
$(document).ready(function(){
    $('.input_order').change(function (e) {
        var target = e.target;
        var quantity = target.value;
        var price = target.parentNode.nextElementSibling;
        var cost =  parseInt(price.innerHTML);

        price.nextElementSibling.innerHTML = quantity*cost + ',00 грн';

        var sums = document.getElementsByClassName('sum');
        var sum = 0;
        for (var i = 0; i < sums.length; i++) {
            sum += parseInt(sums[i].innerHTML);
        }


        var sumTd = document.getElementsByClassName('sum_order')[0];
        var width = getComputedStyle(sumTd).width;
        console.log(width);
        sumTd.style.width = width;
        sumTd.innerHTML = sum + ',00 грн';

        // console.log(cost, quantity, sum);
    });
});