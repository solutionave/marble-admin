import React, { useState } from "react";
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
import StoreDeleteModal from "./StoreDeleteModal";
import StoreViewModak from "./StoreViewModak";
import StorAddModal from "./StorAddModal";
import StoreUpdateModal from "./StoreUpdateModal";

interface Product {
  id: number;
  name: string;
  email: string;
  telephone: string;
  whatsapp: string;
  address: string;
}

const AllProducts = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  document.title = "Basic Tables | Admin & Dashboard";

  const [marbleProducts, setMarbleProducts] = useState([
    {
      id: 1,
      name: "Marble Slab",
      email: "marbleslabco@gmail.com",
      address: "123 Main Street, Peshawar",
      whatsapp: "+92 123 456789",
      telephone: "Marble Emporium",
    },
    {
      id: 2,
      name: "Granite Countertop",
      email: "graniteco@hotmail.com",
      address: "456 Market Street, Lahore",
      whatsapp: "+92 987 654321",
      telephone: "Granite World",
    },
    {
      id: 3,
      name: "Travertine Tile",
      email: "travertinetiles@gmail.com",
      address: "789 Business Avenue, Karachi",
      whatsapp: "+92 345 678901",
      telephone: "Travertine Haven",
    },
    {
      id: 4,
      name: "Onyx Sculpture",
      email: "onyxsculptures@yahoo.com",
      address: "101 Art Street, Islamabad",
      whatsapp: "+92 567 890123",
      telephone: "Onyx Creations",
    },
    {
      id: 5,
      name: "Quartzite Slab",
      email: "quartzitesupplier@gmail.com",
      address: "234 Trade Lane, Quetta",
      whatsapp: "+92 789 012345",
      telephone: "Quartzite Depot",
    },
    {
      id: 6,
      name: "Slate Flooring",
      email: "slateflooringcompany@gmail.com",
      address: "567 Industrial Road, Multan",
      whatsapp: "+92 234 567890",
      telephone: "Slate Innovations",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>("");
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    email: "",
    telephone: "",
    whatsapp: "",
    address: "",
  });
  console.log("first", selectedProduct.name);
  const handleAdd = () => {
    setMarbleProducts([...marbleProducts, formData]);
    setFormData({
      id: 0,
      name: "",
      email: "",
      telephone: "",
      whatsapp: "",
      address: "",
    });
    setShowAddModal(false);
  };

  const handleUpdate = () => {
    if (selectedProduct) {
      const updatedProducts = marbleProducts.map((product) =>
        product.id === selectedProduct.id ? formData : product
      );
      setMarbleProducts(updatedProducts);
      setShowUpdateModal(false);
    }
  };

  const handleDelete = () => {
    if (selectedProduct) {
      const updatedProducts = marbleProducts.filter(
        (product) => product.id !== selectedProduct.id
      );
      setMarbleProducts(updatedProducts);
      setShowDeleteModal(false);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Tables" breadcrumbItem="Store" />
          <div className="d-flex justify-content-end mb-3">
            <Button color="primary" onClick={() => setShowAddModal(true)}>
              Add
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
                          <th>Name</th>
                          <th>Email</th>
                          <th>Telephone</th>
                          <th>Whatsapp</th>
                          <th>Adress</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marbleProducts.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.email}</td>
                            <td>{product.telephone}</td>
                            <td>{product.whatsapp}</td>
                            <td>{product.address}</td>
                            <td className="text-center d-flex justify-content-center">
                              {/* Your action buttons */}
                              <i
                                style={{ fontSize: "20px" }}
                                className="dripicons-preview"
                                onClick={() => {
                                  setShowViewModal(true);
                                  setSelectedProduct(product);
                                }}
                              ></i>
                              <i
                                style={{
                                  fontSize: "20px",
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                                className="bx bx-edit-alt"
                                onClick={() => {
                                  setShowUpdateModal(true);
                                  setSelectedProduct(product);
                                  setFormData(product);
                                }}
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
                                  setShowDeleteModal(true);
                                  setSelectedProduct(product);
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

      {/* Add Modal */}
      <StorAddModal
        isOpen={showAddModal}
        toggle={() => setShowAddModal(!showAddModal)}
        handleAdd={handleAdd}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Update Modal */}
      <StoreUpdateModal
        isOpen={showUpdateModal}
        toggle={() => setShowUpdateModal(!showUpdateModal)}
        handleUpdate={handleUpdate}
        formData={formData}
        setFormData={setFormData}
      />

      {/* view modal start component */}

      <StoreViewModak
        isOpen={showViewModal}
        toggle={() => setShowViewModal(!showViewModal)}
        selectedProduct={selectedProduct}
      />

      {/* Delete Modal start components */}
      <StoreDeleteModal
        isOpen={showDeleteModal}
        toggle={() => setShowDeleteModal(!showDeleteModal)}
        handleDelete={handleDelete}
        selectedProduct={selectedProduct}
      />
      {/* Delete Modal end components */}
    </React.Fragment>
  );
};

export default AllProducts;
