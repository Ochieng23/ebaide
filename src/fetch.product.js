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
          
          const productInCart = JSON.parse(
            localStorage.getItem ("cart-items") || "[]"
          );
          productInCart.map( (product) => {
            if (product.id === id){
              buyNowBtn.innerHTML = "Go to Cart";
            }else{
              buyNowBtn.innerHTML = "Buy Now";
            }
          });

          if (
            buyNowBtn.innerHTML = "Go to Cart"
          ){
            console.log("I am ready to purchase");
          };

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

          //FETCH SINGLE PRODUCT:
          const SingleProduct = data.data.filter(product => {
            return product.id === productid;
          });
          ClearContentOfElement(QuerySelectorForDocumentElement, "#body");
          setTimeout(() => {
            const productContainer = CreateNewElement("div");

            const productBox = CreateNewElement("div");
            AddClassToNewElement(productBox, "col-lg-5");
            AddClassToNewElement(productBox, "col-md-12");
            AddClassToNewElement(productBox, "col-12");
            AddAttributeToElement(productBox, "id", SingleProduct[0].id);

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
              "width: 300px; height: auto;"
            );
            AddAttributeToElement(
              productFirstImage,
              "src",
              `https://service.goebaide.com/${SingleProduct[0].image}`
            );
            AppendChildToParentElementUsingElement(
              productBox,
              productFirstImage
            );

                  const smallImageGroup = CreateNewElement("div");
                  AddClassToNewElement(smallImageGroup, "small-img-group");
                  for (let i = 0; i < 4; i++) {
                    const smallImageGroupColumn = CreateNewElement("div");
                    AddClassToNewElement(
                      smallImageGroupColumn,
                      "small-img-col"
                    );
                    AddAttributeToElement(
                      smallImageGroup,
                      'style',
                      'width: 50vw; margin:20px;'
                    )

              const smallImage = CreateNewElement("img");
              AddClassToNewElement(smallImage, "small-img");
              AddClassToNewElement(smallImage, "w-100");
              AddClassToNewElement(smallImage, "img-fluid");
              AddAttributeToElement(
                smallImage,
                "src",
                "https://service.goebaide.com"
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
            }
            AppendChildToParentElementUsingElement(productBox, smallImageGroup);

                  const productInformation = CreateNewElement('div');
                  AddClassToNewElement(productInformation, 'product-info')
                  AddClassToNewElement(productInformation, 'col-lg-5');
                  AddClassToNewElement(productInformation, 'col-md-12');
                  AddClassToNewElement(productInformation, 'col-12');
                  AddClassToNewElement(productInformation, 'my-5');
                  AddClassToNewElement(productInformation, 'pt-5');
                  
                  AddAttributeToElement(
                    productInformation, 
                    'style', 
                    'background-color: white;'
                    );
                    AddClassToNewElement(productInformation, 'col')

            const productTitle = CreateNewElement("h1");
            AddAttributeToElement(
              productTitle,
              "style",
              "font-weight: bolder;"
            );
            AddClassToNewElement(productTitle, "product-description");
            productTitle.innerHTML = SingleProduct[0].title;

            AppendChildToParentElementUsingElement(
              productInformation,
              productTitle
            );

            const productPriceSpanHolder = CreateNewElement("h2");
            AddClassToNewElement(productPriceSpanHolder, "price");

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
            AddClassToNewElement(sizeList, "my-3");
            AddAttributeToElement(
              sizeList,
              "style",
              "width:100px; height: 10%;"
            );
            AddAttributeToElement(sizeList, "name", "size");

            const sizeArray = SingleProduct[0].size.split(" ");
            for (let i = 0; i < sizeArray.length; i++) {
              const sizeListItem = CreateNewElement("option");
              AddAttributeToElement(sizeListItem, "value", sizeArray[i]);
              AddAttributeToElement(sizeListItem, "style", "font-size: 1em;");
              sizeListItem.innerHTML = sizeArray[i];
              AppendChildToParentElementUsingElement(sizeList, sizeListItem);

              AppendChildToParentElementUsingElement(
                productInformation,
                sizeList
              );
            }

            const quantityToBuy = CreateNewElement("input");
            AddAttributeToElement(quantityToBuy, "type", "number");
            AddAttributeToElement(
              quantityToBuy,
              "style",
              "width:30px; height: 10%;"
            );
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
              RemoveClassFromNewElement(addToCartButtonIcon, "fa-cart-plus");
              AddClassToNewElement(addToCartButtonIcon, "fa-shopping-cart");
              AddClassToNewElement(addToCartButton, "view-cart-button");
              addToCartButtonSpan.innerHTML = "Go to Cart";

              let cartArray = [];
              const idOfItemAddToCart =
                addToCartButton.parentElement.parentElement.id;
              const pickedItem = data.data.filter(
                item => item.id === idOfItemAddToCart
              );
              const { id, title, image, price } = pickedItem[0];
              const itemSize = sizeList.value;
              const itemQuantityToBuy = quantityToBuy.value;
              const cartArrayItem = {
                id,
                title,
                image,
                price,
                itemSize,
                itemQuantityToBuy
              };
              const storedCartItems = JSON.parse(
                localStorage.getItem("cart-items") || "[]",
              );

              const isItemExists = storedCartItems.find(
                (item)=>{
                  return item.id === cartArrayItem.id;
                }
              )
              if (isItemExists !== undefined) {
                const cartElement = 
                GetSelectedElementWithClassName('view-cart-button');
                cartElement.addEventListener( 'click', Cart);
                return;
              };
              // if (isItemAddToCart.length === 0) {
            cartArray = [...storedCartItems, cartArrayItem];
            localStorage.setItem("cart-items", JSON.stringify(cartArray));
              // }
              //console.log("Item already added to cart");
              //Handling Clicking Go To Cart Button
            });

            const continueShoppingButton = CreateNewElement("button");
            AddClassToNewElement(continueShoppingButton, "btn");
            continueShoppingButton.innerHTML = "Continue Shopping";
            continueShoppingButton.addEventListener("click", e => {
              e.preventDefault();
              //console.log(window.location.href);
              if (
                window.location.href ===
                `https://goebaide.com/index.html#packages`
              ) {
                window.location.reload();
                setTimeout(() => {
                  (window.location.href =
                    "https://goebaide.com/index.html#blog"), 1500;
                });
                return;
              }
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

            const productDescriptionDetails = CreateNewElement("h4");
            productDescriptionDetails.innerHTML = "Product Description";
            AppendChildToParentElementUsingElement(
              productInformation,
              productDescriptionDetails
            );

                    const fullDescriptionTextSpan = CreateNewElement('span');
                    fullDescriptionTextSpan.innerHTML = data.data[0].description;
                    AppendChildToParentElementUsingElement(
                      productInformation,
                      fullDescriptionTextSpan
                    );
        
                    AppendChildToParentElementUsingElement(
                      productBox, 
                      productInformation
                    );
                  AppendChildToParentElementUsingElement(
                    productContainer,
                    productBox
                  );
                  AppendChildToParentElement(
                    "#body",
                    QuerySelectorForDocumentElement,
                    productContainer
                  );
                }, 100);
              })
              //console.log(data.data);
        };
      })
    .catch(err => {
      console.error(err);
    });
};

PullProductsFromBackendAPI();

