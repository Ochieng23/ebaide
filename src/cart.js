const FindSingleElement = identifer => {
  const element = document.querySelector(identifer);
  return element;
};

let cartTotal = 0;

const ClearContent = (cb, identifer) => {
  const element = cb(identifer);
  element.innerHTML = "";
};

const RemoveElement = (element) => {
  element.remove();
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

const xButton = CreateNewHTMLElement("span");
xButton.innerHTML = "&#10005;";

const ErrorMessage = (cb1, cb2, tag, parentElement, message) => {
  const element = cb1(tag);
  AddClass(element, "cart-error-message");
  AddAttributeToElement(element, 
    "id",
    "errorMessage"
    );
  element.innerHTML = `
  <span class="closs-error-message-btn" id="closeErrorBtn">${xButton.innerHTML}</span>
   <span class="error-text">${message}</span>`;
  cb2(parentElement, element);
};

const CartTableHeadingsArray = [
  "image",
  "title",
  "size",
  "quantity",
  "price",
  "remove"
];
const cartDiv = CreateNewHTMLElement("div");
const displayTable = CreateNewHTMLElement("table");
AddAttributeToElement(displayTable, "id", "table");
const payButton = CreateNewHTMLElement("button");
const addressContainer = CreateNewHTMLElement("div");

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
    AddAttributeToElement(itemsRow, "id", item.id);
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
    itemPrice.innerHTML = item.price === undefined ? 0 : item.price;
    AppendChildToDynamicElement(itemsRow, itemPrice);

    //Delete Product:
    const deleteItem = CreateNewHTMLElement("td");
    const deleteItemIcon = CreateNewHTMLElement("i");
    AddClass(deleteItemIcon, "fas");
    AddClass(deleteItemIcon, "fa-trash");
    AppendChildToDynamicElement(deleteItem, deleteItemIcon);
    AppendChildToDynamicElement(itemsRow, deleteItem);

    //Handling onclick of delete
    deleteItemIcon.addEventListener("click", () => {
      const itemID = deleteItemIcon.parentElement.parentElement.id;
      const storedItems = JSON.parse(
        localStorage.getItem("cart-items") || "[]"
      );

      const updatedList = storedItems.filter(item => item.id !== itemID);
      localStorage.setItem("cart-items", JSON.stringify(updatedList));
      ClearContent(FindSingleElement, "#table");
      DisplayCartItems(updatedList);
    });

    AppendChildToDynamicElement(tableBody, itemsRow);
  });
  AppendChildToDynamicElement(displayTable, tableBody);

  let sum = 0;
  for (let i = 0; i < cartItemsArray.length; i++) {
    let q = cartItemsArray[i].itemQuantityToBuy;
    let p = cartItemsArray[i].price;
    let qp = parseInt(q) * parseInt(p);
    sum += qp;
  }

  //Table Footer
  const tableFooter = CreateNewHTMLElement("tfoot");
  const footerRow = CreateNewHTMLElement("tr");
  const total = CreateNewHTMLElement("td");
  AddAttributeToElement(total, "colspan", "3");
  total.innerHTML = "Total";
  const totalValue = CreateNewHTMLElement("td");
  totalValue.innerHTML = sum;
  AddAttributeToElement(totalValue, "colspan", "3");
  AppendChildToDynamicElement(footerRow, total);
  AppendChildToDynamicElement(footerRow, totalValue);
  AppendChildToDynamicElement(tableFooter, footerRow);
  AppendChildToDynamicElement(displayTable, tableFooter);

  payButton.innerHTML = `Pay ${sum}`;
  cartTotal += sum;
};

