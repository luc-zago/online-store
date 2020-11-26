import React, { Component } from "react";
import CartItem from "../components/CartItem"

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: JSON.parse(localStorage.getItem('cart')),
    };
  }
  
  render() {
    const { products } = this.state;
    console.log(products);
    if (products === null)
      return (
        <span data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </span>
      );
    return (
      <div>
          {products.map((product) => <CartItem
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.imagePath}
            number={product.number} />
          )}
        </div>
      )
  }
}

export default ShoppingCart;