import React, { useState } from "react";
import { Table, Row, Col, Card, CardBody, Button } from "reactstrap";
import Breadcrumbs from "../../Components/Common/Breadcrumb";

const AllProducts = () => {
    // Meta title
    document.title = "Basic Tables | Skote - React Admin & Dashboard Template";

    const categories = [
        { id: 1, name: "marble" },
        { id: 2, name: "Stone" },
        { id: 3, name: "Granite" },
        // Add more categories as needed
    ];

    const [currentCategory, setCurrentCategory] = useState("marble");

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Tables" breadcrumbItem="All Categories" />
                    <div className="d-flex justify-content-end">   
                         <Button
                            color="primary"
                            href="#"
                            tag="a"
                        >
                            ADD NEW CATEGORIES
                        </Button></div>
                    <Row className="mt-4">
                    
                        <Col xl={12}>
                            <Card>
                                <CardBody>
                                    <div className="table-responsive">
                                        <Table className="table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Categories</th>
                                                    <th className="text-center d-flex justify-content-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categories.map((category) => (
                                                    <tr key={category.id}>
                                                        <td>{category.id}</td>
                                                        <td>{category.name}</td>
                                                        <td className="text-center d-flex justify-content-center">
                                                            <i style={{ fontSize: "20px" }} className="dripicons-preview"></i>
                                                            <i style={{ fontSize: "20px", marginLeft: '10px' }} className="bx bx-edit-alt"></i>
                                                            <i style={{ fontSize: "18px", color: 'red', marginLeft: '10px' }} className="dripicons-trash"></i>
                                                        </td>
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
