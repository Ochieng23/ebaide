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

const CartTableHeadingsArray = [
  "image",
  "title",
  "size",
  "quantity",
  "price per item",
  "remove"
];

const displayContainer = CreateNewHTMLElement('div');

const DisplayCartItems = (cartItemsArray) => {
  const displayRow = CreateNewHTMLElement('div');
  for (let i = 0; i < CartTableHeadingsArray.length; i++) {
    const tableHeading = CreateNewHTMLElement ('span');
    tableHeading.innerHTML = CartTableHeadingsArray[i];
    AppendChildToDynamicElement (displayTableHeaderRow, tableHeading);
  };
  AppendChildToDynamicElement (displayTableHeader, displayTableHeaderRow);
  AppendChildToDynamicElement (displayContainer, displayTableHeader);

  const displayTableBody = CreateNewHTMLElement('tbody');
  const displayTableBodyRow = CreateNewHTMLElement('tr');
  for (let k =0; k < cartItemsArray.length; k++) {
    const tableDataImageHolder = CreateNewHTMLElement ('td');
    const tableImage = CreateNewHTMLElement('img');
    AddClass (tableImage, 'cart-display-image');
    AddAttributeToElement (
      tableImage, 
      'src', 
      `https://service.goebaide.com/${cartItemsArray[k].image}`
      );

      AppendChildToDynamicElement (tableDataImageHolder, tableImage);

      const tableDataTitle = CreateNewHTMLElement ('td');
      tableDataTitle.innerHTML = cartItemsArray[k].title; 
      
      const tableDataSize = CreateNewHTMLElement ('td');
      tableDataSize.innerHTML = cartItemsArray[k].itemSize; 
    // if (k === cartItemsArray.length){
    //   const trashIcon = CreateNewHTMLElement('i');
    //   AddClass (trashIcon, 'fas');
    //   AddClass (trashIcon, 'fa-trash-o');
    //   AppendChildToDynamicElement (tableData, trashIcon);
    // }
    AppendChildToDynamicElement (displayTableBodyRow, tableDataImageHolder);
    AppendChildToDynamicElement (displayTableBodyRow, tableDataTitle);
    AppendChildToDynamicElement (displayTableBodyRow, tableDataSize);
  };
  AppendChildToDynamicElement (displayTableBody, displayTableBodyRow);
  AppendChildToDynamicElement (displayContainer, displayTableBody);
  
  
};

const Cart = e => {
  e.preventDefault();
  ClearContent(FindSingleElement, "#body");
  setTimeout(() => {
    const cartDiv = CreateNewHTMLElement("div");
    AddClass(cartDiv, "cart-container");

    const cartItems = JSON.parse(localStorage.getItem("cart-items"));
    if (cartItems.length < 1) {
      const emptyCartTextSpan = CreateNewHTMLElement("span");
      AddClass(emptyCartTextSpan, "emptyCartTextSpan");
      emptyCartTextSpan.innerHTML = "Your Cart is empty";
      AppendChildToDynamicElement(cartDiv, emptyCartTextSpan);
    }

    DisplayCartItems (cartItems);
    console.log(cartItems);

    AppendChildToDynamicElement (cartDiv, displayContainer);
    const goBackToGoProductButton = CreateNewHTMLElement("button");
    AddClass(goBackToGoProductButton, "btn");
    AddClass(goBackToGoProductButton, "go-back-to-product");
    goBackToGoProductButton.textContent = "Go back to product";
    AppendChildToDynamicElement(cartDiv, goBackToGoProductButton);

    goBackToGoProductButton.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "index.html#packages";
      if (
        window.location.href === "http://localhost:5503/index.html#packages"
      ) {
        window.location.reload();
      }
    });

    AppendHTMLChildToStaticElement("#body", FindSingleElement, cartDiv);
  }, 1500);
};

FindSingleElement(".cart").addEventListener("click", Cart);
