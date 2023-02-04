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

const BlogBackendAPIURI = "https://api.goebaide.com/api/blog/get";

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
          `https://api.goebaide.com/${image}`
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
            const blogContainer = CreateElement("div");
            AddClassToElement(blogContainer, "blog-container");
            AddAttributeNamedElement(blogContainer, "id", SingleBlog[0].blogid);

            const blogHeadingSection = CreateElement("div");
            AddClassToElement(blogHeadingSection, "blog-heading-section");
            const blogTitle = CreateElement("h1");
            AddAttributeNamedElement(
              blogTitle,
              "style",
              "font-weight: bolder;"
            );
            blogTitle.innerHTML = SingleBlog[0].title;

            AppendChildToParentUsingElement(
              blogHeadingSection,
              blogTitle
            );
            AppendChildToParentUsingElement(blogContainer, blogHeadingSection);


            const blogImageSection = CreateElement("div");
            AddClassToElement(blogImageSection,"blog-image-section")
            const productFirstImage = CreateElement("img");
            AddAttributeNamedElement(
              productFirstImage,
              "alt",
              "blog image"
            );
            
            AddAttributeNamedElement(
              productFirstImage,
              "src",
              `https://api.goebaide.com/${SingleBlog[0].image}`
            );
            AppendChildToParentUsingElement(
              blogImageSection,
              productFirstImage
            );

            AppendChildToParentUsingElement(
              blogContainer,
              blogImageSection
            );
            
            const blogContentSection = CreateElement("div");
            AddClassToElement(blogContentSection,"blog-content-section")
            const fullDescriptionTextSpan = CreateElement("span");
            AddClassToElement (fullDescriptionTextSpan, "blog-description");
            fullDescriptionTextSpan.innerHTML = SingleBlog[0].content;
            AppendChildToParentUsingElement(
              blogContentSection,
              fullDescriptionTextSpan
              );
            AppendChildToParentUsingElement(
              blogContainer,
              blogContentSection
            );

            const blogMetadata = CreateElement("div");
            AddClassToElement(blogMetadata, "blogMetadata");
            const blogPostDateMetadata = CreateElement("span");
            setInterval(() => {
              let resultArray = PostedDateUpdater(PostDateCount, SingleBlog[0].date);
              let resultArrayLength = resultArray.length;
              (blogPostDateMetadata.innerHTML =
                "\n" + resultArray[resultArrayLength - 1]), 1000;
            });
            AppendChildToParentUsingElement(
              blogMetadata,
              blogPostDateMetadata
            );
            AppendChildToParentUsingElement(
              blogContainer,
              blogMetadata
            );

            const blogButtonSection = CreateElement("div");
            AddClassToElement(blogButtonSection, "blog-button-section");
            const continueReading = CreateElement("button");
            AddClassToElement(continueReading, "btn");
            continueReading.innerHTML = "Continue reading";
            continueReading.addEventListener("click", e => {
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
                blogButtonSection,
                continueReading
              );
              AppendChildToParentUsingElement(
                blogContainer,
                blogButtonSection
              );
              
              AppendChildToParent(
                "#body",
                GetElementWithClassName,
                blogContainer
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
