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

const AppendChildToDynamicElement = (parent, child) => {
  parent.appendChild(child);
};

const AddClass = (element, className) => {
  element.classList.add(className);
};

const Cart = e => {
  e.preventDefault();
  ClearContent(FindSingleElement, "#body");
  setTimeout(() => {
    const cartDiv = CreateNewHTMLElement('div');
    AddClass (cartDiv, "cart-container");

    constlocalStorage.getItem('cart-items');

    const emptyCartTextSpan = CreateNewHTMLElement("span");
    AddClass (emptyCartTextSpan, "emptyCartTextSpan");
    emptyCartTextSpan.innerHTML = "Your Cart is empty";
    AppendChildToDynamicElement (cartDiv, emptyCartTextSpan);
    AppendHTMLChildToStaticElement(
      "#body",
      FindSingleElement,
      cartDiv
    );

   const goBackToGoProductButton = CreateNewHTMLElement("button"); 
   AddClass (goBackToGoProductButton, 'btn');
   AddClass (goBackToGoProductButton, 'go-back-to-product')
   goBackToGoProductButton.textContent = "Go back to product";
   AppendChildToDynamicElement(cartDiv, goBackToGoProductButton);

  }, 1500);
};

FindSingleElement(".cart").addEventListener("click", Cart);
