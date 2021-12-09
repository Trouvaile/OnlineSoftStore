
// const iPhoneModel = require('../models/iPhone.model')
// const iPadModel = require('../models/iPad.model')
// const AppleWatchModel = require('../models/AppleWatch.model')
// const MacbookModel = require('../models/Macbook.model')
// const AirPodsModel = require('../models/AirPods.model')
// const AccessoriesModel = require('../models/Accessories.model')
// const tsktModel = require('../models/tskt.model')

const ProductsModel = require('../models/Products.model')
const priceFunctions = require('../functions/price.function')



module.exports.index = async (req, res, next)  => {
    const { categoriesName, productsName } = req.params

    const Product = await ProductsModel.findOne({"category": categoriesName, name: productsName})
    const price = priceFunctions.changeNumberToString(Product.price)
    const newprice = priceFunctions.changeNumberToString(Product.newprice)
    res.render('./products/index', {
        Product: { ...Product._doc, price, newprice}
    })
}

module.exports.search = async (req, res, next)  => {
    const { searchName } = req.body

    let Products = await ProductsModel.find({name: { $regex: '.*' + searchName + '.*' } });
    Products = priceFunctions.changePriceToString_Products(Products);
    res.render('./products/search', { Products, searchName: searchName })
}

module.exports.discount = async (req, res, next) => {
    let Products = await ProductsModel.find({discount: {$ne: '0% giảm giá'}})
    Products = priceFunctions.changePriceToString_Products(Products);
    res.render('./products/discount', {Products})
}