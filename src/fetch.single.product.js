const FindParentProductHolder = (id) => {
    return document.getElementById (id);
};

const FindingClickedClhild = (cb, id) => {
    const collection = cb(id).children;
    return collection;
};
console.log ( FindingClickedClhild(FindParentProductHolder, 'view-single-product'));