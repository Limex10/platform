exports.validateCreateProfile = function(email,password,repeatedpassword){

    var passwordError
    var emailError
    const minimumLength = 8
    const empty = 0
    

    if(password != repeatedpassword){
        passwordError = "Passwords are not equal."
        
    }
    else if(password.length < minimumLength){
        passwordError = "Password to short, minimum 8 characters."
                      
    }
    if(email.length == empty){
        emailError = "Must enter email"
        
    }
    const validationErrors = {
        passwordError,
        emailError
    }    
  
     return validationErrors
    
}

exports.validateUpdateProfileInfo = function(city, country, firstname, lastname, interest1, interest2, interest3, interest4){
    
    const empty = 0
    var cityError
    var countryError
    var firstnameError
    var lastnameError
    var interestError
    if(city.length == empty){
        cityError = "Field can not be empty"
    }else if(city.length > 20){
        cityError = "To long, maximum 20 characters"

    }
    if(country.length == empty){
        countryError = "Field can not be empty"
    }else if(country.length > 20){
        countryError = "To long, maximum 20 characters"
    }
    if(firstname.length == empty){
        firstnameError = "Field can not be empty"
    }else if(firstname.length > 20){
        firstnameError = "To long, maximum 20 characters"

    }
    if(lastname.length == empty){
        lastnameError = "Field can not be empty"
    }else if(lastname.length > 20){
        lastnameError = "To long, maximum 20 characters"

    }



    if(interest1 == interest2 || interest1 == interest3 || interest1 == interest4 || interest2 == interest3 || interest2 == interest4 || interest3 == interest4 ){
            interestError = "Can't pick same interest more than once!"
    }

    const validationErrors = {
        cityError,
        countryError,
        firstnameError,
        lastnameError,
        interestError
    }

    return validationErrors


}
