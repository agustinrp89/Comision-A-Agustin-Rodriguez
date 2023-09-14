document.addEventListener("DOMContentLoaded", () => {
   
    const postsContainer = document.getElementById("post-container");
  
    // Función para recargar la página
    const reloadPage = () => {
      window.location.reload();
    };
  
  
    // Función para mostrar los restaurantes como tarjetas
    const showposts = (posts) => {
      postsContainer.innerHTML = "";
  
      posts.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("post-card");
        // Agregar la imagen del restaurante
        if (post.imagen) {
          const image = document.createElement("img");
          image.src = `${post.imagen}`;
          image.alt = post.name;
          image.classList.add("imagen")
          card.appendChild(image);
        }
        const titulo = document.createElement("h2");
        titulo.textContent = post.titulo;
        card.appendChild(titulo);

        const date = document.createElement("p");
        const dia=post.dia;
        date.textContent = dia.split('-').reverse().join("-");        
        card.appendChild(date);
         
        const contenido = document.createElement("p");
        contenido.textContent = post.contenido;
        card.appendChild(contenido);
  
        const link = document.createElement("a");
        link.classList.add("centrado");
        link.textContent = post.link;
        link.href = post.link;
        link.textContent = 'Leer Mas';
        card.appendChild(link);
  
     
  
  
        // Agregar botón de edición
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("btn", "btn-secondary");
        editButton.addEventListener("click", () => {
          showEditModal(post);
        });
        card.appendChild(editButton);
        // Agregar botón "Eliminar"
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.type = "button"; // Cambiar el tipo de botón a "button"
        deleteButton.addEventListener("click", () => {
          // Mostrar una confirmación antes de eliminar el post
          const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este post?");
          if (confirmDelete) {
            deletepost(post.id);
            reloadPage();
          }
        });
        card.appendChild(deleteButton);
  
        postsContainer.appendChild(card);
      });
    };
  
    // Función para obtener la lista de restaurantes desde el servidor
    const getposts = async () => {
      try {
        const response = await fetch("/api/posts/getAllposts");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error al obtener la lista de posts:", error);
        return [];
      }
    };
     
    

  
  
    const showEditModal = (posts) => {
      const editModal = document.getElementById("edit-modal");
      const closeModalBtn = editModal.querySelector(".close");
      const editForm = document.getElementById("edit-form");
      const nameInput = document.getElementById("edit-titulo");
      const contenidoInput = document.getElementById("edit-contenido");
      const imageInput = document.getElementById("edit-image");
      const linkInput = document.getElementById("edit-link");
      const dateInput = document.getElementById("edit-date");
      const saveEditBtn = document.getElementById("save-edit-btn");
  
      // Rellenar el formulario con los datos actuales del restaurante
      nameInput.value = posts.titulo;
      contenidoInput.value = posts.contenido || "";
      imageInput.value = posts.imagen || "";
      linkInput.value = posts.link || "";
      dateInput.value = posts.dia || "";
  
      const onSaveEditBtnClick = async (event) => {
        event.preventDefault();
        const titulo = nameInput.value;
        const contenido = contenidoInput.value;
        const imagen = imageInput.value;
        const link = linkInput.value;
        const dia = dateInput.value;
  
  
        // Enviar los datos editados al servidor
        try {
          const response = await fetch(`/api/posts/updatepostById/${posts.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ titulo, contenido, imagen, link, dia }),
          });
          if (response.ok) {
            closeModal();
            // Recargar la página después de guardar los cambios exitosamente
            reloadPage();
          } else {
            console.error("Error al guardar los cambios");
          }
        } catch (error) {
          console.error("Error al guardar los cambios:", error);
        }
      };
  
      saveEditBtn.addEventListener("click", onSaveEditBtnClick);
      closeModalBtn.addEventListener("click", closeModal);
      window.addEventListener("click", outsideClick);
  
      function closeModal() {
        editModal.style.display = "none";
        editForm.reset();
      }
  
      function outsideClick(event) {
        if (event.target === editModal) {
          closeModal();
        }
      }
  
      editModal.style.display = "block";
    };
  
    // Función para mostrar el modal de agregar nuevo restaurante
    const showAddpostModal = () => {
      const addModal = document.getElementById("add-modal");
      const closeAddModalBtn = addModal.querySelector(".close");
      const addForm = document.getElementById("add-form");
      const addtituloInput = document.getElementById("add-titulo");
      const addcontenidoInput = document.getElementById("add-contenido");
      const addImagenInput = document.getElementById("add-image");
      const addlinkInput = document.getElementById("add-link");
      const adddateInput = document.getElementById("add-date");
      const saveAddBtn = document.getElementById("save-add-btn");
  
      const onSaveAddBtnClick = async (event) => {
        event.preventDefault();
        const titulo = addtituloInput.value;
        const contenido = addcontenidoInput.value;
        const imagen = addImagenInput.value;
        const link = addlinkInput.value;
        const dia = adddateInput.value;
  
        // Enviar los datos del nuevo psot al servidor
        try {
          const response = await fetch("/api/posts/addpost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ titulo, contenido, imagen, link, dia }),
          });
          if (response.ok) {
            closeModal();
            // Recargar la página después de guardar el nuevo restaurante exitosamente
            reloadPage();
          } else {
            console.error("Error al guardar el nuevo restaurante");
          }
        } catch (error) {
          console.error("Error al guardar el nuevo restaurante:", error);
        }
      };
  
      saveAddBtn.addEventListener("click", onSaveAddBtnClick);
      closeAddModalBtn.addEventListener("click", closeModal);
      window.addEventListener("click", outsideClick);
  
      function closeModal() {
        addModal.style.display = "none";
        addForm.reset();
      }
  
      function outsideClick(event) {
        if (event.target === addModal) {
          closeModal();
        }
      }
  
      addModal.style.display = "block";
    };
  
    const addpostBtn = document.getElementById("add-post-btn");
    addpostBtn.addEventListener("click", showAddpostModal);
  
    // Función para eliminar un restaurante
    const deletepost = async (postId) => {
      try {
        const response = await fetch(`/api/posts/deletepostById/${postId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Eliminar el restaurante de la lista y actualizar la vista
          const updatedposts = posts.filter((post) => post._Id !== postId);
          showposts(updatedposts);
          reloadPage(); // Recargar la página después de eliminar el restaurante
        } else {
          console.error("Error al eliminar el restaurante");
        }
      } catch (error) {
        console.error("Error al eliminar el restaurante:", error);
      }
    };
  
    // Obtener la lista de restaurantes y mostrarlos al cargar la página
    getposts().then((posts) => {
      showposts(posts);
    });
  });