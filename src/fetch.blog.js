const SelectElement = id => {
  const element = document.getElementById(id);
  return element;
};

const GetValueOfElement = (element, id) => {
  return element(id).value;
};

const CreateElement = tag => {
  const element = document.createElement(tag);
  return element;
};

const AddClassToElement = (element, namedClass) => {
  element.classList.add(namedClass);
};

const RemoveClassFromElement = (element, id, className) => {
  element(id).classList.remove(className);
};

const GetElementWithClassName = className => {
  const element = document.querySelector(className);
  return element;
};

const GetElementsWithClassName = className => {
  const element = document.querySelectorAll(className);
  return element;
};

const AppendChildToParent = (element, cb, child) => {
  cb(element).appendChild(child);
};

const AddAttributeNamedElement = (element, attribute, value) => {
  element.setAttribute(attribute, value);
};

const AppendAsFirstChild = (element, cb, child) => {
  cb(element).prepend(child);
};

const AppendChildToParentUsingElement = (element, child) => {
  element.appendChild(child);
};

const AppendAsFirstChildUsingElement = (element, child) => {
  element.prepend(child);
};
const ClearElementContent = (cb, element) => {
  cb(element).innerHTML = "";
};

const PostDateCount = dt => {
  const currentTime = Date.now();
  const sincePosting = currentTime - Date.parse(dt);
  const seconds = Math.floor(sincePosting / 1000 % 60);
  const minutes = Math.floor(sincePosting / (1000 * 60) % 60);
  const hours = Math.floor(sincePosting / (1000 * 60 * 60) % 24);
  const days = Math.floor(sincePosting / (1000 * 60 * 60 * 24) % 7);
  const weeks = Math.floor(sincePosting / (1000 * 60 * 60 * 24 * 7) % 4);
  const months = Math.floor(sincePosting / (1000 * 60 * 60 * 24 * 7 * 4) % 52);
  const years = Math.floor(sincePosting / (1000 * 60 * 60 * 24 * 30 * 52));
  return {
    seconds,
    minutes,
    hours,
    days,
    weeks,
    months,
    years
  };
};

const PostedDateUpdater = (cb, d) => {
  let temp = cb(d);
  let outputSincePosted = [];
  for (let prop in temp) {
    switch (prop) {
      case "years":
        if (temp[prop] < 1) {
          continue;
        } else {
          let textString = temp[prop] > 1 ? "ys ago" : "y ago";
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        }
        break;
      case "months":
        if (temp[prop] < 1) {
          continue;
        } else {
          let textString = temp[prop] > 1 ? "ms ago" : "m ago";
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        }
        break;
      case "weeks":
        if (temp[prop] < 1) {
          continue;
        } else {
          let textString = temp[prop] > 1 ? "wks ago" : "wk ago";
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        }
        break;
      case "days":
        if (temp[prop] < 1) {
          continue;
        } else {
          let textString = temp[prop] > 1 ? "ds ago" : "d ago";
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        }
        break;
      case "hours":
        if (temp[prop] < 1) {
          continue;
        } else {
          let textString = temp[prop] > 1 ? "hs ago" : "h ago";
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        }
        break;
      case "minutes":
        if (temp[prop] < 1) {
          continue;
        } else {
          let textString = temp[prop] > 1 ? "mns ago" : "mn ago";
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        }
        break;
      case "seconds":
        outputSincePosted = [...outputSincePosted, temp[prop] + "s"];
    }
  }
  return outputSincePosted;
};

const BlogBackendAPIURI = "https://service.goebaide.com/api/blog/get";

