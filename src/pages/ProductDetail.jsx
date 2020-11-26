import React from 'react';
import * as API from '../services/api';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.searchQueryProducts = this.searchQueryProducts.bind(this);
    this.state = {
      id: '',
      attributes: [],
      title: '',
      price: 0,
      thumbnail: '',
    };
  }

  async searchQueryProducts() {
    const ListProducts = await API.getProductsFromCategoryAndQuery(this.props.match.params.id, undefined);
    const { results } = ListProducts;
    if (results !== undefined) {
      const { id, title, attributes, thumbnail, price } = results[0];
      return this.setState({ id, attributes, title, thumbnail, price });
    }
    const { id, attributes, title, thumbnail, price } = ListProducts;
    // console.log(ListProducts);
    return this.setState({ id, attributes, title, thumbnail, price });
  }

  componentDidMount() {
    this.searchQueryProducts();
  }

  addItemToLocalStorage = () => {
    const id = this.state.id;
    const title = this.state.title;
    const price = this.state.price;
    const thumbnail = this.state.thumbnail;
    const number = 1;
    if (Storage) {
      const getItemSaved = JSON.parse(localStorage.getItem('cart'));
      const values = (getItemSaved === null ? [] : getItemSaved);
      let repeatedProduct = false;
      values.forEach(value => {
        if (value.id === id) {
          value.number += 1;
          value.price += price;
          repeatedProduct = true;
        } 
      })
      if (repeatedProduct) return localStorage.setItem('cart', JSON.stringify(values))
      values.push({id, title, price, thumbnail, number});
      localStorage.setItem('cart', JSON.stringify(values));
    }
  }
    
  render() {
    const { id, title, price, thumbnail } = this.state;
    return (
      <div>
        <div>
          <h3 data-testid='product-detail-name'>{title}</h3>
          <div>{price}</div>
          <img src={thumbnail} alt={title} />
        </div>
        <div>
          Especificações Técnicas
          <ul>
            {this.state.attributes.map((element) => {
              return (
                <li key={element.id}>
                  {`${element.name} --- ${element.value_name}`};
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <button data-testid='product-detail-add-to-cart' onClick={this.addItemToLocalStorage}>Adicionar</button>
          <Link data-testid="shopping-cart-button" to="/ShoppingCart">Ir para o carrinho</Link>
        </div>
          <form>
            <label htmlFor="input-email">
              <input type="text" id="input-email" placeholder="Email" />
            </label>
            <select htmlFor="input-select">
              <option value="1" id="input-select">1</option>
              <option value="2" id="input-select">2</option>
              <option value="3" id="input-select">3</option>
              <option value="4" id="input-select">4</option>
              <option value="5" id="input-select">5</option>
            </select>
            <label htmlFor="">
            <textarea data-testid="product-detail-evaluation" placeholder="Mensagem (opcional)" />
            </label>
            <button>Avaliar</button>
          </form>
      </div>
    );
  }
}

export default ProductDetail;
