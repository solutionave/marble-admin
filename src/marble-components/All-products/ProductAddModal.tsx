// AddProductModal.js
import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";
import CreatableSelect from "react-select/creatable";


const AddProductModal = ({
  isOpen,
  toggleAddModal,
  handleInputChange,
  handleAddProduct,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategories,
  customStyles,
  newProduct,
  categories,
  setSelectedSubcategories,
  animatedComponents
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleAddModal}>
      <ModalHeader toggle={toggleAddModal}>Add New Product</ModalHeader>
      <ModalBody>
      <Form>
            <FormGroup>
              <Label for="productName">Product Name</Label>
              <Input
                type="text"
                name="name"
                id="productName"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="productDescription">Product Description</Label>
              <Input
                type="textarea"
                name="description"
                id="productDescription"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="productPrice">Product Price</Label>
              <Input
                type="number"
                name="price"
                id="productPrice"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">Categories</Label>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                value={selectedCategory}
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setSelectedCategory(selectedCategory);

                  // Dynamically load subcategories based on the selected category
                  const category = categories.find(
                    (cat) => cat.name === selectedCategory
                  );
                  if (category) {
                    setSelectedSubcategories(category.subcategories);
                  }
                }}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id}>{cat.name}</option>
                ))}
              </Input>
            </FormGroup>

            <Label for="productLocation">Subcategories</Label>
            <CreatableSelect
              isMulti
              components={animatedComponents}
              options={selectedSubcategories.map((subCat) => ({
                value: subCat.name,
                label: subCat.name,
              }))}
              styles={customStyles}
            />

            <Col md={"6"} className="mt-3">
              <FormGroup>
                <Label for="productImage">Product Image URL</Label>
                <Input
                  type="file"
                  name="image"
                  id="productImage"
                  value={newProduct.image}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
          </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleAddProduct}>
          Add Product
        </Button>{" "}
        <Button color="secondary" onClick={toggleAddModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddProductModal;
