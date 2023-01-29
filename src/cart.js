const FindSingleElement = identifer => {
  const element = document.querySelector(identifer);
  return element;
};

let cartTotal = 0;

const ClearContent = (cb, identifer) => {
  const element = cb(identifer);
  element.innerHTML = "";
};

const RemoveElement = element => {
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
  AddAttributeToElement(element, "id", "errorMessage");
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
const phoneNumberPageContainer = CreateNewHTMLElement("div");
const checkoutContainer = CreateNewHTMLElement("div");

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
      `https://api.goebaide.com/${item.img}`
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
      //Cart();
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

const Cart = () => {
  //e.preventDefault();
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

    if (cartItems.length > 0) {
      DisplayCartItems(cartItems);
      AppendChildToDynamicElement(cartDiv, displayTable);
    }
    const cartButtomCollection = CreateNewHTMLElement("div");
    AddClass(cartButtomCollection, "cartButtomCollection");
    const goBackToGoProductButton = CreateNewHTMLElement("button");
    AddClass(goBackToGoProductButton, "btn");
    AddClass(goBackToGoProductButton, "go-back-to-product");
    goBackToGoProductButton.textContent = "Go back to product";
    AppendChildToDynamicElement(cartButtomCollection, goBackToGoProductButton);
    if (cartItems.length > 0) {
      AddClass(payButton, "pay-button");
      AppendChildToDynamicElement(cartButtomCollection, payButton);
    }
    if (cartButtomCollection.children.length < 2) {
      RemoveClassFromNewElement(cartButtomCollection, "cartButtomCollection");
      AddClass(cartButtomCollection, "single-button-state");
    }
    AppendChildToDynamicElement(cartDiv, cartButtomCollection);
    goBackToGoProductButton.addEventListener("click", e => {
      e.preventDefault();
      window.location.href = "https://goebaide.com/index.html#packages";
      if (window.location.href === "https://goebaide.com/index.html#packages") {
        window.location.reload();
        setTimeout(
          (window.location.href = "https://goebaide.com/index.html#packages"),
          1500
        );
      }
    });

    AppendHTMLChildToStaticElement("#body", FindSingleElement, cartDiv);
  }, 1500);
};

