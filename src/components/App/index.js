import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faPlus,
  faCheck,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

class App extends Component {
  state = {
    items: JSON.parse(localStorage.getItem("shoppingListItems")) || [],
    newItem: "",
    isEditing: false,
    editIndex: null,
  };

  handleChange = (event) => {
    this.setState({ newItem: event.target.value });
  };

  addItem = () => {
    this.setState({ isEditing: true });
  };

  saveItem = () => {
    const { items, newItem, editIndex } = this.state;

    if (newItem.trim().length === 0) {
      return;
    }

    if (editIndex === null) {
      this.setState(
        {
          items: [...items, { name: newItem.trim(), purchased: false }],
          newItem: "",
          isEditing: false,
        },
        () =>
          localStorage.setItem(
            "shoppingListItems",
            JSON.stringify(this.state.items)
          )
      );
    } else {
      const updatedItems = [...items];
      updatedItems[editIndex].name = newItem.trim();

      this.setState(
        { items: updatedItems, newItem: "", isEditing: false, editIndex: null },
        () =>
          localStorage.setItem(
            "shoppingListItems",
            JSON.stringify(this.state.items)
          )
      );
    }
  };

  editItem = (index) => {
    const { items } = this.state;

    this.setState({
      newItem: items[index].name,
      isEditing: true,
      editIndex: index,
    });
  };

  deleteItem = (index) => {
    const { items } = this.state;

    const newItems = items.filter((item, i) => i !== index);

    this.setState({ items: newItems }, () =>
      localStorage.setItem(
        "shoppingListItems",
        JSON.stringify(this.state.items)
      )
    );
  };

  boughtItem = (index) => {
    const { items } = this.state;

    const updatedItems = [...items];
    updatedItems[index].purchased = !updatedItems[index].purchased;

    this.setState({ items: updatedItems }, () =>
      localStorage.setItem(
        "shoppingListItems",
        JSON.stringify(this.state.items)
      )
    );
  };

  render() {
    const { items, newItem, isEditing } = this.state;

    return (
      <div className="shopping__list">
        <h1>Список покупок</h1>

        {isEditing ? (
          <div className="container">
            <input
              type="text"
              id="purchaseName"
              name="purchaseName"
              value={newItem}
              onChange={this.handleChange}
              placeholder="Введіть назву покупки"
            />
            <button onClick={this.saveItem} className="save__button">
              Зберегти
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ color: "#000000" }}
              />
            </button>
          </div>
        ) : (
          <div className="container">
            <button onClick={this.addItem} className="add__button">
              Додати
              <FontAwesomeIcon icon={faPlus} style={{ color: "#000000" }} />
            </button>
          </div>
        )}

        {items.map((item, index) => (
          <div key={index} className="item__list">
            <div className="text__item">
              <p className={item.purchased ? "bought" : ""}>{item.name}</p>
            </div>
            <div className="button__container">
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#000000" }}
                onClick={() => this.boughtItem(index)}
                className="bought__button"
              />
              <FontAwesomeIcon
                icon={faPencil}
                style={{ color: "#000000" }}
                onClick={() => this.editItem(index)}
                className="edit__button"
              />
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: "#000000" }}
                onClick={() => this.deleteItem(index)}
                className="delete__button"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
