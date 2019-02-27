import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:3000/graphiql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <React.Fragment>
          <Navbar />
          <Banner />
          <ProductList />
          <Footer />
        </React.Fragment>
      </ApolloProvider>
    );
  }
}

export default App;
