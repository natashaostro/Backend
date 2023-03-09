const socket = io();
const cardsContainer = document.getElementById("cards-container");

// Variables
const title = document.getElementById("title");
const description = document.getElementById("description");
const code = document.getElementById("code");
const stock = document.getElementById("stock");
const category = document.getElementById("category");
const price = document.getElementById("price");
const submit = document.getElementById("submit");

// Validate the data.
const isEmpty = (...args) => args.some((arg) => !arg);

// Delete product.
const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};

// Reset the form.
const resetForm = () => { 
  title.value = ""; description.value = ""; code.value = ""; stock.value = ""; category.value = ""; price.value = ""; files.value = "";
};

// Render the products.
const render = (data) => {  
  cardsContainer.innerHTML = "";
  data.forEach((product) => {
    cardsContainer.innerHTML += `
      <div class="d-flex flex-column align-items-start justify-content-between rounded align-text-bottom border border-bottom-0 border-end-0 border-start-0 border-secondary p-3 mb-3 bg-light" style="width: 18rem;">
        <h5>${product.title}</h5>
        <p>${product.price}</p>
        <p>${product.description}</p>
        <button class="btn btn-danger" onclick="deleteProduct('${product.id}')" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
          Eliminar
        </button>
      </div>
    `;
  });
};

// New form data event.
submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (isEmpty(title.value, description.value, code.value, stock.value, category.value, price.value)) {
    return alert("All fields are required.");
  } else {
    const newProduct = { title: title.value, description: description.value, code: code.value, stock: stock.value, category: category.value, price: price.value };
    socket.emit("addProduct", newProduct);

    // Reset the form.
    resetForm();
  }
});

// Socket event.
socket.on("newProduct", (data) => {
  render(data);
});
