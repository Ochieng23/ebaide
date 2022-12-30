const GetElementById = id => {
  return document.getElementById(id);
};

const GetElementValue = (elem, id) => {
  return elem(id).value;
};
// if (
//   GetElementValue(GetElementById, "title-input") === "" ||
//   GetElementValue(GetElementById, "description-input") === "" ||
//   GetElementValue(GetElementById, "price-input") === "" ||
//   GetElementValue(GetElementById, "color-input") === "" ||
//   GetElementValue(GetElementById, "size-input") === "" ||
//   GetElementValue(GetElementById, "quantity-input") === "" ||
//   GetElementValue(GetElementById, "image-input") === ""
// ) {
//   console.log("GetElementValue");
//   return;
// };

const productObject = JSON.stringify({
  title: GetElementValue(GetElementById, "title-input"),
  description: GetElementValue(GetElementById, "description-input"),
  price: GetElementValue(GetElementById, "price-input"),
  variation: {
    color: GetElementValue(GetElementById, "color-input"),
    size: GetElementValue(GetElementById, "size-input"),
    quantity: GetElementValue(GetElementById, "quantity-input")
  },
  "product-image": GetElementValue(GetElementById, "image-input")
});

const GetToken = () => {
  const token = sessionStorage.getItem("login_token");
  return token;
};

const uploadApiUri = "https://service.goebaide.com/api/product/new";

const PingFetchRequest = (e) => {
  e.preventDefault();
  fetch(uploadApiUri, {
    method: "POST",
    body: productObject,
    headers: {
      "Authorization": "Bearer "+GetToken(),
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

GetElementById("upload_product").addEventListener("submit", 
PingFetchRequest);
