const FindParentProductHolder = (id) => {
    return document.getElementById (id);
};

FindParentProductHolder ('view-single-product');

const FindingClickedClhild = (cb, id) => {
    for (let i = 0; i < cb(id).length; i++) {};
};
console.log (test.children);