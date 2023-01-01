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
  
  AppendChildToParentElementUsingElement = (element, child) => {
      element.appendChild(child);
    };
  
  AppendElementAsFirstChildUsingElement = (element, child) => { 
      element.prepend(child);
  };
  
  const ProductBackendAPIURI =
    "https://service.goebaide.com/api/product/all_products";
  
  const PullBlogsFromBackendAPI = () => {
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
        // data.data.map(
        //   ({
        //     color,
        //     content,
        //     id,
        //     image,
        //     price,
        //     quantity,
        //     size,
        //     title,
        //     variation_id
        //   }) => {
        //     const divProductBox = CreateNewElement("div");
        //     const productImage = CreateNewElement("img");
        //     const productContent = CreateNewElement("div");
        //     const titleText = CreateNewElement("h3");
        //     const titleIcons = CreateNewElement("i");
        //     const productDescription = CreateNewElement("p");
        //     const productRating = CreateNewElement("div");
        //     const productPrice = CreateNewElement("div");
        //     const productPriceEstimate = CreateNewElement("span");
        //     const buyNowBtn = CreateNewElement("a");
  
        //     AddClassToNewElement(divProductBox, "box");
        //     AddAttributeToElement(divProductBox, "id", id);
  
        //     AddAttributeToElement(productImage, "src", 
        //     `https://service.goebaide.com/${image}`);
        //     AddAttributeToElement(productImage, "alt", "product image");
        //     AppendChildToParentElementUsingElement(divProductBox, productImage)
  
        //     AddClassToNewElement(productContent, "content");
  
        //     AddClassToNewElement (titleIcons, "fas");
        //     AddClassToNewElement (titleIcons, "fa-map-marker-alt");
        //     titleText.innerHTML = title;
        //     AppendElementAsFirstChildUsingElement(titleText, titleIcons);
        //     AppendChildToParentElementUsingElement(productContent, titleText);
  
        //     productDescription.innerHTML = `<h2>Product Description</h2> \n` +description;
        //     AppendChildToParentElementUsingElement (productContent, productDescription);
            
        //    AddClassToNewElement (productRating, "stars");
        //    for (let i= 0; i < 5; i++) {
        //       const ratingStars = CreateNewElement("i");
        //       AddClassToNewElement (ratingStars, "fas");
        //       AddClassToNewElement (ratingStars, "fa-star");
        //       AppendChildToParentElementUsingElement (productRating, ratingStars);
        //    };
        //    AppendChildToParentElementUsingElement (productContent, productRating);
  
        //    AddClassToNewElement (productPrice, 'price');
        //    productPrice.innerHTML = "Ksh. "+price;
        //    productPriceEstimate.innerHTML = "Ksh. "+(price + 40);
        //    AppendChildToParentElementUsingElement(productPrice, productPriceEstimate);
        //    AppendChildToParentElementUsingElement(productContent, productPrice);
  
        //    AddClassToNewElement (buyNowBtn, 'btn');
        //    AddAttributeToElement(buyNowBtn, "href", "#");
        //    AppendChildToParentElementUsingElement(productContent, buyNowBtn);
  
        //    AppendChildToParentElementUsingElement(divProductBox, productContent);
  
        //    AppendChildToParentElement("box-container", 
        //    GetSelectedElementWithClassName, divProductBox);
        //   }
        // );
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  PullBlogsFromBackendAPI();