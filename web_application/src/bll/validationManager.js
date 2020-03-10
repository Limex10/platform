module.exports = function ({ }) {

  return {

    validateProfile: function (email, password, repeatedpassword) {

      var passwordError
      var emailError
      const minimumLength = 8
      const empty = 0

      if (password != repeatedpassword) {

        passwordError = "Passwords are not equal."

      }
      else if (password.length < minimumLength) {

        passwordError = "Password to short, minimum 8 characters."

      }

      if (!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

        emailError = "Invalid characters for email."

      }
      else if (email.length == empty) {

        emailError = "Must enter email"

      }

      const validationErrors = [

        emailError,
        passwordError

      ]

      return validationErrors

    }
    ,

    validateUpdateProfileInfo: function (city, country, firstname, lastname, interest1, interest2, interest3, interest4) {

      const empty = 0
      var cityError
      var countryError
      var firstnameError
      var lastnameError
      var interestError

      if (city.length == empty) {

        cityError = "Field can not be empty"

      }
      else if (city.length > 20) {

        cityError = "To long, maximum 20 characters"

      }

      if (country.length == empty) {

        countryError = "Field can not be empty"

      }
      else if (country.length > 20) {

        countryError = "To long, maximum 20 characters"

      }

      if (firstname.length == empty) {

        firstnameError = "Field can not be empty"

      }
      else if (firstname.length > 20) {

        firstnameError = "To long, maximum 20 characters"

      }

      if (lastname.length == empty) {

        lastnameError = "Field can not be empty"

      }
      else if (lastname.length > 20) {

        lastnameError = "To long, maximum 20 characters"

      }

      if (interest1 == interest2 || interest1 == interest3 || interest1 == interest4 || interest2 == interest3 || interest2 == interest4 || interest3 == interest4) {

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
    ,

    validateMessage: function (message) {

      const empty = 0
      var messageError

      if (message.length == empty) {

        messageError = "Field can not be empty."

      }
      else if (message.length > 45) {

        messageError = "To long, maximum 45 characters"

      }
      
      const validationErrors = [

          messageError

        ]

      return validationErrors

    }
    ,

    validateInterest: function (interest) {

      const empty = 0
      var interestError

      if (interest.length == empty) {

        interestError = "Field can not be empty."

      }
      else if (interest.length > 20) {

        interestError = "To long, maximum 20 characters"

      }

      const validationErrors = {

        interestError
        
      }

      return validationErrors

    }
  }
}