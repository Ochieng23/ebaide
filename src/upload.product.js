const GetElementById = id => {
  const element = document.getElementById(id);
  return element;
};

const GetSelectedElementValue = (element, id) => {
  return element(id).value;
};

const CreateNewElement = (element) => {
  const newElement = document.createElement(element);
  return newElement;
};

const ErrorMessage = (message) => {
  const errorParagraph = CreateNewElement('p');
  errorParagraph.innerHTML = message;
  return errorParagraph;
};

const ClearErrorMessage = (id) => {
  console.log( GetElementById(id).childElementCount)
};

const AppendErrorMessage = (id, cb, message) => {
  GetElementById(id).prepend(cb (message));
  //ClearErrorMessage(id);
};

// const GetToken = () => {
//   const token = sessionStorage.getItem("login_token");
//   return token;
// };

// const uploadApiUri = "https://service.goebaide.com/api/product/new";

const PingFetchRequest = e => {
  e.preventDefault();
  //product properties
  const title = GetSelectedElementValue(GetElementById, "title-input");
  const description = GetSelectedElementValue(GetElementById, "description-input");
  const price = GetSelectedElementValue(GetElementById, "price-input");
  const quantity = GetSelectedElementValue(GetElementById, "quantity-input");
  const size = GetSelectedElementValue(GetElementById, "size-input");
  const color = GetSelectedElementValue(GetElementById, "color-input");
  const image = GetSelectedElementValue(GetElementById, "image-input");

  if (!title || !description || !price || !quantity || !size || !color || !image){
    window.location.href = "/html/upload.product.html#section_upload_product";
    setTimeout(
      AppendErrorMessage("upload_product", ErrorMessage, "All fields must be provided!"),
    100);
    return;
  }
  ClearErrorMessage("upload_product");
  const productObject = JSON.stringify({
    title,
    description,
    price,
    variation: {
      color,
      size,
      quantity,
    },
    "product-image": image,
  });

  console.log (productObject);
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
