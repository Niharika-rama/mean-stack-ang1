angular.module('userControllers',['userServices'])
    .controller('regCtrl',function($http,$location,$timeout,User){
    var app = this;
   this.regUser = function(regData){
       app.loading = true;
       app.errorMsg = false;
       //console.log('form submitted');
       
       User.create(app.regData).then(function(data){
           
           if(data.data.success){
              
               app.loading = false;
               //create success message
               app.successMsg = data.data.message +"...Rediredting";
               $timeout(function(){
                   $location.path('/');
               },2000);
               
           }else{
               app.loading = false;
               //error message
               app.errorMsg = data.data.message;
           }
       });
   };
});


