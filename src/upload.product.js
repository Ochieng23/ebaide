const GetElementById = id => {
  const element = document.getElementById(id);
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

const PingFetchRequest = e => {
  e.preventDefault();
  const productObject = JSON.stringify({
    title: GetSelectedElementValue(GetElementById, "title-input"),
    description: GetSelectedElementValue(GetElementById, "description-input"),
    price: GetSelectedElementValue(GetElementById, "price-input"),
    variation: {
      color: GetSelectedElementValue(GetElementById, "color-input"),
      size: GetSelectedElementValue(GetElementById, "size-input"),
      quantity: GetSelectedElementValue(GetElementById, "quantity-input")
    },
    "product-image": GetSelectedElementValue(GetElementById, "image-input")
  });
  console.log(productObject);
  // fetch(uploadApiUri, {
  //   method: "POST",
  //   body: productObject,
  //   headers: {
  //     Authorization: "Bearer " + GetToken(),
  //     "Content-Type": "application/json"
  //   }
  // })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(data => {
  //     if (data.error === "jwt expired") {
  //       window.location.href = "/index.html#login-form-container";
  //       return;
  //     }
  //     console.log(data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};

GetElementById("upload_product").addEventListener("submit", PingFetchRequest);
