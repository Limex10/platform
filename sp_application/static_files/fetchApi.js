



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


