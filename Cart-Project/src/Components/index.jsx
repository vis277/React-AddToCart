import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../Services/Network";
import { BeatLoader } from "react-spinners";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [count, setCount] = useState(0);
  const [cartItem, setCartItems] = useState([]);

  useEffect(() => {
    (async function getresult() {
      const result = await getData("https://dummyjson.com/products");
      setProducts(result.products);

      setIsLoading(true);
    })();
  }, []);
  //   Add to cart
  const _addToCart = (item) => {
    if (cartItem.length === 0) {
      item.quantity = 1;
    }
    for (let i = 0; i < cartItem.length; i++) {
      if (item.id === cartItem[i].id) {
        return;
      } else {
        item.quantity = 1;
      }
    }

    setCartItems([...cartItem, item]);
  };

  //   Handling quantity

  const _handleQuantitityIncrement = (item) => {
    for (let i = 0; i < cartItem.length; i++) {
      if (item.id === cartItem[i].id) {
        item.quantity += 1;
      }
    }
    setCartItems([...cartItem]);
  };

  const _handleQuantitityDecrement = (item) => {
    let tempItem;
    for (let i = 0; i < cartItem.length; i++) {
      if (item.id === cartItem[i].id) {
        if (item.quantity === 0) {
          return;
        }
        item.quantity -= 1;
      }
    }
    setCartItems([...cartItem]);
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",

              flexWrap: "wrap",
            }}
          >
            {products.map((item) => {
              return (
                <Card
                  key={item.id}
                  style={{
                    width: "18rem",
                  }}
                >
                  <img
                    style={{
                      width: "15rem",
                      height: "10rem",
                    }}
                    alt="Sample"
                    src={item.images[0]}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{item.title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      Card subtitle
                    </CardSubtitle>
                    <CardText>$ {item.price}</CardText>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button onClick={() => _addToCart(item)}>
                        Add to Cart
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1 style={{ color: "indianred" }}>Cart</h1>
            <div
              style={{
                display: "flex",

                flexDirection: "column",
              }}
            >
              {cartItem.map((item) => {
                return (
                  <Card
                    key={item.id}
                    style={{
                      width: "5rem",
                    }}
                  >
                    <img
                      style={{
                        width: "5rem",
                        height: "5rem",
                      }}
                      alt="Sample"
                      src={item.images[0]}
                    />
                    <CardBody>
                      <CardTitle tag="h5">{item.title}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Card subtitle
                      </CardSubtitle>
                      <CardText>$ {item.price * item.quantity}</CardText>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button
                          key={item.id + "de"}
                          onClick={() => _handleQuantitityDecrement(item)}
                        >
                          -
                        </Button>
                        {item.quantity}
                        <Button
                          key={item.id + "inc"}
                          onClick={() => _handleQuantitityIncrement(item)}
                        >
                          +
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <BeatLoader />
      )}
    </>
  );
};

export default Home;
