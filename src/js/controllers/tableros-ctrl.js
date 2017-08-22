/**
 * Created by jhonyben on 15/08/17.
 */
/**
 * Clase encargada de manejar los tableros
 * @class
 */

app.controller('TablerosCtrl',['$scope','$firebaseArray','FBURL',function($scope,$firebaseArray,FBURL) {

    var ref = new Firebase(FBURL);
    $scope.val =ref;
    $scope.tableros = $firebaseArray(ref.child('tableros'));

    $scope.cancelar = function () {
        console.log($scope.val);
        console.log($scope.tableros);
    };
}]);