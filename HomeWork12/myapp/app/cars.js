var cars = [
    {number: 'АА0001ВР', brand: 'Mercedes Benz', owner: 'Голобородько О. А.', phone: '0671110000', arrival: new Date(2016,10,2,10), exit: ''},
    {number: 'АА0002ВР', brand: 'Audi', owner: 'Малиновский А. А.', phone: '0672220000', arrival: new Date(2016,10,2,11), exit: ''},
    {number: 'АА0003ВР', brand: 'BMW', owner: 'Рыжий О.В.', phone: '0673330000', arrival: new Date(2016,10,2,12), exit: ''},
    {number: 'АА0004ВР', brand: 'Nissan', owner: 'Галка Т. А.', phone: '0674440000', arrival: new Date(2016,10,2,13), exit: ''},
    {number: 'АА0005ВР', brand: 'Porsche', owner: 'Колобко О. О.', phone: '0675550000', arrival: new Date(2016,10,2,14), exit: ''}
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
    removeCar: function () {
        
    },
    searchCar: function () {
        
    }
};