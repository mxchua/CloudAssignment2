// Firebase Script


// Mainpage angular controller
myApp.controller('loginPage',function ($scope, $firebase, $rootScope, $location) {
    // Grandfather Reference
    var ref = new Firebase("https://assignment2.firebaseio.com");
    
    // General Reference
    var refUser = new Firebase("https://assignment2.firebaseio.com/User");
    var syncUser = $firebase(refUser);
    var syncObjectUser = syncUser.$asObject();
    
    //login via google
    // $scope.loginGoogle = function(){
    //     console.log("hello");
    //       ref.authWithOAuthPopup("google", function(error, authData) {
    //       if (error) {
    //         console.log("hello2");
    //         console.log(authData.google.displayName);
    //         console.log("Login Failed!", error);
    //       } else {
    //          $location.href("/home");
    //          console.log(authData.google.displayName);
    //         console.log("Authenticated successfully with daniel:", authData);
           
    //       }
    //     });
            
    // }
    
    
    
    //method for creating user
    $scope.checkUser = function(){
       // adding new user to databasev
       var username = $('input[name=username]').val();
       var password = $('input[name=password]').val();
    
       var syncArrayUser = syncUser.$asArray();
             
        //check if user's input is valid
        if(username==="" && password===""){
             $('.emptyUsername').css('display', 'block');
             $('.emptyPassword').css('display', 'block');
             return;
        }else{
                
                
               //checking if firebase already has this username
               for(var i = 0; i<syncArrayUser.length; i++ ){
                   //printing out a single object of the table
                    // console.log(syncArrayUser[i]);
                    
                    console.log(syncArrayUser[i].$id);
                    
                    if(username === syncArrayUser[i].$id && password === syncArrayUser[i].password){
                        if(syncArrayUser[i].role === "student"){
                            $rootScope.userLoggedin = username;
                            $location.path("/stuHome");
                        }else{
                            $rootScope.userLoggedin = username;
                            $location.path("/home");
                        }
                    }else{
              
                        $('.incorrectInput').css('display', 'block');
                    }
                 }    
                
        }
        
        if(username===""){
            $('.emptyUsername').css('display', 'block');
            return;
        }else{
             $('.emptyUsername').css('display', 'none');
             return;
        }
        
        if(password===""){
            $('.emptyPassword').css('display', 'block');
            return;
        }else{
            $('.emptyPassword').css('display', 'none');
            return;
        }
        

    } //end of checking user method
    
});



myApp.controller('registerPage', ['$scope', '$firebase', '$rootScope', '$location', '$timeout', function ($scope, $firebase, $rootScope, $location, $timeout){
      // Grandfather Reference
    var ref = new Firebase("https://assignment2.firebaseio.com");
    
    // General Reference
    var refUser = new Firebase("https://assignment2.firebaseio.com/User");
    var syncUser = $firebase(refUser);
    var syncObjectUser = syncUser.$asObject();
    
    var syncArrayUser = syncUser.$asArray();

    
    
    //method for creating user
    $scope.createUser = function(){
        
      $('.duplicatedUser').css('display', 'none');
      $('.emptyUsername').css('display', 'none');
      $('.emptyPassword').css('display', 'none');
        
       //check for duplicate names
       var isDuplicate = 0;
        
       // adding new user to databasev
       var username = $('input[name=username]').val();
       var password = $('input[name=password]').val();
       var password2 = $('input[name=password2]').val();

        //check if user's input is valid
        
        if(username==="" && password===""){
             $('.emptyUsername').css('display', 'block');
             $('.emptyPassword').css('display', 'block');
             return;
        }
        
        if(password!=password2){
            $('.diffPassword').css('display', 'block');
            return;
        }else{
             $('.diffPassword').css('display', 'none');
             
             
            //  console.log(syncArrayUser.length);
            //checking if firebase already has this username
            for(var i = 0; i<syncArrayUser.length; i++ ){
                if(username === syncArrayUser[i].$id ){ 
                   
                    $('.duplicatedUser').css('display', 'block');
                    isDuplicate = isDuplicate + 1;
                }
            }
            
            if(isDuplicate === 0){
                 $('.createSuccess').css('display', 'block');
               //if user's input is valid, insert it into firebase
                toAdd = {}; 
                toAdd[username] ={
                    password: password,
                    role: "student"
                } ; 
                refUser.update(toAdd);
                
                var promise = $timeout(function(){
                    $location.path("/login");
                }, 3000)
           
            }
       
        }
        
        if(username===""){
            $('.emptyUsername').css('display', 'block');
            return;
        }
        if(password===""){
            $('.emptyPassword').css('display', 'block');
            return;
        }
  
        
    } //end of createUser method
    
    
     


}]);
