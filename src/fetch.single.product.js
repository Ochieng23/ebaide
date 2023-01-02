const FindParentProductHolder = (id) => {
    return document.getElementById (id);
};

const FindingClickedClhild = (cb, id) => {
    const collection = cb(id).children;
    const collectionArray = [...collection];
    return collectionArray;
};
console.log ( FindingClickedClhild(FindParentProductHolder, 'view-single-product'));