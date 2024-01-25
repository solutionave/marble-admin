import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import CreatableSelect from "react-select/creatable";

const UpdateCatModal = ({
  isEditModalOpen,
  toggleEditModal,
  selectedCategory,
  setSelectedCategory,
  categories,
  setSelectedSubcategories,
  animatedComponents,
  selectedSubcategories,
  editedCategory,
  handleEditCategory,
}) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "white", // Change the background color based on the selection state
      color: state.isSelected ? "white" : "black", // Change text color based on the selection state
    }),
  };
  return (
    <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
      <ModalHeader toggle={toggleEditModal}>Edit Category</ModalHeader>
      <ModalBody>
        <Form>
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
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() =>
            handleEditCategory(
              editedCategory,
              editedCategory?.name || "",
              editedCategory?.parentId || null,
              categories,
              setSelectedSubcategories,
              toggleEditModal
            )
          }
        >
          Save Changes
        </Button>{" "}
        <Button color="secondary" onClick={toggleEditModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateCatModal;
