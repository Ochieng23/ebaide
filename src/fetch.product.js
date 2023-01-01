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

AddAttributeToElement = (element, attribute, value) => {
  element.setAttribute(attribute, value);
};

AppendElementAsFirstChild = (element, cb, child) => { 
    cb (element).prepend(child);
};

AppendElementAsFirstChild = (element, cb, child) => { 
    cb (element).prepend(child);
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
      data.data.map(
        ({
          color,
          description,
          id,
          image,
          price,
          quantity,
          size,
          title,
          variation_id
        }) => {
          const divProductBox = CreateNewElement("div");
          const productImage = CreateNewElement("img");
          const productContent = CreateNewElement("div");
          const titleText = CreateNewElement("h3");
          const titleIcons = CreateNewElement("i");
          const productDescription = CreateNewElement("p");
          const productRating = CreateNewElement("div");
          const productPrice = CreateNewElement("div");
          const productPriceEstimate = CreateNewElement("span");
          const buyNowBtn = CreateNewElement("button");

          AddClassToNewElement(divProductBox, "box");

          AddAttributeToElement(productImage, "src", image);

          AddAttributeToElement(productImage, "alt", "product image");

          AddClassToNewElement(productContent, "content");

          AddClassToNewElement (titleIcons, "fas");
          AddClassToNewElement (titleIcons, "fa-map-marker-alt");

          titleText.innerHTML = title;
          

          productDescription.innerHTML = `<h3>Product Description</h3> \n` +description;
          
         AddClassToNewElement (productRating, "stars");
         for (let i= 0; i < 5; i++) {
            const ratingStars = CreateNewElement("i");
            AddClassToNewElement (ratingStars, "fas");
            AddClassToNewElement (ratingStars, "fa-star");

         };

          console.log(productImage);
        }
      );
    })
    .catch(err => {
      console.error(err);
    });
};

PullProductsFromBackendAPI();