const Cart = e => {
  e.preventDefault();
  ClearContent(FindSingleElement, "#body");
  setTimeout(() => {
    AddClass(cartDiv, "cart-container");

    const cartItems = JSON.parse(localStorage.getItem("cart-items") || "[]");
    if (cartItems.length < 1) {
      const emptyCartTextSpan = CreateNewHTMLElement("span");
      AddClass(emptyCartTextSpan, "emptyCartTextSpan");
      emptyCartTextSpan.innerHTML = "Your Cart is empty";
      AppendChildToDynamicElement(cartDiv, emptyCartTextSpan);
    }

    DisplayCartItems(cartItems);
    AppendChildToDynamicElement(cartDiv, displayTable);

    const cartButtomCollection = CreateNewHTMLElement("div");
    AddClass(cartButtomCollection, "cartButtomCollection");
    const goBackToGoProductButton = CreateNewHTMLElement("button");
    AddClass(goBackToGoProductButton, "btn");
    AddClass(goBackToGoProductButton, "go-back-to-product");
    goBackToGoProductButton.textContent = "Go back to product";
    AppendChildToDynamicElement(cartButtomCollection, goBackToGoProductButton);

    AddClass(payButton, "pay-button");
    AppendChildToDynamicElement(cartButtomCollection, payButton);
    AppendChildToDynamicElement(cartDiv, cartButtomCollection);

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

const UserAddress = () => {
  const formContainer = CreateNewHTMLElement ("div");
  AddClass(formContainer, "form-container");
  const form = CreateNewHTMLElement("form");
  AddClass (form, "address-form");
  const fnameDiv = CreateNewHTMLElement("div");
  AddClass (fnameDiv, "input-div");
  const labelFName = CreateNewHTMLElement("label");
  labelFName.innerHTML = "First Name *";
  const inputFName = CreateNewHTMLElement("input");
  AddAttributeToElement (
    inputFName,
    "required",
    true
  );
  AddAttributeToElement (
    inputFName,
    "maxlength",
    "26"
  );
  AddAttributeToElement (
    inputFName,
    "minlength",
    "2"
  );
  AddAttributeToElement (
    inputFName,
    "type",
    "text"
  );

  const lnameDiv = CreateNewHTMLElement("div");
  const labelLName = CreateNewHTMLElement("label");
  labelLName.innerHTML = "Last Name *";
  const inputLName = CreateNewHTMLElement("input");
  AddAttributeToElement (
    inputLName,
    "required",
    true
  );
  AddAttributeToElement (
    inputLName,
    "maxlength",
    "26"
  );
  AddAttributeToElement (
    inputLName,
    "minlength",
    "2"
  );
  AddAttributeToElement (
    inputLName,
    "type",
    "text"
  );

  const phoneDiv = CreateNewHTMLElement("div");
  const labelPhone = CreateNewHTMLElement("label");
  labelPhone.innerHTML = "Phone Number *";
  const inputPhone = CreateNewHTMLElement("input");
  AddAttributeToElement (
    inputPhone,
    "type",
    "tel"
  );
  AddAttributeToElement (
    inputPhone,
    "required",
    true
  );

  const addressDiv = CreateNewHTMLElement("div");
  const deliveryAddressLabel = CreateNewHTMLElement("label");
  deliveryAddressLabel.innerHTML = "Delivery Address *";
  const deliveryAddress = CreateNewHTMLElement("textarea");
  AddAttributeToElement (
    deliveryAddress,
    "col",
    "5"
  );
  AddAttributeToElement (
    deliveryAddress,
    "row",
    "3"
  );
  AddAttributeToElement (
    deliveryAddress,
    "required",
    true
  );

  const saveAddressBtnDiv = CreateNewHTMLElement("div");
  const saveAddressBtn = CreateNewHTMLElement("button");
  saveAddressBtn.innerHTML = "Save Address";

  AddAttributeToElement (
    saveAddressBtn,
    "type",
    "button"
  );

  AppendChildToDynamicElement (labelFName, inputFName);
  AppendChildToDynamicElement (labelLName, inputLName);
  AppendChildToDynamicElement (labelPhone, inputPhone);
  AppendChildToDynamicElement (deliveryAddressLabel, deliveryAddress);

  AppendChildToDynamicElement (fnameDiv, labelFName);
  AppendChildToDynamicElement (lnameDiv, labelLName);
  AppendChildToDynamicElement (phoneDiv, labelPhone);
  AppendChildToDynamicElement (addressDiv, deliveryAddress);
  AppendChildToDynamicElement (saveAddressBtnDiv, saveAddressBtn);

  AppendChildToDynamicElement(form, fnameDiv);
  AppendChildToDynamicElement(form, lnameDiv);
  AppendChildToDynamicElement(form, phoneDiv);
  AppendChildToDynamicElement(form, addressDiv);
  AppendChildToDynamicElement(form, saveAddressBtnDiv);



  AppendChildToDynamicElement (formContainer, form);
  AppendChildToDynamicElement (addressContainer, formContainer);
  AddClass(addressContainer, 'address-container');
  AppendHTMLChildToStaticElement (
    "#body",
    FindSingleElement,
    addressContainer
  );
};


FindSingleElement(".cart").addEventListener("click", Cart);
payButton.addEventListener("click", () => {
  if (payButton.innerHTML === "Pay 0") {
    if (
      cartDiv.children.length > 3
    ){
      RemoveElement (
        FindSingleElement ("#errorMessage")
      );
    };
    ErrorMessage(
      CreateNewHTMLElement,
      AppendChildToDynamicElement,
      "p",
      cartDiv,
      "Go back to product page to add items to cart "
    );
    const errorPara = cartDiv.children.errorMessage;
    const closeErrorMessageBtn = errorPara.children.closeErrorBtn;
    closeErrorMessageBtn.addEventListener("click", (e) => {
      e.preventDefault ();
      RemoveElement (
        FindSingleElement ('#errorMessage')
      );
    });
    return;
  }
  let checkOutArray = [];
  const itemsArray = JSON.parse(localStorage.getItem("cart-items"));
  checkOutArray = [...itemsArray, {amount: cartTotal}];
  sessionStorage.setItem (
    "order-items", JSON.stringify(checkOutArray)
  );

  ClearContent (FindSingleElement, "#body");
  UserAddress ();

});