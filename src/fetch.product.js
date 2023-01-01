const SelectElementById = id => {
  const element = document.getElementById(id);
  return element;
};

const GetValueOfSelectElement = (element, id) => {
  return element(id).value;
};

const CreateNewElement = tag => {
  const element = document.createElement(tag);
  return element;
};

const AddClassToNewElement = (element, namedClass) => {
  element.classList.add(namedClass);
};

const RemoveClassFromNewElement = (element, id, className) => {
  element(id).classList.remove(className);
};

const GetSelectedElementWithClassName = className => {
  const element = document.querySelector("." + className);
  return element;
};

const GetSelectedElementsWithClassName = className => {
  const element = document.querySelectorAll("." + className);
  return element;
};

AppendChildToParentElement = (element, cb, child) => {
  cb(element).appendChild(child);
};

const ProductBackendAPIURI =
  "https://service.goebaide.com/api/product/all_products";

const PullProductsFromBackendAPI = () => {
  fetch(ProductBackendAPIURI, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error) {
        console.log(data);
        return;
      }
      data.data.map(() => {
        const divProductBox = CreateNewElement("div");
        const productImage = CreateNewElement("img");
        const productContent = CreateNewElement("div");
        const titleText = CreateNewElement("h3");
        const productDescription = CreateNewElement("p");
        const productRating = CreateNewElement("div");
        const ratingStars = CreateNewElement("i");
        const productPrice = CreateNewElement("div");
        const productPriceEstimate = CreateNewElement("span");
        const buyNowBtn = CreateNewElement("button");

        AddClassToNewElement(divProductBox, "box");
      });
    })
    .catch(err => {
      console.error(err);
    });
};

PullProductsFromBackendAPI();
