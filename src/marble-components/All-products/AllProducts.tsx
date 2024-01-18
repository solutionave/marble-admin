import React, { useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

// Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import AllProductsDetail from "./AllProductsDetail";

const AllProducts = () => {
  // Meta title
  document.title = "Basic Tables | Skote - React Admin & Dashboard Template";

  // Sample data for marble products
  const marbleProducts = [
    {
      id: 1,
      name:'marble',
      image: "product1.jpg",
      description: "Beautiful Marble Product 1 Beautiful Marble Product 1 Beautiful Marble Product 1 vBeautiful Marble Product 1",
      price: "$50",
      location: "Marble Store A",
    },
    {
      id: 2,
      name:'marble2',
      image: "product2.jpg",
      description: "Elegant Marble Product 2 Elegant Marble Product 2 Elegant Marble Product 2 vElegant Marble Product 2",
      price: "$75",
      location: "Marble Store B",
    },
    {
      id: 3,
      name:'marble3',
      image: "product3.jpg",
      description: "Classic Marble Product 3 Classic Marble Product 3 Classic Marble Product 3 Classic Marble Product 3",
      price: "$60",
      location: "Marble Store C",
    },
    {
      id: 4,
      image: "product4.jpg",
      description: "Luxurious Marble Product 4 Luxurious Marble Product 4 Luxurious Marble Product 4 Luxurious Marble Product 4",
      price: "$100",
      location: "Marble Store D",
    },
    {
      id: 5,
      name:'marble5',
      image: "product5.jpg",
      description: "Modern Marble Product 5 Modern Marble Product 5 Modern Marble Product 5 Modern Marble Product 5",
      price: "$90",
      location: "Marble Store E",
    },
  ];

  const [viewdata, setviewdata] = useState('') 

  const handleAllData =(data)=>{
    setviewdata(data)
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Tables" breadcrumbItem="All Products" />
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
                          <th>Location</th>
                          <th>View Details</th>
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
                            <td onClick={()=>handleAllData(product)}><AllProductsDetail viewdata={viewdata}/></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllProducts;
