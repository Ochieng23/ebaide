const newElement = (tag) => {
 const newElement = document.createElement(tag);
 return newElement;
};
//Get Element
const ElementById = (id) =>{
    const element = document.getElementById(id);
    return element;
   };
//Error handling
const Error = (msg) => {
    const para = newElement('p');
    para.innerHTML = msg;
    ElementById('reg_form').appendChild(para);
};

const getData = (e) => {
    e.preventDefault();
   const firstname = ElementById('firstname').value;
   const lastname = ElementById('lastname').value;
   const phonenumber = ElementById('phonenumber').value;
   const email = ElementById('email').value;
   const password= ElementById('password').value;
   
   if(firstname === '' && lastname === '' && phonenumber === '' && email === '' && password === '') {
        Error ("All fields must be filled!");
        return;
   };
   if ( password.length < 8 ) {
     Error ("Password must be at least 8 characters");
     return;
   };
};

ElementById('reg_form').addEventListener ('submit', getData);


const register = () => {

};


