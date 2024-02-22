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
interface Category {
  id: number;
  name: string;
  parentId?: number | null;
}
const AddCatModal = ({
  isAddModalOpen,
  toggleAddModal,
  selectedCategory,
  setSelectedCategory,
  categories,
  setSelectedSubcategories,
  animatedComponents,
  selectedSubcategories,
  handleAddCategory,
  newCategory,
  selectedParentCategory
}) => {

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "blue" : "white", // Change the background color based on the selection state
          color: state.isSelected ? "white" : "black", // Change text color based on the selection state
        }),
      };
      const handleSubcategoryChange = (selectedOptions) => {
        setSelectedSubcategories(selectedOptions);
      };

      const handleAddCategory2 = () => {
        if (selectedCategory) {
          const newCategoryId = categories.length + 1;
          const newCategoryObject: Category = {
            id: newCategoryId,
            name: selectedCategory,
           
          };
    
          console.log("Adding Categories:", newCategoryObject);
          categories= [...categories,newCategoryObject];
          // setCategories([...categories, newCategoryObject]);
          console.log("Categories:", categories);
          toggleAddModal();
        }
      };
      console.log("selected category",selectedCategory)
      console.log("selected category",selectedSubcategories)
    
  return (
    <Modal isOpen={isAddModalOpen} toggle={toggleAddModal}>
      <ModalHeader toggle={toggleAddModal}>Add New Category</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="exampleSelect">Categories</Label>
            <Input
              id="exampleSelect"
              name="select"
              type="text"
              value={selectedCategory}
              onChange={(e) => {
                const selectedCategory = e.target.value;
                setSelectedCategory(selectedCategory);
              }
            }
                // Dynamically load subcategories based on the selected category
              //   const category = categories.find(
              //     (cat) => cat.name === selectedCategory
              //   );
              //   if (category) {
              //     setSelectedSubcategories(category.subcategories);
              //   }
              // }}
            >
              {/* <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id}>{cat.name}</option>
              ))} */}
            </Input>
          </FormGroup>

          <Label for="productLocation">Subcategories</Label>
          <CreatableSelect
      isMulti
      components={animatedComponents}
      options={selectedSubcategories}
      styles={customStyles}
      onChange={handleSubcategoryChange} // Attach the handler function to the onChange event
    />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() =>{
            console.log("add clicked")
            handleAddCategory(
              selectedCategory,
              selectedParentCategory,
              categories,
              setSelectedSubcategories,
              selectedSubcategories,
              toggleAddModal
            )
          }
          }
        >
          Add Category
        </Button>{" "}
        <Button color="secondary" onClick={toggleAddModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddCatModal;