const PullBlogsFromBackendAPI = () => {
  fetch(BlogBackendAPIURI, {
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
      data.data.map(({ blogid, content, date, image, title }) => {
        const divProductBox = CreateElement("div");
        const productImage = CreateElement("img");
        const productContent = CreateElement("div");
        const titleText = CreateElement("h3");
        const productDescription = CreateElement("p");
        const productPrice = CreateElement("div");
        const buyNowBtn = CreateElement("a");

        AddClassToElement(divProductBox, "blogs-box");
        AddAttributeNamedElement(divProductBox, "id", blogid);

        AddAttributeNamedElement(
          productImage,
          "src",
          `https://service.goebaide.com/${image}`
        );
        AddAttributeNamedElement(productImage, "alt", "product image");
        AddAttributeNamedElement(
          productImage,
          "style",
          "width:100%; height:auto;"
        );
        AppendChildToParentUsingElement(divProductBox, productImage);

        AddClassToElement(productContent, "blog-content");
        AddClassToElement(titleText, "title-positioning");
        AddClassToElement (titleText, "blog-description")
        titleText.innerHTML = title;
        AppendChildToParentUsingElement(productContent, titleText);

        AddClassToElement (productDescription, 'blog-description');
        let contentArray = content.split(" ");
        let reducedContent = [];
        for (let i = 0; i < 28; i++) {
          reducedContent = [...reducedContent, contentArray[i]];
        }
        productDescription.innerHTML = `\n ${reducedContent.join(" ")}...`;
        AppendChildToParentUsingElement(productContent, productDescription);

        AddClassToElement(productPrice, "price");
        AddClassToElement(productPrice, "date-style");
        setInterval(() => {
          let resultArray = PostedDateUpdater(PostDateCount, date);
          let resultArrayLength = resultArray.length;
          (productPrice.innerHTML =
            "\n" + resultArray[resultArrayLength - 1]), 1000;
        });
        AppendChildToParentUsingElement(productContent, productPrice);

        buyNowBtn.innerHTML = "Read more...";
        AddClassToElement(buyNowBtn, "view-blog");
        AddClassToElement(buyNowBtn, "btn");
        AddAttributeNamedElement(buyNowBtn, "type", "button");
        AppendChildToParentUsingElement(productContent, buyNowBtn);

        AppendChildToParentUsingElement(divProductBox, productContent);

        AppendChildToParent(
          "#box-container",
          GetElementWithClassName,
          divProductBox
        );
      });
      //HANDING VIEWING SINGLE BLOG:
      const productCollection = GetElementsWithClassName(".view-blog");
      for (let i = 0; i < productCollection.length; i++) {
        productCollection.item(i).addEventListener("click", () => {
          const blogid = productCollection.item(i).parentElement
            .parentElement.id;
          const SingleBlog = data.data.filter( (blog) => {
            return blog.blogid === blogid;
          });
          console.log (SingleBlog)
          //FETCH SINGLE BLOG:
          ClearElementContent(QuerySelectorForDocumentElement, "#body");
          setTimeout(() => {
            const productContainer = CreateElement("div");

            const productBox = CreateElement("div");
            AddClassToElement(productBox, "col-lg-5");
            AddClassToElement(productBox, "col-md-12");
            AddClassToElement(productBox, "col-12");
            AddAttributeNamedElement(productBox, "id", SingleBlog[0].blogid);

            const productFirstImage = CreateElement("img");
            AddClassToElement(productFirstImage, "mt-5");
            AddClassToElement(productFirstImage, "img-fluid");
            AddClassToElement(productFirstImage, "w-100");
            AddAttributeNamedElement(
              productFirstImage,
              "alt",
              "blog image"
            );
            AddAttributeNamedElement(
              productFirstImage,
              "style",
              "width: 300px; height: auto;"
            );
            AddAttributeNamedElement(
              productFirstImage,
              "src",
              `https://service.goebaide.com/${SingleBlog[0].image}`
            );
            AppendChildToParentUsingElement(
              productBox,
              productFirstImage
            );

            const productInformation = CreateElement("div");
            AddClassToElement(productInformation, "col-lg-5");
            AddClassToElement(productInformation, "col-md-12");
            AddClassToElement(productInformation, "col-12");
            AddClassToElement(productInformation, "my-5");
            AddClassToElement(productInformation, "pt-5");
            AddAttributeNamedElement(
              productInformation,
              "style",
              "background-color: white;"
            );

            const productTitle = CreateElement("h1");
            AddAttributeNamedElement(
              productTitle,
              "style",
              "font-weight: bolder;"
            );
            AddClassToElement (productTitle, "blog-description");
            productTitle.innerHTML = SingleBlog[0].title;

            AppendChildToParentUsingElement(
              productInformation,
              productTitle
            );

            const fullDescriptionTextSpan = CreateElement("span");
            AddClassToElement (fullDescriptionTextSpan, "blog-description");
            fullDescriptionTextSpan.innerHTML = SingleBlog[0].content;
            AppendChildToParentUsingElement(
              productInformation,
              fullDescriptionTextSpan
              );
            const productPriceSpanHolder = CreateElement("h2");
            AddClassToElement(productPriceSpanHolder, "price");

            const priceSpanHolder = CreateElement("span");
            setInterval(() => {
              let resultArray = PostedDateUpdater(PostDateCount, SingleBlog[0].date);
              let resultArrayLength = resultArray.length;
              (priceSpanHolder.innerHTML =
                "\n" + resultArray[resultArrayLength - 1]), 1000;
            });
            AppendChildToParentUsingElement(
              productPriceSpanHolder,
              priceSpanHolder
            );
            AppendChildToParentUsingElement(
              productInformation,
              productPriceSpanHolder
            );

            const continueShoppingButton = CreateElement("button");
            AddClassToElement(continueShoppingButton, "btn");
            continueShoppingButton.innerHTML = "Continue reading";
            continueShoppingButton.addEventListener("click", e => {
              e.preventDefault();
              //console.log(window.location.href);
              if (
                window.location.href ===
                `https://goebaide.com/index.html#blog`
              ) {
                window.location.reload();
                setTimeout ( () => {
                  window.location.href = 'https://goebaide.com/index.html#blog', 1500
                });
                return;
              }
              window.location.reload();
              setTimeout ( () => {
                window.location.href = 'https://goebaide.com/index.html#blog', 1500
              });
              });
              AppendChildToParentUsingElement(
                productInformation,
                continueShoppingButton
              );

              AppendChildToParentUsingElement(
                productBox,
                productInformation
              );
              AppendChildToParentUsingElement(
                productContainer,
                productBox
              );
              AppendChildToParent(
                "#body",
                GetElementWithClassName,
                productContainer
              );
            }, 100);
        });
      }    
      //console.log (data.data)
    })
    .catch(err => {
      console.error(err);
    });
};

