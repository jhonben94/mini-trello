/**
 * Created by jhonyben on 21/08/17.
 */
app.controller('AgregarTableroCtrl', ['$scope', '$firebaseArray',
    '$location', 'FBURL', function($scope, $firebaseArray, $location, FBURL){
        $scope.agregarTablero = function() {
            var ref = new Firebase(FBURL);
            var tablero = $firebaseArray(ref.child('tableros'));
            tablero.$add({
                nombre_tablero: $scope.tablero.nombre_tablero,
                description: $scope.tablero.descripcion
            });
           // $location.path('/home');
        };

    }]);


