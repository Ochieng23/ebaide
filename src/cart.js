const FindSingleElement = identifer => {
  const element = document.querySelector(identifer);
  return element;
};

// const FindSingleElementByID = (identifer) => {
//     const element = document.getElementById(identifer);
//     return element;
// };

const ClearContent = (cb, identifer) => {
  const element = cb(identifer);
  element.innerHTML = "";
};

const CreateNewHTMLElement = tag => {
  const newElement = document.createElement(tag);
  return newElement;
};

const AppendHTMLChildToStaticElement = (indentifier, cb, child) => {
  cb(indentifier).appendChild(child);
};

const AppendChildToDynamicElement = ()

const Cart = e => {
  e.preventDefault();
  ClearContent(FindSingleElement, "#body");
  setTimeout(() => {
    const cartDiv = CreateNewHTMLElement('div');
    const emptyCartTextSpan = CreateNewHTMLElement("span");
    emptyCartTextSpan.innerHTML = "Your Cart is empty";
    AppendHTMLChildToStaticElement(
      cartDiv,
      FindSingleElement,
      emptyCartTextSpan
    );
  }, 1500);
};

FindSingleElement(".cart").addEventListener("click", Cart);
