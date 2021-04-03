import { useState, useEffect } from "react";
import { getToken } from "../auth";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

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
  }, []);

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
    <div style={{ padding: "70px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "15px" }}> ADMIN PAGE </h1>
      <h2 style={{ textAlign: "center" }}>ALL USERS</h2>
      <section style={{ overflow: "auto", margin: "10px", height: "300px" }}>
        <center>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Username</th>
                <th>Admin</th>
              </tr>
            </thead>
            {users.map((user, index) => {
              return (
                <tbody>
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                    <td>{user.isAdmin.toString().toUpperCase()}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </center>
      </section>
      <h2 style={{ textAlign: "center" }}>ALL PRODUCTS </h2>
      <section style={{ overflow: "auto", margin: "10px", height: "300px" }}>
        <center>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price</th>
                <th>Inventory</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {products.map((product, index) => {
              return (
                <tbody>
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.inventory}</td>
                    <td>
                      <EditProductModal
                        productId={product.id}
                        productTitle={product.title}
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
      <center>
        <AddProductModal
          products={products}
          setProducts={setProducts}
        />
      </center>
    </div>
  );
};

export default Admin;
