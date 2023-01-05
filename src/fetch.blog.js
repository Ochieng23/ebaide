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
          let textString = temp[prop] > 1 ? "yrs ago" : "yr ago";
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        }
        break;
      case "months":
        if (temp[prop] < 1) {
          continue;
        } else {
          let textString = temp[prop] > 1 ? "months ago" : "month ago";
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
          let textString = temp[prop] > 1 ? "days ago" : "day ago";
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        }
        break;
      case "hours":
        if (temp[prop] < 1) {
          continue;
        } else {
          let textString = temp[prop] > 1 ? "hrs ago" : "hr ago";
          outputSincePosted = [...outputSincePosted, temp[prop] + textString];
        }
        break;
      case "minutes":
        if (temp[prop] < 1) {
          continue;
        } else {
          let textString = temp[prop] > 1 ? "mins ago" : "min ago";
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
        titleText.innerHTML = title;
        AppendChildToParentUsingElement(productContent, titleText);
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
            return blog.blogid = blogid;
          });
          console.log (SingleBlog[0])
          //FETCH SINGLE BLOG:
          ClearElementContent(QuerySelectorForDocumentElement, "#body");
          setTimeout(() => {
            const productContainer = CreateElement("div");

            const productBox = CreateElement("div");
            AddClassToElement(productBox, "col-lg-5");
            AddClassToElement(productBox, "col-md-12");
            AddClassToElement(productBox, "col-12");
            AddAttributeToElement(productBox, "id", SingleBlog[0].blogid);

            const productFirstImage = CreateElement("img");
            AddClassToElement(productFirstImage, "mt-5");
            AddClassToElement(productFirstImage, "img-fluid");
            AddClassToElement(productFirstImage, "w-100");
            AddAttributeToElement(
              productFirstImage,
              "alt",
              "blog image"
            );
            AddAttributeToElement(
              productFirstImage,
              "style",
              "width: 300px; height: auto;"
            );
            AddAttributeToElement(
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
            AddAttributeToElement(
              productInformation,
              "style",
              "background-color: white;"
            );

            const productTitle = CreateElement("h1");
            AddAttributeToElement(
              productTitle,
              "style",
              "font-weight: bolder;"
            );
            productTitle.innerHTML = SingleBlog[0].title;

            AppendChildToParentUsingElement(
              productInformation,
              productTitle
            );

            const productPriceSpanHolder = CreateElement("h2");
            AddClassToElement(productPriceSpanHolder, "price");

            const priceSpanHolder = CreateElement("span");
            priceSpanHolder.innerHTML = SingleBlog[0].date;
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
                return;
              }
              window.location.reload();
              });
              AppendChildToParentUsingElement(
                productInformation,
                continueShoppingButton
              );
              const fullDescriptionTextSpan = CreateElement("span");
              fullDescriptionTextSpan.innerHTML = SingleBlog[0].description;
              AppendChildToParentUsingElement(
                productInformation,
                fullDescriptionTextSpan
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
