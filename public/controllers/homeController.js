angular
    .module("noteApp")
    .controller("homeController", function ($scope, $sce) {
        $scope.test = $sce.trustAsHtml('<h1 style="text-align:center">Home Content</h1>');
        $scope.testing = "testing";
    })