

function createAccount(user){

    fetch(
        "http://localhost:8080/api/profile",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
    ).then(function(response){

        return response.json()

    }).then(function(errorMessage){

        let p = document.querySelector("#create-account-page .jumbotron .text-center .error")
        let p2 = document.querySelector("#create-account-page .jumbotron .container .error")
      
        if(errorMessage.includes("Account already exists.")){
            p.innerText = errorMessage
        }
        else{
            p.innerText = errorMessage[0]
            p2.innerText = errorMessage[1]
        }
         

    }).catch(function(error){
     
    })

   return
}

function profileLogin(email,password){

    fetch(
        "http://localhost:8080/api/login",{

            method:"POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"			
            },
            body: "grant_type=password&email="+email+"&password="+password
        }
    ).then(function(response){

        return response.json()

    }).then(function(body){

        let p = document.querySelector("#login-page .jumbotron .text-center .error")

        if (body.error) {
             
            p.innerText = body.error
    
          }else
          {

              p.innerText = ""
            login(body.access_token)

          }
    
    }).catch(function(error){
        
    })
    
  
}

function createMessage(message){

    fetch(
        "http://localhost:8080/api/message",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
				"Authorization": "Bearer"+localStorage.accessToken		
            },
            body: JSON.stringify({message})
        }
    ).then(function(response){

        return response.json()

    }).then(function(errorMessage){

        let p = document.querySelector("#create-message-page .jumbotron .error")
 
         p.innerText = errorMessage
 
     }).catch(function(error){
       
    })
    
  
}

function updateMessage(message){

    fetch(
        "http://localhost:8080/api/message",{
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
				"Authorization": "Bearer"+localStorage.accessToken
                
            },
            body: JSON.stringify({message})
        }
    ).then(function(response){

        return response.json()

    }).then(function(errorMessage){
       let p = document.querySelector("#update-message-page .jumbotron .error")

        p.innerText = errorMessage

    }).catch(function(error){
        
    })
}


function deleteMessage(){


    fetch(
        "http://localhost:8080/api/message",{
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
				"Authorization": "Bearer"+localStorage.accessToken
                
            }
            
        }
    ).then(function(response){
     
        let h1 = document.querySelector("#message-page .jumbotron h1")

        h1.innerText = "There is no message!"

        return response.json()

    }).then(function(errorMessage){
        console.log(errorMessage)
        let p = document.querySelector("#delete-message-page .jumbotron .text-center .error")

        p.innerText = errorMessage

    }).catch(function(error){
     
    })
}


function getMessage(){

    fetch(
        "http://localhost:8080/api/message",{
            headers: { 
                "Content-Type": "application/json",
				"Authorization": "Bearer"+localStorage.accessToken
                
            }
            
        }
    ).then(function(response){
        

        return response.json()

    }).then(function(message){
        let h1 = document.querySelector("#message-page .jumbotron h1")
        if(h1.innerText == "There is no message!"){
            h1.innerText = message
        }
        else{
            
        }
    }).catch(function(error){

    })
}