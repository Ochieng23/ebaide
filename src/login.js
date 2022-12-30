const newElement = (tag) => {
    const newElement = document.createElement(tag);
    return newElement;
  };
  const clearingElement = (child) => {
    return child.remove()
  };
  //Get Element
  const ElementById = id => {
    const element = document.getElementById(id);
    return element;
  };
  //Error handling
  const Error = msg => {
    const para = newElement("p");
    para.innerHTML = msg;
    ElementById("login_form").appendChild(para);
  };
  
  const getData = (e) => {
    e.preventDefault();
    const email = ElementById("email").value;
    const password = ElementById("password").value;
    console.log(ElementById("login_form").childElementCount)
    if (ElementById("login_form").childElementCount > 9) {
      clearingElement (ElementById("login_form").lastElementChild);
      return;
    };
    if (email === "" || password === "") {
      Error("All fields must be filled!");
      return;
    };
    if (ElementById("login_form").childElementCount > 9) {
      clearingElement (ElementById("login_form").lastElementChild);
      return;
    };
  
    const body = JSON.stringify({
      email,
      password
    });
  
    fetch("https://service.goebaide.com/api/auth/login", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        //closeRegistrationForm();
        if (data.status === "error") {
          Error (data.error);
          return;
        };
  
        if (ElementById("login_form").childElementCount > 9) {
          clearingElement (ElementById("login_form").lastElementChild);
          return;
        };
        //console.log(data.token);
        sessionStorage.setItem("login_token", data.token);
        setTimeout(window.location.href = '/index.html#packages', 6000);
      })
      .catch(error => {
        Error(error.error);
        if (ElementById("login_form").childElementCount > 9) {
          clearingElement (ElementById("login_form").lastElementChild);
          return;
        };
      });
  };
  
  ElementById('login_form').addEventListener('submit', getData);