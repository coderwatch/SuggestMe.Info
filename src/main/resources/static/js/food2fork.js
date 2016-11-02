// myApp defined in google-maps.js (should be loaded earlier than this file)
myApp.controller("RecipeCtrl", function($scope) {
    $scope.getRecipe = function() {
        $.ajax({
            url: "/recipe/" + "chicken" + "/",
            type:'GET',
            dataType: "json",
            success: function(jsonResp) {
                $scope.recipe = jsonResp.recipe;
                $scope.ingredients = jsonResp.recipe.ingredients;
                $scope.$apply();
            }
        });
    }
});