//CHECKOUT PAGE:
const CheckoutPage = () => {
  AddClass(checkoutContainer, "Checkout-container");
  const checkOutDiv = CreateNewHTMLElement("div");
  AddClass(checkOutDiv, "checkout-box");
  const orderSummeryHeadingSection = CreateNewHTMLElement("div");
  AddClass(orderSummeryHeadingSection, "order-header");
  const heading = CreateNewHTMLElement("h2");
  heading.innerHTML = "Order summary";
  AppendChildToDynamicElement(orderSummeryHeadingSection, heading);

  const editCartButton = CreateNewHTMLElement("button");
  editCartButton.innerHTML = "Edit cart";
  AppendChildToDynamicElement(orderSummeryHeadingSection, editCartButton);
  AppendChildToDynamicElement(checkOutDiv, orderSummeryHeadingSection);

  //EDIT Cart ACTION:
  editCartButton.addEventListener("click", event => {
    setTimeout(() => {
      window.location.reload();
      //Cart();
    }, 1500);
  });

  const orderSummeryBodySection = CreateNewHTMLElement("div");
  AddClass(orderSummeryBodySection, "order-body");
  const orderDiscount = CreateNewHTMLElement("div");
  AddClass(orderDiscount, "order-body-items");
  const discountText = CreateNewHTMLElement("span");
  discountText.innerHTML = "Discount 10% OFF";
  AppendChildToDynamicElement(orderDiscount, discountText);
  const discountValue = CreateNewHTMLElement("span");

  //GETTING STORED ORDER:
  let order = JSON.parse(sessionStorage.getItem("order-items"));
  const [{ amount }] = order.filter(orderItem => {
    if (orderItem.amount) {
      return orderItem;
    }
  });
  const discountAmount = Math.floor(Math.random() * 100);
  discountValue.innerHTML = "Ksh. " + discountAmount.toFixed(2);
  AppendChildToDynamicElement(orderDiscount, discountValue);
  AppendChildToDynamicElement(orderSummeryBodySection, orderDiscount);

  const orderShipping = CreateNewHTMLElement("div");
  AddClass(orderShipping, "order-body-items");
  const shippingText = CreateNewHTMLElement("span");
  shippingText.innerHTML = "Express shipping";
  AppendChildToDynamicElement(orderShipping, shippingText);
  const shippingValue = CreateNewHTMLElement("span");
  const shippingAmount = Math.floor(Math.random() * 1000);
  shippingValue.innerHTML = "Ksh. " + shippingAmount.toFixed(0);
  AppendChildToDynamicElement(orderShipping, shippingValue);
  AppendChildToDynamicElement(orderSummeryBodySection, orderShipping);

  const deliveryDate = CreateNewHTMLElement("div");
  AddClass(deliveryDate, "order-body-items");
  AddClass(deliveryDate, "delivery-date");
  const deliveryDateText = CreateNewHTMLElement("span");
  const dateOfOrder = new Date();
  const result = dateOfOrder.setDate(dateOfOrder.getDate() + 7);
  const deliverydate = new Date(result).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  deliveryDateText.innerHTML = "Delivers on " + deliverydate;
  AppendChildToDynamicElement(deliveryDate, deliveryDateText);
  AppendChildToDynamicElement(orderSummeryBodySection, deliveryDate);

  const vatTax = CreateNewHTMLElement("div");
  AddClass(vatTax, "order-body-items");
  const vatTaxText = CreateNewHTMLElement("span");
  AddClass(vatTaxText, "vat-tax");
  vatTaxText.innerHTML = "VAT 16% ";
  AppendChildToDynamicElement(vatTax, vatTaxText);
  AppendChildToDynamicElement(orderSummeryBodySection, vatTax);
  const vatTaxValue = CreateNewHTMLElement("span");
  const vatTaxAmount = amount * 0.16;
  vatTaxValue.innerHTML = "Ksh. " + vatTaxAmount.toFixed(2);
  AppendChildToDynamicElement(vatTax, vatTaxValue);
  AppendChildToDynamicElement(orderSummeryBodySection, vatTax);

  const total = CreateNewHTMLElement("div");
  AddClass(total, "order-body-items");
  AddClass(total, "totals");
  const totalText = CreateNewHTMLElement("span");
  totalText.innerHTML = "Total";
  AppendChildToDynamicElement(total, totalText);
  AppendChildToDynamicElement(orderSummeryBodySection, total);
  const totalValue = CreateNewHTMLElement("span");
  totalValue.innerHTML = "Ksh. " + amount;
  AppendChildToDynamicElement(total, totalValue);
  AppendChildToDynamicElement(orderSummeryBodySection, total);
  AppendChildToDynamicElement(checkOutDiv, orderSummeryBodySection);

  const orderSummeryFooterSection = CreateNewHTMLElement("div");
  AddClass(orderSummeryFooterSection, "order-footer");
  const checkoutButton = CreateNewHTMLElement("button");
  checkoutButton.innerHTML = "ORDER";
  AppendChildToDynamicElement(orderSummeryFooterSection, checkoutButton);
  AppendChildToDynamicElement(checkOutDiv, orderSummeryFooterSection);

  AppendChildToDynamicElement(checkoutContainer, checkOutDiv);
  AppendHTMLChildToStaticElement("#body", FindSingleElement, checkoutContainer);

  //SENDING ORDER TO BACKEND SERVICE:
  checkoutButton.addEventListener("click", () => {
    const orderItems = sessionStorage.getItem("order-items");
    console.log(orderItems);

    //CHECK IF USER IS LOGGED IN:

    if (sessionStorage.getItem("login_token") === null) {
      ClearContent(FindSingleElement, ".Checkout-container");
      const errorParentHolder = FindSingleElement(".Checkout-container");
      ErrorMessage(
        CreateNewHTMLElement,
        AppendChildToDynamicElement,
        "p",
        errorParentHolder,
        "You are not logged in, please login to finish your checkout!"
      );
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      return;
    }
    //SENDING VIA FETCH TO BACKEND IF USER IS LOGGED IN
    const order_processing_URI = `https://api.goebaide.com/api/orders/new-order`;

    const token = sessionStorage.getItem("login_token");
    fetch(order_processing_URI, {
      method: "POST",
      body: orderItems,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          ClearContent(FindSingleElement, ".Checkout-container");
          const errorParentHolder = FindSingleElement(".Checkout-container");
          ErrorMessage(
            CreateNewHTMLElement,
            AppendChildToDynamicElement,
            "p",
            errorParentHolder,
            data.error
          );
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return;
        }

        //CLEAR UP STORAGE:
        sessionStorage.removeItem("order-items");
        localStorage.clear();

        ClearContent(FindSingleElement, ".Checkout-container");
        const errorParentHolder = FindSingleElement(".Checkout-container");
        ErrorMessage(
          CreateNewHTMLElement,
          AppendChildToDynamicElement,
          "p",
          errorParentHolder,
          data.message
        );
        setTimeout(() => {
          window.location.reload();
        }, 8000);
      })
      .catch(error => {
        ClearContent(FindSingleElement, ".Checkout-container");
        const errorParentHolder = FindSingleElement(".Checkout-container");
        ErrorMessage(
          CreateNewHTMLElement,
          AppendChildToDynamicElement,
          "p",
          errorParentHolder,
          error
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  });
};

const PaymentPhoneNumber = () => {
  AddClass(phoneNumberPageContainer, "phonenumber-container");
  const formHolder = CreateNewHTMLElement("div");
  AddClass(formHolder, "form-container");
  const form = CreateNewHTMLElement("form");
  // AddClass(form, "address-form");
  // const phoneNumberDiv = CreateNewHTMLElement("div");
  // AddClass(phoneNumberDiv, "input-div");
  // const phoneNumberLabel = CreateNewHTMLElement("label");
  // phoneNumberLabel.innerHTML = `
  // <span>Enter phoneNumber to make payment</span>
  // <span>(use format e.g. 254700258098)*</span>
  // `;

  // const phoneNumberInput = CreateNewHTMLElement("input");
  // AddAttributeToElement(phoneNumberInput, "type", "tel");
  // AddAttributeToElement(phoneNumberInput, "required", true);
  // AddAttributeToElement(phoneNumberInput, "minlength", "12");
  // AddAttributeToElement(phoneNumberInput, "maxlength", "12");
  // AppendChildToDynamicElement(phoneNumberLabel, phoneNumberInput);
  // AppendChildToDynamicElement(phoneNumberDiv, phoneNumberLabel);

  // AppendChildToDynamicElement(form, phoneNumberDiv);
  formHolder.innerHTML = "You'll pay for the product on delivery!";

  const nextButtonDiv = CreateNewHTMLElement("div");
  const nextButton = CreateNewHTMLElement("button");
  nextButton.innerHTML = "Next";
  AddClass(nextButton, "save-address");
  AddAttributeToElement(nextButton, "type", "submit");
  AppendChildToDynamicElement(nextButtonDiv, nextButton);
  AppendChildToDynamicElement(form, nextButtonDiv);
  AppendChildToDynamicElement(formHolder, form);
  AppendChildToDynamicElement(phoneNumberPageContainer, formHolder);
  AppendHTMLChildToStaticElement(
    "#body",
    FindSingleElement,
    phoneNumberPageContainer
  );
  form.addEventListener("submit", e => {
    e.preventDefault();
    // const currentOrder = JSON.parse(sessionStorage.getItem("order-items"));
    // const updatedOrder = [
    //   ...currentOrder,
    //   { paymentDetail: phoneNumberInput.value }
    // ];
    // sessionStorage.setItem("order-items", JSON.stringify(updatedOrder));
    setTimeout(() => {
      ClearContent(FindSingleElement, "#body");
      CheckoutPage();
    }, 1500);
  });
};

const UserAddress = () => {
  const formContainer = CreateNewHTMLElement("div");
  AddClass(formContainer, "form-container");
  const form = CreateNewHTMLElement("form");
  AddClass(form, "address-form");
  const fnameDiv = CreateNewHTMLElement("div");
  AddClass(fnameDiv, "input-div");
  const labelFName = CreateNewHTMLElement("label");
  labelFName.innerHTML = ` <span>First Name *</span>`;
  const inputFName = CreateNewHTMLElement("input");
  AddAttributeToElement(inputFName, "required", true);
  AddAttributeToElement(inputFName, "maxlength", "26");
  AddAttributeToElement(inputFName, "minlength", "2");
  AddAttributeToElement(inputFName, "type", "text");

  const lnameDiv = CreateNewHTMLElement("div");
  AddClass(lnameDiv, "input-div");
  const labelLName = CreateNewHTMLElement("label");
  labelLName.innerHTML = ` <span>Last Name *</span>`;
  const inputLName = CreateNewHTMLElement("input");
  AddAttributeToElement(inputLName, "required", true);
  AddAttributeToElement(inputLName, "maxlength", "26");
  AddAttributeToElement(inputLName, "minlength", "2");
  AddAttributeToElement(inputLName, "type", "text");

  const phoneDiv = CreateNewHTMLElement("div");
  AddClass(phoneDiv, "input-div");
  const labelPhone = CreateNewHTMLElement("label");
  labelPhone.innerHTML = ` <span>Phone number *</span>`;
  const inputPhone = CreateNewHTMLElement("input");
  AddAttributeToElement(inputPhone, "type", "tel");
  AddAttributeToElement(inputPhone, "required", true);

  const addressDiv = CreateNewHTMLElement("div");
  AddClass(addressDiv, "input-div");
  const deliveryAddressLabel = CreateNewHTMLElement("label");
  deliveryAddressLabel.innerHTML = ` <span>Delivery address *</span>`;
  const deliveryAddress = CreateNewHTMLElement("textarea");
  AddAttributeToElement(deliveryAddress, "col", "5");
  AddAttributeToElement(deliveryAddress, "row", "3");
  AddAttributeToElement(deliveryAddress, "required", true);

  const saveAddressBtnDiv = CreateNewHTMLElement("div");
  const saveAddressBtn = CreateNewHTMLElement("button");
  AddClass(saveAddressBtn, "save-address");
  saveAddressBtn.innerHTML = "Save Address";

  AddAttributeToElement(saveAddressBtn, "type", "submit");

  AppendChildToDynamicElement(labelFName, inputFName);
  AppendChildToDynamicElement(labelLName, inputLName);
  AppendChildToDynamicElement(labelPhone, inputPhone);
  AppendChildToDynamicElement(deliveryAddressLabel, deliveryAddress);

  AppendChildToDynamicElement(fnameDiv, labelFName);
  AppendChildToDynamicElement(lnameDiv, labelLName);
  AppendChildToDynamicElement(phoneDiv, labelPhone);
  AppendChildToDynamicElement(addressDiv, deliveryAddressLabel);
  AppendChildToDynamicElement(saveAddressBtnDiv, saveAddressBtn);

  AppendChildToDynamicElement(form, fnameDiv);
  AppendChildToDynamicElement(form, lnameDiv);
  AppendChildToDynamicElement(form, phoneDiv);
  AppendChildToDynamicElement(form, addressDiv);
  AppendChildToDynamicElement(form, saveAddressBtnDiv);

  AppendChildToDynamicElement(formContainer, form);
  AppendChildToDynamicElement(addressContainer, formContainer);
  AddClass(addressContainer, "address-container");
  AppendHTMLChildToStaticElement("#body", FindSingleElement, addressContainer);

  //Address details:
  form.addEventListener("submit", e => {
    e.preventDefault();
    const addresObject = {
      firstname: inputFName.value,
      lastname: inputLName.value,
      phonenumber: inputPhone.value,
      location_address: deliveryAddress.value
    };

    //Getting Stored order information:
    let order = JSON.parse(sessionStorage.getItem("order-items"));
    order = [...order, { address: addresObject }];

    sessionStorage.setItem("order-items", JSON.stringify(order));
    setTimeout(() => {
      ClearContent(FindSingleElement, "#body");
      PaymentPhoneNumber();
    }, 1500);
  });
};

FindSingleElement(".cart").addEventListener("click", Cart);
payButton.addEventListener("click", () => {
  if (payButton.innerHTML === "Pay 0") {
    if (cartDiv.children.length > 2) {
      RemoveElement(FindSingleElement("#errorMessage"));
    }
    console.log(cartDiv.children);
    ErrorMessage(
      CreateNewHTMLElement,
      AppendChildToDynamicElement,
      "p",
      cartDiv,
      "Go back to product page to add items to cart "
    );
    const errorPara = cartDiv.children.errorMessage;
    const closeErrorMessageBtn = errorPara.children.closeErrorBtn;
    closeErrorMessageBtn.addEventListener("click", e => {
      e.preventDefault();
      RemoveElement(FindSingleElement("#errorMessage"));
    });
    return;
  }
  let checkOutArray = [];
  const itemsArray = JSON.parse(localStorage.getItem("cart-items"));
  checkOutArray = [{ order_details: itemsArray }, { amount: cartTotal }];
  sessionStorage.setItem("order-items", JSON.stringify(checkOutArray));

  ClearContent(FindSingleElement, "#body");
  UserAddress();
});
