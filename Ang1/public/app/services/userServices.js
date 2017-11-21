angular.module('userServices',[])
    .factory('User',function($http){
    userFactory = {};
    
    //custom function
    //User.create(regData)
    userFactory.create = function(regData){
        return $http.post('/api/users',regData);
    }
    return userFactory;
});