PullBlogsFromBackendAPI();
const SelectElement = id => {
    const element = document.getElementById(id);
    return element;
  };
  
  const GetValueOfElement = (element, id) => {
    return element(id).value;
  };
  
  const CreateElement = tag => {
    const element = document.createElement(tag);
    return element;
  };
  
  const AddClassToElement = (element, namedClass) => {
    element.classList.add(namedClass);
  };
  
  const RemoveClassFromElement = (element, id, className) => {
    element(id).classList.remove(className);
  };
  
  const GetElementWithClassName = className => {
    const element = document.querySelector(className);
    return element;
  };
  
  const GetElementsWithClassName = className => {
    const element = document.querySelectorAll(className);
    return element;
  };
  
  AppendChildToParent = (element, cb, child) => {
    cb(element).appendChild(child);
  };
  
  AddAttributeNamedElement = (element, attribute, value) => {
    element.setAttribute(attribute, value);
  };
  
  AppendAsFirstChild = (element, cb, child) => { 
      cb (element).prepend(child);
  };
  
  AppendChildToParentUsingElement = (element, child) => {
      element.appendChild(child);
    };
  
  AppendAsFirstChildUsingElement = (element, child) => { 
      element.prepend(child);
  };
  
const PostDateCount = (dt) => {
  const currentTime = Date.now ();
  const sincePosting = currentTime -  Date.parse(dt);
  const seconds = Math.floor ((sincePosting / 1000) % 60);
  const minutes = Math.floor ((sincePosting / (1000 * 60)) % 60);
  const hours = Math.floor ((sincePosting / (1000 * 60 * 60)) % 24);
  const days = Math.floor ((sincePosting / (1000 * 60 * 60 * 24)) % 7);
  const weeks = Math.floor ((sincePosting / (1000 * 60 * 60 * 24 * 7)) % 4);
  const months = Math.floor ((sincePosting / (1000 * 60 * 60 * 24 * 7 * 4)) % 52);
  const years = Math.floor ((sincePosting / (1000 * 60 * 60 * 24 * 30 * 52)));
  return {
    seconds,
    minutes,
    hours,
    days,
    weeks,
    months,
    years,
  };
};

