const graphql = require("graphql");
const {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} = graphql;
// const _ = require("lodash");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

// mutation {
//     addProduct(
//       name: "Sepatu Futsal Adidas",
//       price: "Rp 240.000",
//       imgUrl: "img/sepatu-futsal-adIDas.jpg",
//       inputCategoriesID:
//       [{categoryID: "5b75233f23a81c16c8f97177"},
//        {categoryID: "5b75234523a81c16c8f97178"}
//       ]) {
//       name
//       price
//       imgUrl
//       categories{
//         name
//       }
//     }
//   }

// dummy data
// let arrayProducts = [
//   {
//     name: "Airpods for iPhone 7",
//     price: "Rp 2.275.000",
//     imgUrl: "img/air",
//     categoriesID: ["1"],
//     ID: "1"
//   },
//   {
//     name: "Headset JBL Super Bass Bluetooth",
//     price: "Rp 230.000",
//     imgUrl: "img/headset-jbl.jpeg",
//     categoriesID: ["1"],
//     ID: "2"
//   },
//   {
//     name: "Jaket Gunung Avtech",
//     price: "Rp 310.000",
//     imgUrl: "img/jaket-gunung-avtech.jpg",
//     categoriesID: ["3", "4"],
//     ID: "3"
//   },
//   {
//     name: "Mouse Logitech Gaming",
//     price: "Rp 235.500",
//     imgUrl: "img/mouse-logitech-gaming.jpg",
//     categoriesID: ["2"],
//     ID: "4"
//   },
//   {
//     name: "Oppo F7 4/64gb",
//     price: "Rp 4.199.000",
//     imgUrl: "img/oppo-f7.jpeg",
//     categoriesID: ["1"],
//     ID: "5"
//   },
//   {
//     name: "Power Bank Delcell 10500mAh",
//     price: "Rp 111.500",
//     imgUrl: "img/powerbank-delcell.jpg",
//     categoriesID: ["1"],
//     ID: "6"
//   },
//   {
//     name: "Samsung Galaxy J2 Prime",
//     price: "Rp 1.329.000",
//     imgUrl: "img/samsung-j2.jpg",
//     categoriesID: ["1"],
//     ID: "7"
//   },
//   {
//     name: "Sandisk Memory Card 32gb",
//     price: "Rp 159.000",
//     imgUrl: "img/sandisk-32gb.jpg",
//     categoriesID: ["1"],
//     ID: "8"
//   },
//   {
//     name: "Sepatu Futsal Adidas",
//     price: "Rp 240.000",
//     imgUrl: "img/sepatu-futsal-adIDas.jpg",
//     categoriesID: ["3", "4"],
//     ID: "9"
//   },
//   {
//     name: "Sepatu Futsal Mercurial",
//     price: "Rp 109.800",
//     imgUrl: "img/sepatu-futsal-mercurial.jpg",
//     categoriesID: ["3", "4"],
//     ID: "10"
//   },
//   {
//     name: "Huawei Tablet T3",
//     price: "Rp 2.780.000",
//     imgUrl: "img/tablet-huawei.jpg",
//     categoriesID: ["1"],
//     ID: "11"
//   },
//   {
//     name: "Tas Radiant Backpack",
//     price: "Rp 136.900",
//     imgUrl: "img/tas-radiant-backpack.jpg",
//     categoriesID: ["3"],
//     ID: "12"
//   },
//   {
//     name: "Tas Selempang Mark Rydent",
//     price: "Rp 170.000",
//     imgUrl: "img/tas-selempang-mark-ryden.jpg",
//     categoriesID: ["3"],
//     ID: "13"
//   },
//   {
//     name: "Xiaomi Redmi Note 4x 3/32gb Hitam",
//     price: "Rp 1.959.000",
//     imgUrl: "img/xiaomi-note4x.jpg",
//     categoriesID: ["1"],
//     ID: "14"
//   }
// ];

// let arrayCategories = [
//   { name: "Handphone & Aksesoris", ID: "1" },
//   { name: "Laptop & Aksesoris", ID: "2" },
//   { name: "Fashion", ID: "3" },
//   { name: "Olahraga", ID: "4" }
// ];

const categoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({ "categories.categoryID": parent._id });
      }
    }
  })
});

const categoryInputType = new GraphQLInputObjectType({
  name: "CategoryInput",
  fields: () => ({
    categoryID: { type: GraphQLString }
  })
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    imgUrl: { type: GraphQLString },
    categories: {
      type: new GraphQLList(categoryType),
      resolve(parent, args) {
        const tempArray = [];
        parent.categories.forEach((el, ind) => {
          //get array of categoryID from Product collection
          tempArray.push(el.categoryID);
        });
        // find all _id that match with tempArray
        return Category.find({ _id: { $in: tempArray } });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    category: {
      type: categoryType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // { id } = args.id
        return Category.findById({ _id: args.id });
      }
    },
    product: {
      type: ProductType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Product.findById({ _id: args.id });
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({});
      }
    },
    categories: {
      type: new GraphQLList(categoryType),
      resolve(parent, args) {
        return Category.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCategory: {
      type: categoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let newCategory = new Category({
          name: args.name
        });
        return newCategory.save();
        //promise style code
        // return newCategory.save().then(result => {
        //   // adding _id value into ID field (one document)
        //   return new Promise((resolve, reject) => {
        //     result.ID = result._id;
        //     result.save((error, result) => {
        //       error ? reject(error) : resolve(result);
        //     });
        //   });
        // });
      }
    },
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        imgUrl: { type: new GraphQLNonNull(GraphQLString) },
        inputCategoriesID: {
          type: new GraphQLNonNull(GraphQLList(categoryInputType))
        }
      },
      resolve(parent, args) {
        const tempArray = [];
        args.inputCategoriesID.forEach(element => {
          tempArray.push(element);
        });
        let newProduct = new Product({
          name: args.name,
          price: args.price,
          imgUrl: args.imgUrl,
          categories: tempArray
        });
        return newProduct.save();
        //  store all documents and then remove field (all documents)!!! the field must be on the modelSchema
        // find({})=store all documents
        // Product.find({}, (err, res) => {
        //   if (err) {
        //     console.log(err);
        //     return;
        //   } else {
        //     res.forEach(el => {
        //       Product.update(
        //         { _id: el.id }, { $unset: { ID: 1 } },(err, res) => {}
        //       );
        //     });
        //   }
        // });
        // //promise style code
        // return newProduct.save().then(result => {
        //   // adding _id value into ID field (one document)
        //   return new Promise((resolve, reject) => {
        //     result.ID = result._id;
        //     result.save((error, result) => {
        //       error ? reject(error) : resolve(result);
        //     });
        //   });
        // });
        //  store all documents and then adding new field with value (all documents)
        // find({})=store all documents
        // Product.find({}, (err, res) => {
        //   if (err) {
        //     console.log(err);
        //     return;
        //   }else{
        //     res.forEach(el => {
        //       Product.update({_id:el.id}, { ID: el._id }, (err, res) => {});
        //     });
        //   }
        // });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
