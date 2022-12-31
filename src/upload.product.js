const GetElementById = id => {
  const element = document.getElementById(id)
  return element;
};

const GetSelectedElementValue = (element, id) => {
  return element(id).value;
};


// const GetToken = () => {
//   const token = sessionStorage.getItem("login_token");
//   return token;
// };

// const uploadApiUri = "https://service.goebaide.com/api/product/new";

const PingFetchRequest = (e) => {
  e.preventDefault();
  const productObject = JSON.stringify({
  
  
  "product-image": GetElementValue(GetElementById, "image-input")
});

  fetch(uploadApiUri, {
    method: "POST",
    body: productObject,
    headers: {
      "Authorization": "Bearer "+GetToken(),
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if ( data.error === 'jwt expired'){
        window.location.href = '/index.html#login-form-container';
        return;
      };
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

GetElementById("upload_product").addEventListener("submit", 
(e) => {
    e.preventDefault();
   // GetElementById("title-input")
   console.log(title);
});
