import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,

} from "reactstrap";

// Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import AllProductsDetail from "./AllProductsDetail";

import makeAnimated from "react-select/animated";
import DeleteProductModal from "./ProductDeletModal";
import AddProductModal from "./ProductAddModal";
import UpdateProductModal from "./ProductUpdateModal";
import axios from "axios";
const animatedComponents = makeAnimated();

const AllProducts = () => {
  document.title = "Manage Products";

  const [marbleProducts, setMarbleProducts] = useState([
    {
      id: 1,
      name: "marble",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT096nUrQID-Oi19uoA6SswLETkDkWA3IXhpQ&usqp=CAU",
      description:
        "Beautiful Marble Product with a stunning design and intricate patterns. Enhance the beauty of your home or office with this exquisite marble piece.",
      price: "$50",
      location: "Marble Store A",
    },
    {
      id: 2,
      name: "marble2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX8Bre-sUMEPSMM-_v29RQQJfdudCKxSUUrw&usqp=CAU",
      description:
        "Elegant Marble Product featuring a sophisticated design and smooth texture. Elevate your space with this luxurious marble creation.",
      price: "$75",
      location: "Marble Store B",
    },
    {
      id: 3,
      name: "marble3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg7gqD1U00hyWwb6KHQpnBpxb459bjrNosPQ&usqp=CAU",
      description:
        "Classic Marble Product known for its timeless beauty and traditional charm. Bring a touch of elegance to your surroundings with this classic marble piece.",
      price: "$60",
      location: "Marble Store C",
    },
    {
      id: 4,
      name: "marble4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MY_FqPNhTXysFlCq4xysbSAEf2JWI4IWyQ&usqp=CAU",
      description:
        "Luxurious Marble Product crafted with precision and featuring a high-end design. Add a touch of luxury to your space with this premium marble creation.",
      price: "$100",
      location: "Marble Store D",
    },
    {
      id: 5,
      name: "marble5",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosHI7K-MWGfqrPLI7ZkCKvL15LJ2Z15qxBg&usqp=CAU",
      description:
        "Modern Marble Product showcasing contemporary style and innovative design. Transform your surroundings with this modern and artistic marble piece.",
      price: "$90",
      location: "Marble Store E",
    },
  ]);

  const categories = [
    {
      id: 1,
      name: "marble",
      subcategories: [
        {
          id: 1,
          name: "sub marble 1",
        },
        {
          id: 2,
          name: "sub marble 2",
        },
        {
          id: 3,
          name: "sub marble 3",
        },
      ],
    },
    {
      id: 2,
      name: "Stone",
      subcategories: [
        {
          id: 1,
          name: "sub stone 1",
        },
        {
          id: 2,
          name: "sub stone 2",
        },
        {
          id: 3,
          name: "sub stone 3",
        },
      ],
    },
    {
      id: 3,
      name: "Granite",
      subcategories: [
        {
          id: 1,
          name: "sub granite 1",
        },
        {
          id: 2,
          name: "sub granite 2",
        },
        {
          id: 3,
          name: "sub granite 3",
        },
      ],
    },
  ];
  const [viewdata, setviewdata] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<{
    id: number;
    name?: string;
    image: string;
    description: string;
    price: string;
    location: string;
  } | null>(null);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = () => {
    if (deleteProduct) {
      const updatedProducts = marbleProducts.filter(
        (product) => product.id !== deleteProduct.id
      );

      setMarbleProducts(updatedProducts);
      setDeleteProduct(null);
      toggleDeleteModal();
    }
  };

  const handleAllData = (data) => {
    setviewdata(data);
  };

  //////////////////////////// add modal /////////////////////
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  // New state for storing data of the new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    location: "",
  });

  // Function to toggle the add product modal
  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

  // Function to handle input changes in the add product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Function to handle adding a new product
  const handleAddProduct = () => {
    // Perform any validation as needed

    // Add the new product to the existing products
    setMarbleProducts((prevProducts) => [
      ...prevProducts,
      {
        id: prevProducts.length + 1,
        ...newProduct,
      },
    ]);

    // Clear the form
    setNewProduct({
      name: "",
      image: "",
      description: "",
      price: "",
      location: "",
    });

    // Close the add product modal
    toggleAddModal();
  };

 
  ////////////////////////////// update modal ////////////////

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // New state for storing data of the product to be updated
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    image: "",
    description: "",
    price: "",
    location: "",
  });

  // Function to toggle the update product modal
  const toggleUpdateModal = () => {
    setUpdateModalOpen(!isUpdateModalOpen);
  };

  // Function to handle opening the update modal and prefilling with product data
  const handleUpdate = (product) => {
    setUpdateProduct({
      id: product.id,
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      location: product.location,
    });
    toggleUpdateModal();
  };

  // Function to handle input changes in the update product form
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Function to handle updating an existing product
  const handleUpdateProduct = () => {
    // Perform any validation as needed

    // Update the existing product in the products array
    const updatedProducts = marbleProducts.map((product) =>
      product.id === updateProduct.id ? { ...updateProduct } : product
    );

    setMarbleProducts(
      updatedProducts as {
        id: number;
        name: string;
        image: string;
        description: string;
        price: string;
        location: string;
      }[]
    );

    // Close the update product modal
    toggleUpdateModal();
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "white", // Change the background color based on the selection state
      color: state.isSelected ? "white" : "black", // Change text color based on the selection state
    }),
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    { id: number; name: string }[]
  >([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/products/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error; // Rethrow the error to handle it outside this function
    }
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchData();
        setProducts(data);
      } catch (error) {
        // Handle error if necessary
      }
    };

    fetchProducts();
  }, []);
  console.log("products",products);


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Tables" breadcrumbItem="All Products" />
          <div className="d-flex justify-content-end mb-3">
            <Button color="primary" onClick={toggleAddModal}>
              Add Product
            </Button>
          </div>
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Product Image</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Category</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marbleProducts.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ maxWidth: "50px" }}
                              />
                            </td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.location}</td>
                            <td className="text-center d-flex justify-content-center">
                              <i
                                onClick={() => handleAllData(product)}
                                style={{ fontSize: "20px", cursor: "pointer" }}
                              >
                                <AllProductsDetail viewdata={viewdata} />
                              </i>
                              <i
                                style={{
                                  fontSize: "20px",
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                className="bx bx-edit-alt"
                                onClick={() => handleUpdate(product)}
                              ></i>
                              <i
                                style={{
                                  fontSize: "18px",
                                  color: "red",
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                className="dripicons-trash"
                                onClick={() => {
                                  setDeleteProduct(product);
                                  toggleDeleteModal();
                                }}
                              ></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <div
                  style={{ marginRight: "20px" }}
                  className="d-flex justify-content-end"
                >
                  <Pagination aria-label="Page navigation example" size="md">
                    <PaginationItem>
                      <PaginationLink first href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" previous />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" next />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" last />
                    </PaginationItem>
                  </Pagination>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* ////////////////////////// modales //////////// */}
      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        toggleAddModal={toggleAddModal}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategories={selectedSubcategories}
        customStyles={customStyles}
        newProduct={newProduct}
        categories={categories}
        setSelectedSubcategories={setSelectedSubcategories}
        animatedComponents={animatedComponents}
      />
      {/* update Product Modal */}
      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        toggleUpdateModal={toggleUpdateModal}
        handleUpdateInputChange={handleUpdateInputChange}
        handleUpdateProduct={handleUpdateProduct}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategories={selectedSubcategories}
        customStyles={customStyles}
        updateProduct={updateProduct}
        categories={categories} // Corrected prop
        setSelectedSubcategories={setSelectedSubcategories}
        animatedComponents={animatedComponents}
      />
      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        toggleDeleteModal={toggleDeleteModal}
        handleDelete={handleDelete}
        deleteProduct={deleteProduct}
      />
    </React.Fragment>
  );
};

export default AllProducts;
