angular.module('sessionService', [])

.factory('Session', function($http) {
	var sessionFactory = {};

	sessionFactory.create = function(sessionData){
		return $http.post('/createSession', sessionData);
	}
})