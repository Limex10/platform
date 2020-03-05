document.addEventListener("DOMContentLoaded",function(){
    
   

    changeToPage(location.pathname)
    
    
	if(localStorage.accessToken){
        
        login(localStorage.accessToken)
      
	}else{
		logout()
	}

document.body.addEventListener("click", function(event){
    if(event.target.tagName == "A"){
        event.preventDefault()
        const url = event.target.getAttribute("href")
        goToPage(url)
    }
})

document.querySelector("#create-account-page form").addEventListener("submit", function(event){
    event.preventDefault()
    
    const email = document.querySelector("#create-account-page .email").value
    const password = document.querySelector("#create-account-page .password").value
    const repeatedPassword = document.querySelector("#create-account-page .repeatedPassword").value
    
    const user = {
        email,
        password,
        repeatedPassword
    }
    createAccount(user)    
    
  
})

document.querySelector("#login-page form").addEventListener("submit", function(event){
    event.preventDefault()

   
    
    const email = document.querySelector("#login-page .email").value
    const password = document.querySelector("#login-page .password").value
    
    profileLogin(email,password)

  
})

document.querySelector("#create-message-page form").addEventListener("submit", function(event){
    event.preventDefault()

    const message = document.querySelector("#create-message-page .message").value
    
    
    
    
    createMessage(message)

  
})

})

window.addEventListener("popstate",function(event){
    const url = location.pathname
    changeToPage(url)
})

function goToPage(url){

    changeToPage(url)
    history.pushState({},"", url)
}

function changeToPage(url){

    const currentPageDiv = document.getElementsByClassName("current-page")[0]
	if(currentPageDiv){
		currentPageDiv.classList.remove("current-page")
	}
	
	// TODO: Optimally this information can be put in an array instead of having a long list of if-else if statements.
	// TODO: Factor out common code in all branches.
	if(url == "/"){
        document.getElementById("home-page").classList.add("current-page")
        
	}else if(url == "/profile"){
        document.getElementById("create-account-page").classList.add("current-page")
        
	}else if(url == "/login"){
		document.getElementById("login-page").classList.add("current-page")
		
	}else if(url == "/create/message"){
        document.getElementById("create-message-page").classList.add("current-page")
    }else if(new RegExp("^/view/message/[0-9]+$").test(url)){

		document.getElementById("message-page").classList.add("current-page")
        const id = url.split("/")[2]
        
		
	}else if(new RegExp("^/update/message/[0-9]+$").test(url) ){
        document.getElementById("update-message-page").classList.add("current-page")
        
	}else if(new RegExp("^/delete/message/[0-9]+$").test(url)){

        document.getElementById("delete-message-page").classList.add("current-page")
        
	}else{
		document.getElementById("error-page").classList.add("current-page")
	}
	


}



function login(accessToken){
	localStorage.accessToken = accessToken
	document.body.classList.remove("isLoggedOut") /
	document.body.classList.add("isLoggedIn")
}

function logout(){
	localStorage.accessToken = ""
	document.body.classList.remove("isLoggedIn")
	document.body.classList.add("isLoggedOut")
}