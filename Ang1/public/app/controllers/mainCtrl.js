angular.module('mainController',['authServices'])
    .controller('mainCtrl',function( Auth, $timeout, $location, $rootScope){
   
     var app = this;
    app.loadme = false;
    $rootScope.$on('$routeChangeStart',function(){
        
        
        if(Auth.isLoggedIn()){
            console.log("success:user is logged in");
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
            console.log(data.data.username);
                console.log(data.data.firstname);
                app.username = data.data.username;
                app.useremail =data.data.email;
                app.userPhone = data.data.Phone;
                app.userfirstname = data.data.firstname;
                app.userlastname = data.data.lastname;
                app.userlocation = data.data.location;
                
                app.loadme = true;
        });
        }
        else {
            console.log("failure : user is not logged in");
            app.isLoggedIn = false;
            app.username = '';
            app.loadme= true;
        }
    
        
     });
    
    
    
   this.doLogin = function(loginData){
       app.loading = true;
       app.errorMsg = false;
       //console.log('form submitted');
       
       Auth.login(app.loginData).then(function(data){
           
           if(data.data.success){
               app.loading = false;
               //create success message
               app.successMsg = data.data.message + "...Redirecting" ;
               
               $timeout(function(){
                   $location.path('/about');
                   app.loginData = '';
                   app.successMsg = false;
               }, 2000);
               
           } else {
               app.loading = false;
               //error message
               app.errorMsg = data.data.message;
           }
       });
   };
    
    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
        },2000);
    };
});