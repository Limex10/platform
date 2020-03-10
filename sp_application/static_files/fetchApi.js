async function createAccount(user) {

  try {

    const response = await fetch(
      "http://localhost:8080/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }
    )

    let p = document.querySelector("#create-account-page .jumbotron .text-center .error")
    let p2 = document.querySelector("#create-account-page .jumbotron .container .error")
    let emailForm = document.querySelector("#create-account-page .email")

    switch (response.status) {

      case 500:

        errorMessage = await response.json()
        p.innerText = errorMessage
        p2.innerText = ""
        emailForm.value = ""
        break

      case 400:

        errorMessage = await response.json()
        console.log(errorMessage)
        p.innerText = errorMessage[0]
        p2.innerText = errorMessage[1]
        break

      case 201:

        goToPage("/login")

    }

  } catch (error) {

    goToPage("/error")

  }
}

async function profileLogin(email, password) {

  try {

    const response = await fetch(
      "http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=password&email=" + email + "&password=" + password
    }
    )

    let p = document.querySelector("#login-page .jumbotron .text-center .error")

    switch (response.status) {

      case 500:

        body = await response.json()
        p.innerText = body.error
        break

      case 400:

        goToPage("/error")
        break

      case 200:

        body = await response.json()
        p.innerText = ""

        login(body.access_token)

    }

  } catch (error) {

    goToPage("error-page")

  }
}

async function createMessage(message) {

  try {

    const response = await fetch(
      "http://localhost:8080/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.accessToken
      },
      body: JSON.stringify({ message })
    }
    )

    let p = document.querySelector("#create-message-page .jumbotron .error")

    switch (response.status) {

      case 500:

        errorMessage = await response.json()
        p.innerText = errorMessage
        break

      case 400:

        errorMessage = await response.json()
        p.innerText = errorMessage
        break

      case 201:

        goToPage("/view/message")

    }
  } catch (error) {

    goToPage("/error")

  }
}

async function updateMessage(message) {

  try {

    const response = await fetch(
      "http://localhost:8080/api/message", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.accessToken
      },
      body: JSON.stringify({ message })
    }
    )

    switch (response.status) {

      case 500:

        goToPage("/error")
        break

      case 400:

        errorMessage = await response.json()
        let p = document.querySelector("#update-message-page .jumbotron .error")
        p.innerText = errorMessage
        break

      case 201:

        goToPage("/view/message")

    }
  } catch (error) {

    goToPage("/error")

  }
}

async function deleteMessage() {

  try {

    const response = await fetch(
      "http://localhost:8080/api/message", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.accessToken
      }
    }
    )

    switch (response.status) {

      case 500:

        goToPage("/error")
        break

      case 200:

        let h1 = document.querySelector("#message-page .jumbotron h1")
        h1.innerText = "There is no message!"
        goToPage("/view/message")

    }

  } catch (error) {

    goToPage("/error")

  }
}

async function getMessage() {

  try {

    const response = await fetch(
      "http://localhost:8080/api/message", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + localStorage.accessToken
      }
    }
    )

    let h1 = document.querySelector("#message-page .jumbotron h1")

    switch (response.status) {

      case 500:

        goToPage("/error")
        break

      case 404:

        h1.innerText = "There is no message!"
        break

      case 200:

        message = await response.json()
        h1.innerText = message

    }
  } catch (error) {

    goToPage("/error")

  }
}