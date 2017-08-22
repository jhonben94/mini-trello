/**
 * Created by jhonyben on 15/08/17.
 */

var app = angular.module('miniTrello', [
    'ngRoute',//modulo utilizan para el ruteo
    'firebase' // firebase modules

]);

/**
 * Enrutador de la aplicación
 */
// configure our routes
app.config(
    function($routeProvider){


    $routeProvider

        .when('/home', {
            templateUrl: 'partials/home-partial.html'

        })
        .when('/tableros', {
            templateUrl: 'partials/tableros-partials.html',
            controller: 'TablerosCtrl'
        })
        .when('/agregar-tablero', {
            templateUrl: 'partials/agregar-tablero-partial.html',
            controller: 'AgregarTableroCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

app.constant("FBURL",
    "https://mini-trello.firebaseio.com/" //Use the URL of your project here
);