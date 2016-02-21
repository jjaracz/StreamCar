angular.module('SignInModule').controller('SignInController', ['$scope', '$http', function($scope, $http){

	$scope.loginForm = {
		loading:false
	}
	$scope.signInSubmitForm = function(){
		$scope.loginForm.loading = true;
		$http.put('/login', {
			email: $scope.loginForm.email,
			pass: $scope.loginForm.password
		})
		.then(function onSuccess(){
			window.location = '/user';
		})
		.catch(function onError(sailsResponse){
			if(sailsResponse.status === '400' || '404' ){
				 Materialize.toast('Niepoprawny email/hasło', 3000, 'red darken-4');
				 $scope.loginForm.loading = false;
				 return;
			}
			Materialize.toast('Niespodziewany błąd spróbuj później', 3000, 'red darken-4');
			$scope.loginForm.loading = false;
			return;
		})
		.finally(function eitherWay(){
			$scope.loginForm.loading = false;
		});
	}
}]);
