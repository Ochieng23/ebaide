const newElement = tag => {
    const newElement = document.createElement(tag);
    return newElement;
  };
  const clearingElement = (child) => {
    return child.remove()
  };
  //Get Element
  const ElementById = id => {
    const element = document.getElementById(id);
    return element;
  };
  //Error handling
  const Error = msg => {
    const para = newElement("p");
    para.innerHTML = msg;
    ElementById("reg_form").appendChild(para);
  };
  
  const successMessage = (parentElement, msg) => {
    const para = newElement("p");
    para.innerHTML = msg;
    return ElementById(parentElement).appendChild(para);
  };
  