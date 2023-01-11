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

const RemoveClassFromNewElement = (element, className) => {
  element.classList.remove(className);
};

const GetSelectedElementWithClassName = className => {
  const element = document.querySelector("."+className);
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

const AddAttributeToElement = (element, attribute, value) => {
  element.setAttribute(attribute, value);
};

const AppendElementAsFirstChild = (element, cb, child) => {
  cb(element).prepend(child);
};

const AppendChildToParentElementUsingElement = (element, child) => {
  element.appendChild(child);
};

const AppendElementAsFirstChildUsingElement = (element, child) => {
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
          id,
          image,
          price,
          title,
        }) => {
          const divProductBox = CreateNewElement("div");
          const productImage = CreateNewElement("img");
          const productContent = CreateNewElement("div");
          const titleText = CreateNewElement("h3");
          const titleIcons = CreateNewElement("i");
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
          AppendElementAsFirstChildUsingElement(titleText, titleIcons);
          AddAttributeToElement (
            titleText, 
            "style",
            "height:7vh;"
            );
          let titleArray = title.split(" ");
          let reducedTitle = [];
          for (let i = 0; i < 3; i++) {
            reducedTitle = [...reducedTitle, titleArray[i]];
          }
          titleText.innerHTML = `${reducedTitle.join(" ")}...`;
          AppendChildToParentElementUsingElement(productContent, titleText);

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

      const productInCart = JSON.parse(
        localStorage.getItem ("cart-items") || "[]"
      );
      productInCart.map((item) => {
        const prod = document.getElementById (`${item.id}`);
        const updateBtn = prod.children[1].children[3];
        updateBtn.innerHTML = "Go to cart";
      });

      //HANDING VIEWING SINGLE PRODUCT:
      const productCollection = GetSelectedElementsWithClassName(
        "view-product"
      );
      const productCollectionArray = Array.from(productCollection);
      productCollectionArray.map ((item) => {
        if (item.innerHTML === "Go to cart") {
          item.addEventListener ("click", Cart);
          return;
        }

      });

      
      })
    .catch(err => {
      console.error(err);
    });
};

PullProductsFromBackendAPI();

