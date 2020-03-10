document.addEventListener("DOMContentLoaded", function () {

  changeToPage(location.pathname)

  if (localStorage.accessToken) {

    login(localStorage.accessToken)

  } else {

    logout()

  }

  document.body.addEventListener("click", function (event) {

    if (event.target.tagName == "A") {

      event.preventDefault()

      const url = event.target.getAttribute("href")

      goToPage(url)

    }
  })

  document.querySelector("#create-account-page form").addEventListener("submit", function (event) {

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

  document.querySelector("#login-page form").addEventListener("submit", function (event) {

    event.preventDefault()

    const email = document.querySelector("#login-page .email").value
    const password = document.querySelector("#login-page .password").value

    profileLogin(email, password)

  })

  document.querySelector("#create-message-page form").addEventListener("submit", function (event) {

    event.preventDefault()

    const message = document.querySelector("#create-message-page .message").value

    createMessage(message)

  })

  document.querySelector("#update-message-page form").addEventListener("submit", function (event) {

    event.preventDefault()

    const message = document.querySelector("#update-message-page .message").value

    updateMessage(message)

  })

  document.querySelector("#delete-message-page form").addEventListener("submit", function (event) {

    event.preventDefault()

    deleteMessage()

  })
})

window.addEventListener("popstate", function (event) {

  const url = location.pathname

  changeToPage(url)

})

function goToPage(url) {

  changeToPage(url)

  history.pushState({}, "", url)

}

function changeToPage(url) {

  const currentPageDiv = document.getElementsByClassName("current-page")[0]

  if (currentPageDiv) {

    currentPageDiv.classList.remove("current-page")

  }

  pages = [

    "home-page",
    "create-account-page",
    "home-page",
    "login-page",
    "create-message-page",
    "message-page",
    "update-message-page",
    "delete-message-page",
    "error-page"

  ]

  urls = [

    "/",
    "/profile",
    "/logout",
    "/login",
    "/create/message",
    "/view/message",
    "/update/message",
    "/delete/message",
    "/error"

  ]

  for (i = 0; i < urls.length; i += 1) {

    if (url == urls[i]) {

      if (url == "/logout") {

        logout()

      }
      else if (url == "/view/message") {

        getMessage()

      }

      document.getElementById(pages[i]).classList.add("current-page")

    }
  }
}

function login(accessToken) {

  localStorage.accessToken = accessToken
  document.body.classList.remove("isLoggedOut")
  document.body.classList.add("isLoggedIn")

}

function logout() {

  localStorage.accessToken = ""
  document.body.classList.remove("isLoggedIn")
  document.body.classList.add("isLoggedOut")

}