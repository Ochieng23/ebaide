
const ElementById = (id) =>{
 const element = document.getElementById(id);
 return element;
};

ElementById('reg_form').addEventListener ('submit', getData);

const getData = () => {
   const firstname = ElementById('firstname').value;
   const lastname = ElementById('lastname').value;
   const phonenumber = ElementById('phonenumber').value;
   const email = ElementById('email').value;
   const password= ElementById('password').value;
   console.log ({
    firstname,
    lastname,
    phonenumber,
    email,
    password
   })
};

const register = () => {

};


