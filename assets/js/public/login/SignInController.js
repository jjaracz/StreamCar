angular.module('SignInModule').controller('SignInController', ['$scope', '$http', function($scope, $http){

	$scope.loginForm = {
		loading:false
	}
	$scope.signInSubmitForm = function(){
		$scope.loginForm.loading = true;
		console.log('SUBMIT !!');
		$http.post('/login', {
			email: $scope.loginForm.email,
			pass: $scope.loginForm.password
		})
		.then(function onSuccess(){
			window.location = '/user';
		})
		.catch(function onError(sailsResponse){
			console.log(sailsResponse);
		})
		.finaly(function eitherWay(){
			$scope.loginForm.location = false;
		});
	}
}]);