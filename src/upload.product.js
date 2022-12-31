const GetElementById = id => {
  const element = document.getElementById(id);
  return element;
};

const GetSelectedElementValue = (element, id) => {
  return element(id).value;
};

const GetSelectedElementFile = (element, id) => {};

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
  if (GetElementById(id).childElementCount > 9){
    GetElementById(id).removeChild(GetElementById(id).firstElementChild)
  };
};

const AppendErrorMessage = (id, cb, message) => {
  ClearErrorMessage(id);
  GetElementById(id).prepend(cb (message));
};

const GetToken = () => {
  const token = sessionStorage.getItem("login_token");
  return token;
};

const uploadApiUri = "https://service.goebaide.com/api/product/new";

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
  };

  ClearErrorMessage("upload_product");

  if ( price < 1){
    AppendErrorMessage("upload_product", ErrorMessage, "Price can not be 0!");
    return;
  };

  ClearErrorMessage("upload_product");

  if ( quantity < 1){
    AppendErrorMessage("upload_product", ErrorMessage, "Quantity can not be 0 !");
    return;
  };

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
    product_image: image,
  });

  console.log (productObject);
  fetch(uploadApiUri, {
    method: "POST",
    body: productObject,
    headers: {
      Authorization: "Bearer " + GetToken(),
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error.split (" ").includes("jwt")) {
        window.location.href = "/index.html#login-form-container";
        return;
      }
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};

GetElementById("upload_product").addEventListener("submit", PingFetchRequest);
