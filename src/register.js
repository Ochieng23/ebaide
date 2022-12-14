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
  ElementById("reg_form").appendChild(para);
};

const successMessage = (parentElement, msg) => {
  const para = newElement("p");
  para.innerHTML = msg;
  return ElementById(parentElement).appendChild(para);
};

/**
 * @TODO clear and replace error messages on every submit with error:
 * @param {*} e 
 * @returns 
 */
const getData = (e) => {
  e.preventDefault();
  const firstname = ElementById("firstname").value;
  const lastname = ElementById("lastname").value;
  const phonenumber = ElementById("phonenumber").value;
  const email = ElementById("email").value;
  const password = ElementById("password").value;
  const repeatPassword = ElementById("repeat-password").value;
  const terms = ElementById("terms_of_service");

  if (ElementById("reg_form").childElementCount > 8) {
    clearingElement (ElementById("reg_form").lastElementChild);
    return;
  };
  if (
    firstname === "" ||
    lastname === "" ||
    phonenumber === "" ||
    email === "" ||
    password === "" ||
    repeatPassword === ""
  ) {
    Error("All fields must be filled!");
    return;
  };

  if (ElementById("reg_form").childElementCount > 8) {
    clearingElement (ElementById("reg_form").lastElementChild);
    return;
  };

  if (password.length < 8) {
    Error("Password must be at least 8 characters");
    return;
  };

   if (ElementById("reg_form").childElementCount > 8) {
    clearingElement (ElementById("reg_form").lastElementChild);
    return;
  };

  if ( password !== repeatPassword) {
    Error ( "Repeat password and password must be similar!" );
    return;
  }
  
  if (ElementById("reg_form").childElementCount > 8) {
    clearingElement (ElementById("reg_form").lastElementChild);
    return;
  };

  if ( !terms_of_service.checked){
    Error("Please read the Terms of Service");
    return;
  };

  if (ElementById("reg_form").childElementCount > 8) {
    clearingElement (ElementById("reg_form").lastElementChild);
    return;
  };

  const body = JSON.stringify({
    firstname,
    lastname,
    phonenumber,
    email,
    password
  });

  fetch("https://service.goebaide.com/api/auth/register", {
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

      if (ElementById("reg_form").childElementCount > 8) {
        clearingElement (ElementById("reg_form").lastElementChild);
        return;
      };
      successMessage ('reg_form', data.message)
      setTimeout(window.location.href = '/index.html', 6000);
    })
    .catch(error => {
      Error(error.error);
      if (ElementById("reg_form").childElementCount > 8) {
        clearingElement (ElementById("reg_form").lastElementChild);
        return;
      };
    });
};

ElementById('reg_form').addEventListener('submit', getData);