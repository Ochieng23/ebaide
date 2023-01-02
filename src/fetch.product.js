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

const QuerySelectorForDocumentElement = element => {
  const documentElement = document.querySelector(element);
  return documentElement;
};

AppendChildToParentElement = (element, cb, child) => {
  cb(element).appendChild(child);
};

AddAttributeToElement = (element, attribute, value) => {
  element.setAttribute(attribute, value);
};

AppendElementAsFirstChild = (element, cb, child) => {
  cb(element).prepend(child);
};

AppendChildToParentElementUsingElement = (element, child) => {
  element.appendChild(child);
};

AppendElementAsFirstChildUsingElement = (element, child) => {
  element.prepend(child);
};

const ClearContentOfElement = (cb, element) => {
  cb(element).innerHTML = "";
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
          const buyNowBtn = CreateNewElement("a");

          AddClassToNewElement(divProductBox, "box");
          AddAttributeToElement(divProductBox, "id", id);

          AddAttributeToElement(
            productImage,
            "src",
            `https://service.goebaide.com/${image}`
          );
          AddAttributeToElement(productImage, "alt", "product image");
          AppendChildToParentElementUsingElement(divProductBox, productImage);

          AddClassToNewElement(productContent, "content");

          AddClassToNewElement(titleIcons, "fas");
          AddClassToNewElement(titleIcons, "fa-map-marker-alt");
          titleText.innerHTML = title;
          AppendElementAsFirstChildUsingElement(titleText, titleIcons);
          AppendChildToParentElementUsingElement(productContent, titleText);

          productDescription.innerHTML =
            `<h2>Product Description</h2> \n` + description;
          AppendChildToParentElementUsingElement(
            productContent,
            productDescription
          );

          AddClassToNewElement(productRating, "stars");
          for (let i = 0; i < 5; i++) {
            const ratingStars = CreateNewElement("i");
            AddClassToNewElement(ratingStars, "fas");
            AddClassToNewElement(ratingStars, "fa-star");
            AppendChildToParentElementUsingElement(productRating, ratingStars);
          }
          AppendChildToParentElementUsingElement(productContent, productRating);

          AddClassToNewElement(productPrice, "price");
          productPrice.innerHTML = "Ksh. " + price;
          productPriceEstimate.innerHTML = "Ksh. " + (price + 40);
          AppendChildToParentElementUsingElement(
            productPrice,
            productPriceEstimate
          );
          AppendChildToParentElementUsingElement(productContent, productPrice);

          buyNowBtn.innerHTML = "Buy Now";
          AddClassToNewElement(buyNowBtn, "view-product");
          AddClassToNewElement(buyNowBtn, "btn");
          AddAttributeToElement(buyNowBtn, "type", "button");
          AppendChildToParentElementUsingElement(productContent, buyNowBtn);

          AppendChildToParentElementUsingElement(divProductBox, productContent);

          AppendChildToParentElement(
            "product-container",
            SelectElementById,
            divProductBox
          );
        }
      );
      //HANDING VIEWING SINGLE PRODUCT:
      const productCollection = GetSelectedElementsWithClassName(
        "view-product"
      );
      for (let i = 0; i < productCollection.length; i++) {
        productCollection.item(i).addEventListener("click", () => {
          const productid = productCollection.item(i).parentElement
            .parentElement.id;
          const SingleProductURI = `https://service.goebaide.com/api/product/one_products/${productid}`;

          //FETCH SINGLE PRODUCT:
          fetch(SingleProductURI, {
            method: "GET"
          })
            .then(response => {
              return response.json();
            })
            .then(data => {
              if (data.status === "success") {
                ClearContentOfElement(QuerySelectorForDocumentElement, "#body");
                setTimeout(() => {
                  const productContainer = CreateNewElement("div");

                  const productBox = CreateNewElement("div");
                  AddClassToNewElement(productBox, "col-lg-5");
                  AddClassToNewElement(productBox, "col-md-12");
                  AddClassToNewElement(productBox, "col-12");

                  const productFirstImage = CreateNewElement("img");
                  AddClassToNewElement(productFirstImage, "mt-5");
                  AddClassToNewElement(productFirstImage, "img-fluid");
                  AddClassToNewElement(productFirstImage, "w-100");
                  AddAttributeToElement(
                    productFirstImage,
                    "alt",
                    "product first image"
                  );
                  AddAttributeToElement(
                    productFirstImage,
                    "style",
                    "width: 300px; height: 280px"
                  );
                  AddAttributeToElement(
                    productFirstImage,
                    "src",
                    `https://service.goebaide.com/${data.data.image}`
                  );
                  AppendChildToParentElementUsingElement(
                    productFirstImage,
                    productBox
                  );

                  AppendChildToParentElementUsingElement(
                    productContainer,
                    productBox
                  );
                  AppendChildToParentElement (
                    "#body",
                    QuerySelectorForDocumentElement,
                    
                  )
                }, 2000);
              }
              console.log(data.data);
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
    })
    .catch(err => {
      console.error(err);
    });
};

PullProductsFromBackendAPI();
