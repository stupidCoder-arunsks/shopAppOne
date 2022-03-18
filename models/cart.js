const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {

    static addProduct(id, productPrice) {
        console.log('Entering inside the function...');
        // Fetching previous card
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analysing the cart to find exiting product
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id);
            // console.log('existing Product index >>>', existingProductIndex);
            const existingProduct = cart.products[existingProductIndex];
            // console.log('existing Product  >>>',existingProduct);

            let updatedProduct;
            // Add new product/increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                // console.log('new Product index  >>>>', existingProductIndex);
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updateCart = { ...JSON.parse(fileContent) };
            const product = updateCart.products.findIndex(prod => prod.id === id);
            const productQty = product.qty;
            updateCart.products = updateCart.products.filter(prod => prod.id !== id);
            updateCart.totalprice = updateCart.totalprice - product.price * productQty;
            fs.writeFile(p, JSON.stringify(updateCart), err => {
                console.log(err);
            });
        });
    }
}

// adding cart functionality of using size
// static addProduct(id, productPrice, productSize) {
//     // console.log('Entering inside the function...');
//     // Fetching previous card
//     fs.readFile(p, (err, fileContent) => {
//         let cart = { products: [], totalPrice: 0 };
//         if (!err) {
//           cart = JSON.parse(fileContent);
//         }
//         // Analysing the cart to find exiting product
//         const existingProductIndex = cart.products.findIndex(
//             prod => prod.id === id);
//         // console.log('existing Product index >>>', existingProductIndex);
//         const existingProduct = cart.products[existingProductIndex];
//         // console.log('existing Product  >>>',existingProduct);

//         // const isSameSize = existingProductIndex === -1 ? false : cart.products[existingProductIndex].size === productSize;
//         let updatedProduct;
//         // Add new product/increase quantity
//         // if(existingProduct && isSameSize)
//         if (existingProduct) {
//             updatedProduct = { ...existingProduct };
//             updatedProduct.qty = updatedProduct.qty + 1;
//             cart.products = [...cart.products];
//             cart.products[existingProductIndex] = updatedProduct;
//         }
//         else {
//             // console.log('new Product index', existingProductIndex);
//             updatedProduct = { id: id, qty: 1, size: productSize };
//             cart.products = [...cart.products, updatedProduct];
//         }

//         cart.totalPrice = cart.totalPrice + +productPrice;
//         fs.writeFile(p, JSON.stringify(cart), err => {
//             console.log(err);
//         });
//     });
// }