const PostedDateUpdater = (cb, d) => {
   let temp = cb (d);
   let outputSincePosted = [];
   for (let prop in temp) {
    switch (prop) {
      case 'years':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "yrs ago" :'yr ago';
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        };
        break;
      case 'months':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "months ago" :'month ago';
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        };
        break
      case 'weeks':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "wks ago" :'wk ago';
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        };
        break;
      case 'days':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "days ago" :'day ago';
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        };
        break;
      case 'hours':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "hrs ago" :'hr ago';
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        };
        break;
      case 'minutes':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "mins ago" :'min ago';
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        };
        break;
      case 'seconds':
          outputSincePosted = [...outputSincePosted, temp[prop] + 's'];
    };
   };
   return outputSincePosted;
};

  const BlogBackendAPIURI =
    "https://service.goebaide.com/api/blog/get";
  
  const PullBlogsFromBackendAPI = () => {
    fetch(BlogBackendAPIURI, {
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
            blogid,
            content,
            date,
            image,
            title,
          }) => {
            const divProductBox = CreateElement("div");
            const productImage = CreateElement("img");
            const productContent = CreateElement("div");
            const titleText = CreateElement("h3");
            const productDescription = CreateElement("p");
            const productPrice = CreateElement("div");
            const buyNowBtn = CreateElement("a");
  
            AddClassToElement(divProductBox, "blogs-box");
            AddAttributeNamedElement(divProductBox, "id", blogid);
            
            AddAttributeNamedElement(productImage, "src", 
            `https://service.goebaide.com/${image}`);
            AddAttributeNamedElement(productImage, "alt", "product image");
            AddAttributeNamedElement (
              productImage, 
              "style", 
              "width:100%; height:auto;"
              );
            AppendChildToParentUsingElement(divProductBox, productImage)
  
            AddClassToElement(productContent, "blog-content");
            AddClassToElement (titleText, 'title-positioning');
            titleText.innerHTML = title;
            AppendChildToParentUsingElement(productContent, titleText);
            let contentArray = content.split(" ");
            let reducedContent = [];
            for (let i = 0; i < 28; i++){
              reducedContent = [...reducedContent, contentArray[i]];
            }
            productDescription.innerHTML = `\n ${reducedContent.join (" ")}...`;
            AppendChildToParentUsingElement (productContent, productDescription);
  
           AddClassToElement (productPrice, 'price');
           AddClassToElement (productPrice, 'date-style');
           setInterval (() => {
             let resultArray = PostedDateUpdater (PostDateCount, date);
             let resultArrayLength = resultArray.length;
             productPrice.innerHTML = "\n" + resultArray[resultArrayLength-1], 
             1000
           })
           AppendChildToParentUsingElement(productContent, productPrice);
  
           buyNowBtn.innerHTML = "Read more...";
           AddClassToElement (buyNowBtn, 'view-blog');
           AddClassToElement (buyNowBtn, 'btn');
           AddAttributeNamedElement(buyNowBtn, "href", "#");
           AddAttributeNamedElement(buyNowBtn, "type", "button");
           AppendChildToParentUsingElement(productContent, buyNowBtn);
  
           AppendChildToParentUsingElement(divProductBox, productContent);
  
           AppendChildToParent("#box-container", 
           GetElementWithClassName, divProductBox);
          }
        );
              //HANDING VIEWING SINGLE BLOG:
      const productCollection = GetSelectedElementsWithClassName(
        "view-blog"
      );
      for (let i = 0; i < productCollection.length; i++) {
        productCollection.item(i).addEventListener("click", () => {
          const productid = productCollection.item(i).parentElement
            .parentElement.id;
          const SingleProductURI = `https://service.goebaide.com/api/product/one_products/${productid}`;

          //FETCH SINGLE BLOG:
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
                  AddAttributeToElement(productBox, "id", data.data[0].id);

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
                    `https://service.goebaide.com/${data.data[0].image}`
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

                    const smallImage = CreateNewElement('img');
                    AddClassToNewElement(smallImage, 'small-img');
                    AddClassToNewElement(smallImage, 'w-100');
                    AddClassToNewElement(smallImage, 'img-fluid');
                    AddAttributeToElement(
                      smallImage,
                      "src",
                      "https://service.goebaide.com"
                    );
                    AddAttributeToElement(
                      smallImage,
                      "alt",
                      "product-image-"+[i+1]
                    );

                    AppendChildToParentElementUsingElement(
                      smallImageGroupColumn,
                      smallImage
                    );
                    AppendChildToParentElementUsingElement(
                      smallImageGroup,
                      smallImageGroupColumn
                    );
                  };
                  AppendChildToParentElementUsingElement(
                    productBox,
                    smallImageGroup
                  )

                  const productInformation = CreateNewElement('div');
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

                    const productTitle = CreateNewElement('h1');
                    AddAttributeToElement(
                      productTitle, 
                      'style', 
                      'font-weight: bolder;'
                      );
                    productTitle.innerHTML = data.data[0].title;

                    AppendChildToParentElementUsingElement(
                      productInformation, 
                      productTitle
                    )

                    const productPriceSpanHolder = CreateNewElement('h2');
                    AddClassToNewElement(productPriceSpanHolder, 'price');

                    const priceSpanHolder = CreateNewElement('span');
                    priceSpanHolder.innerHTML = 'Ksh. '+data.data[0].price;
                    AppendChildToParentElementUsingElement(
                      productPriceSpanHolder,
                      priceSpanHolder
                      );
                    AppendChildToParentElementUsingElement(
                      productInformation,
                      productPriceSpanHolder
                    );

                    const sizeList = CreateNewElement('select');
                    AddClassToNewElement(sizeList, 'my-3');
                    AddAttributeToElement(sizeList, 'style', 'width:100px; height: 10%;');

                    const sizeArray = data.data[0].size.split(' ');
                    for (let i = 0; i < sizeArray.length; i++) {
                      const sizeListItem = CreateNewElement('option');
                      AddAttributeToElement(
                        sizeListItem, 
                        'value',
                        sizeArray[i]
                        );
                      AddAttributeToElement(
                        sizeListItem, 
                        'style',
                        'font-size: 1em;'
                        );
                      sizeListItem.innerHTML = sizeArray[i];
                      AppendChildToParentElementUsingElement(
                        sizeList,
                        sizeListItem
                      );

                      AppendChildToParentElementUsingElement (
                        productInformation,
                        sizeList
                      );
                    };

                    const quantityToBuy = CreateNewElement('input');
                    AddAttributeToElement(
                      quantityToBuy,
                      "type",
                      "number"
                    );
                    AddAttributeToElement(
                      quantityToBuy,
                      "style",
                      "width:30px; height: 10%;"
                    );
                    AddAttributeToElement(
                      quantityToBuy,
                      "value",
                      '1'
                    );
                    AppendChildToParentElementUsingElement(
                      productInformation,
                      quantityToBuy
                    );

                    const addToCartButton = CreateNewElement ('button');
                    AddClassToNewElement(addToCartButton, 'btn');
                    addToCartButton.innerHTML = 'Add To Cart';
                    AppendChildToParentElementUsingElement(
                      productInformation,
                      addToCartButton
                    );

                    const continueShoppingButton = CreateNewElement ('button');
                    AddClassToNewElement(continueShoppingButton, 'btn');
                    continueShoppingButton.innerHTML = 'Continue Shopping';
                    continueShoppingButton.addEventListener('click', (e) =>{
                      e.preventDefault();
                      //console.log(window.location.href);
                      if(
                        window.location.href === 
                        `https://goebaide.com/index.html#packages`
                      ){
                        window.location.href = 'https://goebaide.com/';
                        return;
                      };
                      window.location.href = 'https://goebaide.com#packages';
                    });
                    AppendChildToParentElementUsingElement(
                      productInformation,
                      continueShoppingButton
                    );
                    
                    const productDescriptionDetails = CreateNewElement('h4');
                    productDescriptionDetails.innerHTML = 'Product Description';
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
              }
              //console.log(data.data);
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
        //console.log (data.data)
      })
      .catch(err => {
        console.error(err);
      });
  };
  

  PullBlogsFromBackendAPI();