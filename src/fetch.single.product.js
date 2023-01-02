const FindParentProductHolder = (id) => {
    return document.getElementById (id);
};

const FindingClickedClhild = (cb, id) => {
    const len = cb(id).children.length;
    return len
};
console.log ( FindingClickedClhild(FindParentProductHolder, 'view-single-product'));