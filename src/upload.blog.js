const GetElementById = id => {
    const element = document.getElementById(id);
    return element;
  };
  
  const GetSelectedElementValue = (element, id) => {
    return element(id).value;
  };
  
  const GetSelectedElementFile = (element, id) => {
    return element(id).files[0];
  };
  
  const CreateNewElement = element => {
    const newElement = document.createElement(element);
    return newElement;
  };
  
  const ErrorMessage = message => {
    const errorParagraph = CreateNewElement("p");
    errorParagraph.innerHTML = message;
    return errorParagraph;
  };
  
  const ClearErrorMessage = id => {
    if (GetElementById(id).childElementCount > 9) {
      GetElementById(id).removeChild(GetElementById(id).firstElementChild);
    }
  };
  
  const AppendErrorMessage = (id, cb, message) => {
    ClearErrorMessage(id);
    GetElementById(id).prepend(cb(message));
  };
  
  const GetToken = () => {
    const token = sessionStorage.getItem("login_token");
    return token;
  };
  
  const uploadApiUri = "https://service.goebaide.com/api/blog/new";
  
  const PingFetchRequest = e => {
    e.preventDefault();
    //product properties
    const title = GetSelectedElementValue(GetElementById, "title-input");
    const description = GetSelectedElementValue(
      GetElementById,
      "description-input"
    );
    const image = GetSelectedElementFile(GetElementById, "image-input");
  
    if (
      !title ||
      !description ||
      !image
    ) {
      window.location.href = "/html/upload.blog.html#section_upload_blog";
      setTimeout(
        AppendErrorMessage(
          "upload_product",
          ErrorMessage,
          "All fields must be provided!"
        ),
        100
      );
      return;
    }
  
    ClearErrorMessage("upload_product");
  
    const blogObject = {
      title,
      description,
      blog_image: image
    };
  
    //console.log(blogObject);
  
    const formData = new FormData();
  
    formData.append('title', blogObject.title);
    formData.append('body', blogObject.description);
    formData.append('blog_image', blogObject.blog_image);
  
    fetch(uploadApiUri, {
      method: "POST",
      body: formData,
      headers:{
        Authorization:"Bearer " +GetToken()
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          AppendErrorMessage("upload_product", ErrorMessage, data.error);
          setTimeout(
            window.location.href = "/index.html#login-form-container", 5000
          );
          return;
        }
        //console.log(data);
        AppendErrorMessage("upload_product", ErrorMessage, data.message);
        setTimeout(window.location.reload(), 5000);
      })
      .catch(err => {
        AppendErrorMessage("upload_product", ErrorMessage, err.error);
      });
  };
  
  GetElementById("upload_product").addEventListener("submit", PingFetchRequest);