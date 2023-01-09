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

const displayTable = CreateNewHTMLElement('table');

const DisplayCartItems = (cartItemsArray) => {
  const tableHeader = CreateNewHTMLElement('thead');
  const tableHeaderRow = CreateNewHTMLElement('tr');
  CartTableHeadingsArray.map (
    item => {
      const tableHeading = CreateNewHTMLElement('th');
      tableHeading.innerHTML = item;
      AppendChildToDynamicElement (tableHeaderRow, tableHeading);
    }
  );
  AppendChildToDynamicElement (tableHeader, tableHeaderRow);
  AppendChildToDynamicElement (displayTable, tableHeader);

  //Table Body:
  const tableBody = CreateNewHTMLElement('tbody');
  cartItemsArray.map (
    item => {
      
    }
  );
  // const displayHeadingRow = CreateNewHTMLElement('div');
  // AddClass(displayHeadingRow, 'display-item-row');
  // for (let i = 0; i < CartTableHeadingsArray.length; i++) {
  //   const tableHeading = CreateNewHTMLElement ('span');
  //   AddClass(tableHeading, 'display-item-heading');
  //   tableHeading.innerHTML = CartTableHeadingsArray[i];
  //   AppendChildToDynamicElement (displayHeadingRow, tableHeading);
  // };
  // AppendChildToDynamicElement (displayContainer, displayHeadingRow);

  // const displayBodyRow = CreateNewHTMLElement ('div');
  // AddClass(displayBodyRow, 'display-item-body');
  // for (let k =0; k < cartItemsArray.length; k++) {
  //   const displayItemImage = CreateNewHTMLElement ('img');
  //   AddClass (displayItemImage, 'cart-display-image');
  //   AddClass (displayItemImage, 'cart-display-item-row');
  //   AddClass(displayItemImage, 'cart-items-first-column');
  //   AddAttributeToElement (
  //     displayItemImage, 
  //     'src', 
  //     `https://service.goebaide.com/${cartItemsArray[k].image}`
  //     );

  //     AppendChildToDynamicElement (displayBodyRow, displayItemImage);

  //     const displayItemTitle = CreateNewHTMLElement ('span');
  //     AddClass(displayItemTitle, 'display-item-title');
  //     AddClass(displayItemTitle, 'cart-items-second-column');
  //     AddClass (displayItemTitle, 'cart-display-item-row');
  //     displayItemTitle.innerHTML = cartItemsArray[k].title; 
  //     AppendChildToDynamicElement(displayBodyRow, displayItemTitle);

  //     const displayItemSize = CreateNewHTMLElement ('span');
  //     AddClass(displayItemSize, 'display-item-title');
  //     AddClass(displayItemSize, 'cart-items-third-column');
  //     AddClass (displayItemSize, 'cart-display-item-row');
  //     displayItemSize.innerHTML = cartItemsArray[k].itemSize; 
  //     AppendChildToDynamicElement(displayBodyRow, displayItemSize);

  //     const displayItemQuantity = CreateNewHTMLElement ('span');
  //     AddClass(displayItemQuantity, 'display-item-title');
  //     AddClass(displayItemQuantity, 'cart-items-fourth-column');
  //     AddClass (displayItemQuantity, 'cart-display-item-row');
  //     displayItemQuantity.innerHTML = cartItemsArray[k].itemQuantityToBuy; 
  //     AppendChildToDynamicElement(displayBodyRow, displayItemQuantity);

  //     const displayItemPrice = CreateNewHTMLElement ('span');
  //     AddClass(displayItemPrice, 'display-item-title');
  //     AddClass (displayItemPrice, 'cart-display-item-row');
  //     AddClass (displayItemPrice, 'cart-items-second-last-column');
  //     displayItemPrice.innerHTML = '600'; 
  //     AppendChildToDynamicElement(displayBodyRow, displayItemPrice);

  //     const displayItemDeleteIcom = CreateNewHTMLElement ('span');
  //     const transhIcon = CreateNewHTMLElement('i');
  //     AddClass(displayItemDeleteIcom, 'display-item-title');
  //     AddClass (displayItemDeleteIcom, 'cart-display-item-row');
  //     AddClass (displayItemDeleteIcom, 'cart-items-last-column');
  //     AddClass (transhIcon, 'fas');
  //     AddClass (transhIcon, 'fa-trash');
  //     //displayItemDeleteIcom.innerHTML = 'delete'; 
  //     AppendChildToDynamicElement (displayItemDeleteIcom, transhIcon);
  //     AppendChildToDynamicElement(displayBodyRow, displayItemDeleteIcom);
      
  //     const tableDataSize = CreateNewHTMLElement ('td');
  //     tableDataSize.innerHTML = cartItemsArray[k].itemSize; 
    // if (k === cartItemsArray.length){
    //   const trashIcon = CreateNewHTMLElement('i');
    //   AddClass (trashIcon, 'fas');
    //   AddClass (trashIcon, 'fa-trash-o');
    //   AppendChildToDynamicElement (tableData, trashIcon);
    // }
  //   AppendChildToDynamicElement (displayTableBodyRow, tableDataImageHolder);
  //   AppendChildToDynamicElement (displayTableBodyRow, tableDataTitle);
  //   AppendChildToDynamicElement (displayTableBodyRow, tableDataSize);
 // };
  // AppendChildToDynamicElement (displayTableBody, displayTableBodyRow);
  //AppendChildToDynamicElement (displayContainer, displayBodyRow);
  
  
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
    AppendChildToDynamicElement (cartDiv, displayTable);
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
