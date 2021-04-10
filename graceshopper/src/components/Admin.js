import { useState, useEffect } from "react";
import { Link, useRouteMatch, Route } from "react-router-dom";
import { getToken } from "../auth";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import EditAdminStatus from "./EditAdminStatus";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Admin = () => {
  let { path } = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://peaceful-spire-60083.herokuapp.com/api/users")
      .then((response) => response.json())
      .then((result) => {
        setUsers(result.users);
      })
      .catch(console.error);
    fetch("https://peaceful-spire-60083.herokuapp.com/api/products")
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      })
      .catch(console.error);
    fetch("https://peaceful-spire-60083.herokuapp.com/api/orders")
      .then((response) => response.json())
      .then((result) => {
        setOrders(result);
      })
      .catch(console.error);
  }, []);

  const deleteUser = (userId) => {
    fetch(`https://peaceful-spire-60083.herokuapp.com/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const usersAfterDeletion = users.filter((user) => user.id !== userId);
          setUsers(usersAfterDeletion);
        }
      })
      .catch(console.error);
  };

  const deleteProduct = (productId) => {
    fetch(
      `https://peaceful-spire-60083.herokuapp.com/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const newProductsAfterDeletion = products.filter(
            (product) => product.id !== productId
          );
          setProducts(newProductsAfterDeletion);
        }
      })
      .catch(console.error);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>ADMIN PAGE</h1>
      <Route exact path={`${path}`}> 
      <center style={{fontSize:"50px"}}>WELCOME TO THE ADMIN DASHBOARD</center> </Route>
      <center style={{fontSize:"25px"}}>
        <Link to="/admin/user" style={{ marginRight: "20px" }}>
          {" "}
          VIEW ALL USERS
        </Link>
        <Link to="/admin/products" style={{ marginRight: "20px" }}>
          {" "}
          VIEW ALL PRODUCTS
        </Link>
        <Link to="/admin/orders" style={{ marginRight: "20px" }}>
          {" "}
          VIEW ALL ORDERS
        </Link>
      </center>
      
      <Route path={`${path}/user`}>
        <h4 style={{ textAlign: "center" }}>ALL USERS</h4>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search User"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <section style={{ overflow: "auto", height: "600px" }}>
          <center>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Admin</th>
                  <th>Change Admin Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {users
                .filter((user) => {
                  if (searchTerm === "") {
                    return user;
                  } else if (
                    user.username
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    user.email
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    user.isAdmin.toString().toLowerCase().includes(searchTerm)
                  ) {
                    return user;
                  }
                  return null;
                })
                .map((user, index) => {
                  return (
                    <tbody>
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.isAdmin.toString().toUpperCase()}</td>
                        <td>
                          <EditAdminStatus
                            userId={user.id}
                            userIsAdmin={user.isAdmin}
                            users={users}
                            setUsers={setUsers}
                          />
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => deleteUser(user.id)}
                          >
                            Delete User
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </center>
        </section>
      </Route>
      <Route path={`${path}/products`}>
        <h4 style={{ textAlign: "center" }}>
          ALL PRODUCTS
          <AddProductModal products={products} setProducts={setProducts} />
        </h4>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Products"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <section style={{ overflow: "auto", height: "800px" }}>
          <center>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Image URL</th>
                  <th>Splash</th>
                  <th>Single Game URL Route</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Inventory</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {products
                .filter((product) => {
                  if (searchTerm === "") {
                    return product;
                  } else if (
                    product.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    product.category
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return product;
                  }
                  return null;
                })
                .map((product, index) => {
                  return (
                    <tbody>
                      <tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>
                          <img
                            src={product.imageURL}
                            alt={product.title}
                            style={{ width: "50px" }}
                          />
                        </td>
                        <td>
                          <img
                            src={product.splash}
                            alt={`Splash of ${product.title}`}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{product.productURL}</td>
                        <td>{product.category}</td>
                        <td>{product.description}</td>
                        <td>${product.price}</td>
                        <td>{product.inventory}</td>
                        <td>
                          <EditProductModal
                            productId={product.id}
                            productTitle={product.title}
                            productImageURL={product.imageURL}
                            productSplash={product.splash}
                            productURL={product.productURL}
                            productCategory={product.category}
                            productDescription={product.description}
                            productPrice={product.price}
                            productInventory={product.inventory}
                            products={products}
                            setProducts={setProducts}
                          />
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete Product
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </center>
        </section>
        <center style={{ margin: "10px" }}>
          <AddProductModal products={products} setProducts={setProducts} />
        </center>
      </Route>
      <Route path={`${path}/orders`}>
        <h4 style={{ textAlign: "center" }}>ALL ORDERS </h4>
        <div className="search-box">
          <input
            type="text"
            style={{ width: "650px" }}
            placeholder="Search Order Status (Created, Pending, Completed, Canceled), User, or Product"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <section style={{ overflow: "auto", height: "600px" }}>
          <center>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>User's Email</th>
                  <th>Product Title</th>
                  <th>Product Image</th>
                  <th>Product Price</th>
                  <th>Count</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              {orders
                .filter((order) => {
                  if (searchTerm === "") {
                    return order;
                  } else if (
                    order.creatorName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    order.creatorEmail
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    order.productTitle
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    order.orderStatus
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return order;
                  }
                  return null;
                })
                .map((order, index) => {
                  return (
                    <tbody>
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.creatorName}</td>
                        <td>{order.creatorEmail}</td>
                        <td>{order.productTitle}</td>
                        <td>
                          <img
                            src={order.imageURL}
                            alt={order.productTitle}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </td>
                        <td>{order.productPrice}</td>
                        <td>{order.count}</td>
                        <td>{order.orderStatus}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </Table>
          </center>
        </section>
      </Route>
    </div>
  );
};

export default Admin;
