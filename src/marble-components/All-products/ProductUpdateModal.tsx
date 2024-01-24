
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CreatableSelect from "react-select/creatable";

const UpdateProductModal = ({
    isOpen,
    toggleUpdateModal,
    handleUpdateInputChange,
    handleUpdateProduct,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategories,
    customStyles,
    updateProduct,
    categories,
    setSelectedSubcategories,
    animatedComponents
  }) => {
    return (
      <Modal isOpen={isOpen} toggle={toggleUpdateModal}>
       <ModalHeader toggle={toggleUpdateModal}>Update Product</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="updateProductName">Product Name</Label>
              <Input
                type="text"
                name="name"
                id="updateProductName"
                value={updateProduct.name}
                onChange={handleUpdateInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="updateProductDescription">Product Description</Label>
              <Input
                type="textarea"
                name="description"
                id="updateProductDescription"
                value={updateProduct.description}
                onChange={handleUpdateInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="updateProductPrice">Product Price</Label>
              <Input
                type="number"
                name="price"
                id="updateProductPrice"
                value={updateProduct.price}
                onChange={handleUpdateInputChange}
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
                <Label for="updateProductImage">Product Image URL</Label>
                <Input
                  type="file"
                  name="image"
                  id="updateProductImage"
                  // value={updateProduct.image}
                  onChange={handleUpdateInputChange}
                />
              </FormGroup>
            </Col>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleUpdateProduct}>
            Update Product
          </Button>{" "}
          <Button color="secondary" onClick={toggleUpdateModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
  
  export default UpdateProductModal;