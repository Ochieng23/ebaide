const newElement = tag => {
  const newElement = document.createElement(tag);
  return newElement;
};
const clearingElement = child => {
  return child.remove();
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

const clearingContent = (identifer, cb) => {
  cb(identifer).innerHTML = "";
};

const onSuccessMessage = (cb1, cb2, tag, parent, message) => {
  const element = cb1(tag);
  AddClass(element, "onSuccessMessage");
  element.innerHTML = `
    <span class="close-msg-btn">&times;</span>
    <span class="msg-span">${message}</span>
  `;
  const parentElement = cb2(parent);
  AddClass(parentElement, "onSuccess");
  parentElement.appendChild(element);

  const closeMsgBtn = document.querySelector(".close-msg-btn");
  closeMsgBtn.addEventListener("click", e => {
    e.preventDefault();
    clearingElement(ElementById("login-form-container"));
  });
};

const getData = e => {
  e.preventDefault();
  const email = ElementById("email").value;
  const password = ElementById("password").value;
  if (ElementById("login_form").childElementCount > 9) {
    clearingElement(ElementById("login_form").lastElementChild);
    return;
  }
  if (email === "" || password === "") {
    Error("All fields must be filled!");
    return;
  }
  if (ElementById("login_form").childElementCount > 9) {
    clearingElement(ElementById("login_form").lastElementChild);
    return;
  }

  const body = JSON.stringify({
    email,
    password
  });
  /**
     * @TOBERETURNED
     * LOGIN LIVE URI = https://service.goebaide.com/api/auth/login
     */
  fetch("http://localhost:3000/api/auth/login", {
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
        Error(data.error);
        return;
      }

      if (ElementById("login_form").childElementCount > 9) {
        clearingElement(ElementById("login_form").lastElementChild);
        return;
      }
      //console.log(data.token);
      sessionStorage.setItem("login_token", data.token);
      clearingContent("login-form-container", ElementById);
      onSuccessMessage(
        newElement,
        ElementById,
        "p",
        "login-form-container",
        "You have successfully logged in"
      );
      setTimeout((window.location.href = "/index.html#packages"), 10500);
    })
    .catch(error => {
      Error(error.error);
      if (ElementById("login_form").childElementCount > 9) {
        clearingElement(ElementById("login_form").lastElementChild);
        return;
      }
    });
};

ElementById("login_form").addEventListener("submit", getData);
