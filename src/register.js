
const ElementById = (id) =>{
 const element = document.getElementById(id);
 return element;
};

const getData = (e) => {
    e.preventDefault();
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

ElementById('reg_form').addEventListener ('submit', getData);


const register = () => {

};


