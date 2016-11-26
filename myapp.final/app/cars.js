var cars = [
    {number: 'АА0001ВР', brand: 'Mercedes Benz', owner: 'Голобородько О. А.', phone: '0671110000', arrival: new Date(2016,10,2,10), exit: ''},
    {number: 'АА0002ВР', brand: 'Audi', owner: 'Малиновский А. А.', phone: '0672220000', arrival: new Date(2016,10,2,11), exit: ''},
    {number: 'АА0003ВР', brand: 'BMW', owner: 'Рыжий О.В.', phone: '0673330000', arrival: new Date(2016,10,2,12), exit: ''},
    {number: 'АА0004ВР', brand: 'Mitsubishi', owner: 'Галка Т. А.', phone: '0674440000', arrival: new Date(2016,10,2,13), exit: ''},
    {number: 'АА0005ВР', brand: 'Mini', owner: 'Колобко О. О.', phone: '0675550000', arrival: new Date(2016,10,2,14), exit: ''},
    {number: 'АА0006ВР', brand: 'Mini-mini', owner: 'Ляцько В. Л.', phone: '0676660000', arrival: new Date(2016,10,2,15), exit: ''},
    {number: 'АА0007ВР', brand: 'Minivagon', owner: 'Рубец О. О.', phone: '0677770000', arrival: new Date(2016,10,2,16), exit: ''}
];

module.exports = {
    getAll: function () {
        return cars;
    },
    
    addCar: function (newCar) {
        cars.push(newCar);
        return newCar;
    },
    
    exitCar: function (carNumber) {
        var date = new Date();
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].number === carNumber) {
                cars[i].exit = date;
                break;
            }
        }
        return date;
    },
    
    removeCar: function (carNumbers) {
        for (var i = 0; i < carNumbers.length; i++) {
            for (var j = 0; j < cars.length; j++) {
                if (cars[j].number === carNumbers[i]) {
                    cars.splice(j, 1);
                    break;
                }
            }
        }
        return carNumbers;
    },
    
    searchCar: function (prop, val, strict) {
        strict = strict || false;
        val = val.toLowerCase();
        var matchCars = [];
        for (var i = 0; i < cars.length; i++) {
            var currentProp  = cars[i][prop].toLowerCase();
            if (!strict) {
                if (currentProp.indexOf(val) === 0) {
                    matchCars.push(cars[i].number);
                }
            } else {
                if (currentProp === val) {
                    matchCars.push(cars[i].number);
                }
            }
        }
        return matchCars;
    }
};