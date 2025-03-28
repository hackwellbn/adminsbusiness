import { baseURL } from "../config.js";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form"); // Ensure form is selected first

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${baseURL}/api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const product = await response.json();
        console.log("Product added:", product);
        fetchAllProducts(); // Refresh product list after adding
      } else {
        console.error("Error: Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (form) {
    form.addEventListener("submit", submitForm);
  } else {
    console.error("Form not found");
  }

  const btn = document.querySelector(".btn");
  btn.addEventListener("click", submitForm);

  // Fetch all products from the backend
  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${baseURL}/api/products`);

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const products = await response.json();
      console.log("Fetched Products:", products);

      const productContainer = document.getElementById("products");
      if (!productContainer) {
        console.error("Product container not found");
        return;
      }

      productContainer.innerHTML = products
        .map(
          (product) => `
            <li class="product">
                <h2>${product.name}</h2>
                <p>Price: ksh${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <button class="delete-btn" data-id="${product._id}">
                  <span class="material-icons">delete</span>
                </button>
            </li>
          `
        )
        .join("");

      const desc = document.getElementById("product__info");
      if (!desc) {
        console.error("Product info container not found");
        return;
      }

      document.querySelectorAll(".product").forEach((productElement, index) => {
        productElement.addEventListener("mouseover", () => {
          desc.innerHTML = `<div>${products[index].description}</div>`;
        });
        productElement.addEventListener("mouseout", () => {
          desc.innerHTML = "";
        });
      });

      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", () => {
          const productId = button.dataset.id;
          deleteProduct(productId);
        });
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${baseURL}/api/delete/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const modal = document.createElement("div");
        modal.classList.add("modal-container");
        modal.innerHTML = `
          <div class="modal">
            <p>Product deleted successfully!</p>
          </div>
        `;
        document.body.appendChild(modal);
        fetchAllProducts();
      } else {
        console.error("Error: Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  //function to update a product
  const updateProduct = async () => {
    try {
      const response = await fetch(`${baseURL}/api/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error("Error: Failed to update product");
      }
      productElement.addEventListener("click", async (event) => {
        // Hide the form initially
        document.getElementById("add").style.display = "none";
      
        const id = productElement.dataset.id;
        const name = productElement.dataset.name;
        const stock = productElement.dataset.stock;
        const price = productElement.dataset.price;
        const description = productElement.dataset.description;
        const category = productElement.dataset.category;
      
        document.getElementById("name").value = name;
        document.getElementById("price").value = price;
        document.getElementById("description").value = description;
        document.getElementById("category").value = category;
        document.getElementById("stock").value = stock;
      
        const submitButton = document.getElementById("submit-btn");
        submitButton.innerText = "Update Product";
        submitButton.replaceWith(submitButton.cloneNode(true));
      
        const newSubmitButton = document.getElementById("submit-btn")
        submitButton.onclick = async (e) => {
          e.preventDefault();
      
          const updatedData = {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            description: document.getElementById("description").value,
            category: document.getElementById("category").value,
            stock: document.getElementById("stock").value,
          };
      
          try {
            await updateProduct(id, updatedData);
            document.querySelector(".add").style.display = "block"; 
            newSubmitButton.innerText = "Add Product"; 
          } catch (error) {
            console.log(error);
          }
        };
      });
      
    } catch (error) {
      
    }
  };
  fetchAllProducts();
});
