const FindParentProductHolder = (id) => {
    return document.getElementById (id);
};



const test = FindParentProductHolder ('view-single-product');
console.log (test.children);