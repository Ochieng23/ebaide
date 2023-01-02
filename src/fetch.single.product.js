document.addEventListener("load", () => {
  const FindItemsByClassName = className => {
    return document.querySelectorAll(className);
  };

  const productCollection = FindItemsByClassName(".view-product");
  for (let i = 0; i < productCollection.length; i++) {
    console.log(productCollection.item(i));
  }
});
