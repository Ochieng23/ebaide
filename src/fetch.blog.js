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
    const element = document.querySelector("." + className);
    return element;
  };
  
  const GetElementsWithClassName = className => {
    const element = document.querySelectorAll("." + className);
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
        // data.data.map(
        //   ({
        //     blogid,
        //     content,
        //     date,
        //     image,
        //     title,
        //   }) => {
        //     const divProductBox = CreateElement("div");
        //     const productImage = CreateElement("img");
        //     const productContent = CreateElement("div");
        //     const titleText = CreateElement("h3");
        //     const titleIcons = CreateElement("i");
        //     const productDescription = CreateElement("p");
        //     const productRating = CreateElement("div");
        //     const productPrice = CreateElement("div");
        //     const productPriceEstimate = CreateElement("span");
        //     const buyNowBtn = CreateElement("a");
  
        //     AddClassToElement(divProductBox, "box");
        //     AddAttributeToElement(divProductBox, "id", id);
  
        //     AddAttributeToElement(productImage, "src", 
        //     `https://service.goebaide.com/${image}`);
        //     AddAttributeToElement(productImage, "alt", "product image");
        //     AppendChildToParentElementUsingElement(divProductBox, productImage)
  
        //     AddClassToElement(productContent, "content");
  
        //     AddClassToElement (titleIcons, "fas");
        //     AddClassToElement (titleIcons, "fa-map-marker-alt");
        //     titleText.innerHTML = title;
        //     AppendElementAsFirstChildUsingElement(titleText, titleIcons);
        //     AppendChildToParentElementUsingElement(productContent, titleText);
  
        //     productDescription.innerHTML = `<h2>Product Description</h2> \n` +description;
        //     AppendChildToParentElementUsingElement (productContent, productDescription);
            
        //    AddClassToElement (productRating, "stars");
        //    for (let i= 0; i < 5; i++) {
        //       const ratingStars = CreateNewElement("i");
        //       AddClassToElement (ratingStars, "fas");
        //       AddClassToElement (ratingStars, "fa-star");
        //       AppendChildToParentElementUsingElement (productRating, ratingStars);
        //    };
        //    AppendChildToParentElementUsingElement (productContent, productRating);
  
        //    AddClassToElement (productPrice, 'price');
        //    productPrice.innerHTML = "Ksh. "+price;
        //    productPriceEstimate.innerHTML = "Ksh. "+(price + 40);
        //    AppendChildToParentElementUsingElement(productPrice, productPriceEstimate);
        //    AppendChildToParentElementUsingElement(productContent, productPrice);
  
        //    AddClassToElement (buyNowBtn, 'btn');
        //    AddAttributeToElement(buyNowBtn, "href", "#");
        //    AppendChildToParentElementUsingElement(productContent, buyNowBtn);
  
        //    AppendChildToParentElementUsingElement(divProductBox, productContent);
  
        //    AppendChildToParentElement("box-container", 
        //    GetSelectedElementWithClassName, divProductBox);
        //   }
        // );
        console.log (data.data)
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  PullBlogsFromBackendAPI();