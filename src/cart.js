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
  "price",
  "remove"
];

const displayTable = CreateNewHTMLElement("table");

const DisplayCartItems = cartItemsArray => {
  const tableHeader = CreateNewHTMLElement("thead");
  const tableHeaderRow = CreateNewHTMLElement("tr");
  CartTableHeadingsArray.map(item => {
    const tableHeading = CreateNewHTMLElement("th");
    tableHeading.innerHTML = item;
    AppendChildToDynamicElement(tableHeaderRow, tableHeading);
  });
  AppendChildToDynamicElement(tableHeader, tableHeaderRow);
  AppendChildToDynamicElement(displayTable, tableHeader);

  //Table Body:
  const tableBody = CreateNewHTMLElement("tbody");
  cartItemsArray.map(item => {
    const itemsRow = CreateNewHTMLElement("tr");
    AddAttributeToElement (itemsRow, 'id', item.id);
    //product image
    const itemImageTD = CreateNewHTMLElement("td");
    const itemImage = CreateNewHTMLElement("img");
    AddAttributeToElement(
      itemImage,
      "src",
      `https://service.goebaide.com/${item.image}`
    );
    AddClass(itemImage, "cart-display-image");

    AppendChildToDynamicElement(itemImageTD, itemImage);
    AppendChildToDynamicElement(itemsRow, itemImageTD);

    //Product Title:
    const itemTitle = CreateNewHTMLElement("td");
    itemTitle.innerHTML = item.title;
    AppendChildToDynamicElement(itemsRow, itemTitle);

    //Product Size:
    const itemSize = CreateNewHTMLElement("td");
    itemSize.innerHTML = item.itemSize;
    AppendChildToDynamicElement(itemsRow, itemSize);

    //Product Qunatity:
    const itemQuantity = CreateNewHTMLElement("td");
    itemQuantity.innerHTML = item.itemQuantityToBuy;
    AppendChildToDynamicElement(itemsRow, itemQuantity);

    //Product Price:
    const itemPrice = CreateNewHTMLElement("td");
    itemPrice.innerHTML = '1200';
    AppendChildToDynamicElement(itemsRow, itemPrice);

     //Delete Product:
     const deleteItem = CreateNewHTMLElement("td");
     const deleteItemIcon = CreateNewHTMLElement("i");
     AddClass (deleteItemIcon, 'fas');
     AddClass (deleteItemIcon, 'fa-trash');
     AppendChildToDynamicElement (deleteItem, deleteItemIcon);
     AppendChildToDynamicElement(itemsRow, deleteItem);

    AppendChildToDynamicElement(tableBody, itemsRow);
  });
  AppendChildToDynamicElement(displayTable, tableBody);
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

    DisplayCartItems(cartItems);
    console.log(cartItems);
    AppendChildToDynamicElement(cartDiv, displayTable);
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
