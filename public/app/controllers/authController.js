angular.module('authCtrl', ['satellizer'])
  .controller('authController', function($location, $auth){

    var vm = this;

    vm.login = function(){
			$auth.login({email: vm.user.email, password: vm.user.password})
				.then(function(res){
					if(!res.data.token){
					   	vm.error = true;
              vm.errorMessage = res.data.message;
					}else{
						$location.path('/home');
					}
				})
				.catch(function(data){
					vm.error = true;
					vm.errorMessage = 'Failed to login, please try again';
				});
		};

    //sign up function
		vm.signup = function(){
			if(!vm.user.name || !vm.user.email || !vm.user.password){
				return;
			}
			$auth.signup({name: vm.user.name, email: vm.user.email, password: vm.user.password})
				.then(function(res){
					if(!res.data.token){
						vm.error = true;
						vm.errorMessage = res.data.message;
					}else{
						$auth.setToken(res.data.token);
						$location.path('/portfolio');
					}
				})
				.catch(function(){
            vm.error = true;
            vm.errorMessage = 'Failed to sign up, please try again';
        });
		};//end signup function

  });
