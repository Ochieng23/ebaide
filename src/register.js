const newElement = (tag) => {
 const newElement = document.createElement(tag);
 return newElement;
};
//Get Element
const ElementById = (id) =>{
    const element = document.getElementById(id);
    return element;
   };

   //Closing form on submission
const closeRegistrationForm = () => {
    ElementById('reg_form').style.display ='none';
};
//Error handling
const Error = (msg) => {
    const para = newElement('p');
    para.innerHTML = msg;
    ElementById('reg_form').appendChild(para);
};

/**
 * @TODO clear and replace error messages on every submit with error:
 * @param {*} e 
 * @returns 
 */
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

   const body = JSON.stringify( {
    firstname,
    lastname,
    phonenumber,
    email,
    password
   });
   
   fetch ( 'http://service.goebaide.com/api/auth/register', {
    method: 'POST',
    body: body,
    headers: {
        'Content-Type': 'application/json',
    },
   })
   .then((response) =>{
     return response.json ();
   })
   .then((data) => {
    closeRegistrationForm();
    const para = newElement('p');
    para.innerHTML = data.message;
    document.body.appendChild(para);
   })
   .catch((error) => {
    const para = newElement('p');
    para.innerHTML = error.error;
    document.body.appendChild(para);
   });
};

ElementById('reg_form').addEventListener ('submit', getData);



