var cars = require('./cars.js');

module.exports = function (app) {
    app.get('/car-list', function (req, res) {
        var allCars = cars.getAll();
        res.send(allCars);
    });

    app.post('/add-car', function (req, res) {
        var request = req.body;
        var jsonRes = cars.addCar(request);
        res.send(jsonRes);
    });

    app.post('/exit-car', function (req, res) {
        var request = req.body;
        var jsonRes = cars.exitCar(request.id);
        res.send(jsonRes);
    })
};