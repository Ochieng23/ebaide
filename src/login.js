const newElement = tag => {
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
  
  const successMessage = (parentElement, msg) => {
    const para = newElement("p");
    para.innerHTML = msg;
    return ElementById(parentElement).appendChild(para);
  };

  const getData = (e) => {
    e.preventDefault();
    const email = ElementById("email").value;
    const password = ElementById("password").value;
  
    // if (ElementById("login_form").childElementCount > 8) {
    //   clearingElement (ElementById("login_form").lastElementChild);
    //   return;
    // };
    if (email === "" || password === "") {
      Error("All fields must be filled!");
      return;
    };
  
    // if (ElementById("login_form").childElementCount > 8) {
    //   clearingElement (ElementById("login_form").lastElementChild);
    //   return;
    // };
    //  if (ElementById("login_form").childElementCount > 8) {
    //   clearingElement (ElementById("login_form").lastElementChild);
    //   return;
    // };
  
    // if (ElementById("login_form").childElementCount > 8) {
    //   clearingElement (ElementById("login_form").lastElementChild);
    //   return;
    // };
  
    // if (ElementById("login_form").childElementCount > 8) {
    //   clearingElement (ElementById("login_form").lastElementChild);
    //   return;
    // };
  
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
          const errorMessage = data.error.split(" ")[2];
          const isemail= errorMessage.split("").includes ('@');
          
          if (isemail) {
            Error (errorMessage + " already registered");
            return;
          }
          Error (data.error);
          return;
        };
  
        // if (ElementById("login_form").childElementCount > 8) {
        //   clearingElement (ElementById("login_form").lastElementChild);
        //   return;
        // };
        successMessage ('login_form', data.message)
        setTimeout(window.location.href = '/index.html', 6000);
      })
      .catch(error => {
        Error(error.error);
        // if (ElementById("login_form").childElementCount > 8) {
        //   clearingElement (ElementById("login_form").lastElementChild);
        //   return;
        // };
      });
  };
  
  ElementById('login_form').addEventListener('submit', getData);