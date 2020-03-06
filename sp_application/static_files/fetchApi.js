

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

        console.log(response)
    }).catch(function(error){
        console.log(error)
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

        login(body.access_token)
        console.log("yeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeett")
        console.log(body.access_token.id)

    }).catch(function(error){
        console.log(error)
    })
    return
  
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

        

    }).catch(function(error){
       
    })
    return
  
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

        let h1 = document.querySelector("#update-message-page .jumbotron .error")

        h1.innerText = errorMessage

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
        console.log(response)
        let h1 = document.querySelector("#message-page .jumbotron h1")

        h1.innerText = "There is no message!"

    }).catch(function(error){
        console.log(error)
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
        
        console.log(response)
        return response.json()

    }).then(function(message){
        let h1 = document.querySelector("#message-page .jumbotron h1")
        if(h1.innerText == "There is no message!"){
            h1.innerText = message
        }
        

    }).catch(function(error){
        console.log(error)
    })
}