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
  "https://api.goebaide.com/api/product/all_products";

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
      data.data.map(({ id, image, price, title }) => {
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

        //PROCESSING IMAGE:
        const img = image.split(",");
        //console.log(img[0]);
        AddAttributeToElement(
          productImage,
          "src",
          `https://api.goebaide.com/${img[0]}`
        );
        AddAttributeToElement(productImage, "alt", "product image");
        AppendChildToParentElementUsingElement(divProductBox, productImage);

        AddClassToNewElement(productContent, "content");

        AddClassToNewElement(titleIcons, "fas");
        AddClassToNewElement(titleIcons, "fa-map-marker-alt");
        AppendElementAsFirstChildUsingElement(titleText, titleIcons);
        AddAttributeToElement(titleText, "style", "height:7vh;");
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
      });

      const productInCart = JSON.parse(
        localStorage.getItem("cart-items") || "[]"
      );
      productInCart.map(item => {
        const prod = document.getElementById(`${item.id}`);
        const updateBtn = prod.children[1].children[3];
        updateBtn.innerHTML = "Go to cart";
      });

      //HANDING VIEWING SINGLE PRODUCT:
      const productCollection = GetSelectedElementsWithClassName(
        "view-product"
      );
      const productCollectionArray = Array.from(productCollection);
      productCollectionArray.map(item => {
        if (item.innerHTML === "Go to cart") {
          item.addEventListener("click", Cart);
          return;
        }

        item.addEventListener("click", () => {
          const productid = item.parentElement.parentElement.id;

          //FETCH SINGLE PRODUCT:
          const SingleProduct = data.data.filter(product => {
            return product.id === productid;
          });
          ClearContentOfElement(QuerySelectorForDocumentElement, "#main");
          setTimeout(() => {
            const productContainer = CreateNewElement("div");
            AddAttributeToElement(productContainer, "style", "padding:8% 4%;");
            const productBox = CreateNewElement("div");
            AddClassToNewElement(productBox, "col-lg-5");
            AddClassToNewElement(productBox, "col-md-12");
            AddClassToNewElement(productBox, "col-12");
            AddAttributeToElement(productBox, "id", SingleProduct[0].id);
            
            const productEntitiesRows = CreateNewElement("div");
            // AddAttributeToElement(
            //   productEntitiesRows,
            //   "style",
            //   `
            //   display:grid;
            //   grid-template-columns: 40% 20% !important;
            //   `
            //   ); 
            const productImageColumn = CreateNewElement("div");
            // AddAttributeToElement(
            //   productImageColumn,
            //   "style",
            //   `
            //   background-color: blue;
            //   `
            // )
            const productFirstImage = CreateNewElement("img");
            // AddClassToNewElement(productFirstImage, "mt-5");
            // AddClassToNewElement(productFirstImage, "img-fluid");
            // AddClassToNewElement(productFirstImage, "w-100");
            AddAttributeToElement(
              productFirstImage,
              "alt",
              "product first image"
            );
            AddAttributeToElement(
              productFirstImage,
              "style",
              "width: 300px; height: auto;"
            );

            const singleProductImage = SingleProduct[0].image.split(",");

            AddAttributeToElement(
              productFirstImage,
              "src",
              `https://api.goebaide.com/${singleProductImage[0]}`
            );
            AppendChildToParentElementUsingElement(
              productImageColumn,
              productFirstImage
            );

            const smallImageGroup = CreateNewElement("div");
            //AddClassToNewElement(smallImageGroup, "small-img-group");
            for (let i = 0; i < singleProductImage.length; i++) {
              const smallImageGroupColumn = CreateNewElement("div");
              //AddClassToNewElement(smallImageGroupColumn, "small-img-col");
              // AddAttributeToElement(
              //   smallImageGroup,
              //   "style",
              //   "width: 50vw; margin:20px;"
              // );

              const smallImage = CreateNewElement("img");
              // AddClassToNewElement(smallImage, "small-img");
              // AddClassToNewElement(smallImage, "w-100");
              // AddClassToNewElement(smallImage, "img-fluid");
              AddAttributeToElement(
                smallImage,
                "src",
                `https://api.goebaide.com/${singleProductImage[i]}`
              );
              AddAttributeToElement(
                smallImage,
                "alt",
                "product-image-" + [i + 1]
              );

              AppendChildToParentElementUsingElement(
                smallImageGroupColumn,
                smallImage
              );
              AppendChildToParentElementUsingElement(
                smallImageGroup,
                smallImageGroupColumn
              );
              smallImageGroupColumn.addEventListener("click", () => {
                AddAttributeToElement(
                  productFirstImage,
                  "src",
                  `${smallImageGroupColumn.children[0].currentSrc}`
                );
              });
            }
            AppendChildToParentElementUsingElement(productImageColumn, smallImageGroup);
            AppendChildToParentElementUsingElement(productEntitiesRows, productImageColumn);

            const productInformation = CreateNewElement("div");
            AddClassToNewElement(productInformation, "product-info");

            // AddAttributeToElement(
            //   productInformation,
            //   "style",
            //  ` 
            //  background-color: white !important;
      
            //  `
            // );

            const productTitle = CreateNewElement("h1");
            AddAttributeToElement(
              productTitle,
              "style",
              "font-weight: bolder;"
            );
            // AddClassToNewElement(productTitle, "product-description");
            productTitle.innerHTML = SingleProduct[0].title;

            AppendChildToParentElementUsingElement(
              productInformation,
              productTitle
            );

            const productPriceSpanHolder = CreateNewElement("h2");
            // AddClassToNewElement(productPriceSpanHolder, "price");

            const priceSpanHolder = CreateNewElement("span");
            priceSpanHolder.innerHTML = "Ksh. " + SingleProduct[0].price;
            AppendChildToParentElementUsingElement(
              productPriceSpanHolder,
              priceSpanHolder
            );
            AppendChildToParentElementUsingElement(
              productInformation,
              productPriceSpanHolder
            );

            const sizeList = CreateNewElement("select");
            // AddClassToNewElement(sizeList, "my-3");
            // AddAttributeToElement(
            //   sizeList,
            //   "style",
            //   "width:100px; height: 10%;"
            // );
            AddAttributeToElement(sizeList, "name", "size");

            const sizeArray = SingleProduct[0].size.split(" ");
            for (let i = 0; i < sizeArray.length; i++) {
              const sizeListItem = CreateNewElement("option");
              AddAttributeToElement(sizeListItem, "value", sizeArray[i]);
              // AddAttributeToElement(sizeListItem, "style", "font-size: 1em;");
              sizeListItem.innerHTML = sizeArray[i];
              AppendChildToParentElementUsingElement(sizeList, sizeListItem);

              AppendChildToParentElementUsingElement(
                productInformation,
                sizeList
              );
            }

            const quantityToBuy = CreateNewElement("input");
            AddAttributeToElement(quantityToBuy, "type", "number");
            // AddAttributeToElement(
            //   quantityToBuy,
            //   "style",
            //   "width:30px; height: 10%;"
            // );
            AddAttributeToElement(quantityToBuy, "value", "1");
            AppendChildToParentElementUsingElement(
              productInformation,
              quantityToBuy
            );

            const addToCartButton = CreateNewElement("button");
            AddClassToNewElement(addToCartButton, "btn");
            AddClassToNewElement(addToCartButton, "btn-cart-icon");

            const addToCartButtonSpan = CreateNewElement("span");
            addToCartButtonSpan.innerHTML = "Add To Cart";
            AppendChildToParentElementUsingElement(
              addToCartButton,
              addToCartButtonSpan
            );
            const addToCartButtonIcon = CreateNewElement("i");
            AddClassToNewElement(addToCartButtonIcon, "fa");
            AddClassToNewElement(addToCartButtonIcon, "fa-cart-plus");
            AppendElementAsFirstChildUsingElement(
              addToCartButton,
              addToCartButtonIcon
            );
            AppendChildToParentElementUsingElement(
              productInformation,
              addToCartButton
            );

            addToCartButton.addEventListener("click", e => {
              e.preventDefault();
              //console.log(e)
              if (quantityToBuy.value < 1) {
                ErrorMessage(
                  CreateNewElement,
                  QuerySelectorForDocumentElement,
                  "p",
                  ".product-info",
                  "You must buy at least 1 item."
                );
                return;
              }
              RemoveClassFromNewElement(addToCartButtonIcon, "fa-cart-plus");
              AddClassToNewElement(addToCartButtonIcon, "fa-shopping-cart");
              AddClassToNewElement(addToCartButton, "view-cart-button");

              let cartArray = [];
              const idOfItemAddToCart =
                addToCartButton.parentElement.parentElement.parentElement.id;
              const pickedItem = data.data.filter(
                item => item.id === idOfItemAddToCart
              );
              const { id, title, image, price } = pickedItem[0];
              const itemSize = sizeList.value;
              const itemQuantityToBuy = quantityToBuy.value;
              const img = image.split(",")[0];
              const cartArrayItem = {
                id,
                title,
                img,
                price,
                itemSize,
                itemQuantityToBuy
              };
              const storedCartItems = JSON.parse(
                localStorage.getItem("cart-items") || "[]"
              );

              const isItemExists = storedCartItems.find(item => {
                return item.id === cartArrayItem.id;
              });
              if (isItemExists !== undefined) {
                const cartElement = GetSelectedElementWithClassName(
                  "view-cart-button"
                );
                cartElement.addEventListener("click", Cart);
                return;
              }
              // if (isItemAddToCart.length === 0) {
              cartArray = [...storedCartItems, cartArrayItem];
              localStorage.setItem("cart-items", JSON.stringify(cartArray));
              addToCartButtonSpan.innerHTML = "Go to Cart";
              // }
              //console.log("Item already added to cart");
              //Handling Clicking Go To Cart Button
            });

            const continueShoppingButton = CreateNewElement("button");
            AddClassToNewElement(continueShoppingButton, "btn");
            AddClassToNewElement(continueShoppingButton, "btn-specific");
            continueShoppingButton.innerHTML = "Continue Shopping";
            continueShoppingButton.addEventListener("click", e => {
              e.preventDefault();
              //console.log(window.location.href);
              if (
                window.location.href ===
                "https://goebaide.com/index.html#packages"
              ) {
                window.location.reload();
                setTimeout(() => {
                  (window.location.href =
                    "https://goebaide.com/index.html#blog"), 1500;
                });
                return;
              }
              ClearContent(FindSingleElement, "#package");
              PullProductsFromBackendAPI();
              window.location.reload();
              setTimeout(() => {
                (window.location.href =
                  "https://goebaide.com/index.html#blog"), 1500;
              });
            });
            AppendChildToParentElementUsingElement(
              productInformation,
              continueShoppingButton
            );

            const productionDescriptionSection = CreateNewElement("div");
            // AddClassToNewElement(productionDescriptionSection, "product-info");
            // AddClassToNewElement(productionDescriptionSection, "col-lg-5");
            // AddClassToNewElement(productionDescriptionSection, "col-md-12");
            // AddClassToNewElement(productionDescriptionSection, "col-12");
            // AddClassToNewElement(productionDescriptionSection, "my-5");
            // AddClassToNewElement(productionDescriptionSection, "pt-5");

            // AddAttributeToElement(
            //   productionDescriptionSection,
            //   "style",
            //   "background-color: white;"
            // );
            // AddClassToNewElement(productionDescriptionSection, "col");

            const productDescriptionDetails = CreateNewElement("h4");
            productDescriptionDetails.innerHTML = "Product Description";
            AppendChildToParentElementUsingElement(
              productionDescriptionSection,
              productDescriptionDetails
            );

            const fullDescriptionTextSpan = CreateNewElement("span");
            fullDescriptionTextSpan.innerHTML = data.data[0].description;
            AppendChildToParentElementUsingElement(
              productionDescriptionSection,
              fullDescriptionTextSpan
            );

            AppendChildToParentElementUsingElement(
              productEntitiesRows,
              productInformation
            );

            AppendChildToParentElementUsingElement(
              productEntitiesRows,
              productionDescriptionSection
            );

            AppendChildToParentElementUsingElement(
              productBox,
              productEntitiesRows
            )

            AppendChildToParentElementUsingElement(
              productContainer,
              productBox
            );
            AppendChildToParentElement(
              "#main",
              QuerySelectorForDocumentElement,
              productContainer
            );
          }, 100);
        });
        //console.log(data.data);
      });
    })
    .catch(err => {
      console.log(err);
    });
};

PullProductsFromBackendAPI();
