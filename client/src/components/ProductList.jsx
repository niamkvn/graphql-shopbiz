import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getProductQuery = gql`
  {
    products {
      _id
      name
      price
      imgUrl
    }
  }
`;
class ProductList extends Component {
  //   state = {};

  displayProducts() {
    const { data } = this.props;
    if (data.loading) {
      return <div> Loading ...</div>;
    } else {
      return data.products.map(el => {
        return (
        <div key= {el._id} className="item ">
            <a link="# ">
              <div className="item-img ">
                <img src={el.imgUrl} alt=" " />
              </div>
              <div className="descript ">
                <h4>{el.name}</h4>
                <p>{el.price}</p>
              </div>
            </a>
          </div>
        );
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="products ">
        <div className="list-item ">{this.displayProducts()}</div>
      </div>
    );
  }
}

export default graphql(getProductQuery)(ProductList);
