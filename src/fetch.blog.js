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
   let outputSincePosted = '';
   for (let prop in temp) {
    switch (prop) {
      case 'years':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "years ago" :'year ago';
          return outputSincePosted += temp[prop] + textString;
        };
      case 'months':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "months ago" :'month ago';
          return outputSincePosted += temp[prop] + "months ago";
        };
      case 'weeks':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "weeks ago" :'week ago';
          return outputSincePosted += temp[prop] + textString;
        };
      case 'days':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "days ago" :'day ago';
          return outputSincePosted += temp[prop] +  "days ago";
        };
      case 'hours':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "hours ago" :'hour ago';
          return outputSincePosted += temp[prop] + "hours ago";
        };
      case 'minutes':
        if (temp[prop] < 1){
          continue;
        }else{
          let textString = temp[prop] > 1 ? "minutes ago" :'minute ago';
          return outputSincePosted += temp[prop] + textString;
        };
      default:
          let textString = temp[prop] > 1 ? "seconds ago" :'second ago';
          return outputSincePosted += temp[prop] + textString;
    };
   };
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
  
            titleText.innerHTML = title;
            AppendChildToParentUsingElement(productContent, titleText);
  
            productDescription.innerHTML = `\n` +content;
            AppendChildToParentUsingElement (productContent, productDescription);
  
           AddClassToElement (productPrice, 'price');
           productPrice.innerHTML = "\n" +  setInterval (
            PostedDateUpdater (PostDateCount, date), 1000
           );
           AppendChildToParentUsingElement(productContent, productPrice);
  
           buyNowBtn.innerHTML = "Read more...";
           AddClassToElement (buyNowBtn, 'btn');
           AddAttributeNamedElement(buyNowBtn, "href", "#");
           AddAttributeNamedElement(buyNowBtn, "type", "button");
           AppendChildToParentUsingElement(productContent, buyNowBtn);
  
           AppendChildToParentUsingElement(divProductBox, productContent);
  
           AppendChildToParent("#box-container", 
           GetElementWithClassName, divProductBox);
          }
        );
        //console.log (data.data)
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  PullBlogsFromBackendAPI();