const API_DOG_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=4"
const API_DOG_FAVORITES = "https://api.thedogapi.com/v1/favourites?limit=10"
const API_DOG_DELETE_FAV = (id) => `https://api.thedogapi.com/v1/favourites/${id}?`
const API_DOG_UPLOAD = "https://api.thedogapi.com/v1/images/upload"
const API_MY_UPLOAD = "https://api.thedogapi.com/v1/images"

const dog_random = document.getElementById("dog_random")
const my_dogs = document.getElementById("my_dogs")
const dog_favorite = document.getElementById("dog_favorite")
const preview_img = document.getElementById("preview_img")
const spanError = document.getElementById("error")

//Cargar imagenes de perros random
async function loadRandomDog() {
  const res = await fetch(API_DOG_RANDOM);
  const data = await res.json();
  arraydogs = [];

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    dog_random.innerHTML = "";
    data.map((dog) => {
      const art = document.createElement("article");
      const div = document.createElement("div");
      const contimg = document.createElement("div");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const textBtn = document.createTextNode("<3")
      img.src = dog.url;
      btn.append(textBtn);
      contimg.append(img);
      div.append(contimg, btn);
      art.append(div);
      btn.onclick = () => saveFavoritesDog(dog.id);
      // btn.addEventListener('click',  saveFavoritesDog.bind("idDog",dog.id))
      art.classList.add("col-6", "col-sm-3", "col-md-2", "col-xl-1", "mb-4");
      div.classList.add("card", "h-100");
      contimg.classList.add("d-flex", "align-items-center", "justify-content-center", "h-100");
      img.classList.add("card-img");
      btn.classList.add("btn", "btn-primary", "position-absolute",  "bottom-0", "end-0");
      arraydogs.push(art)
    })
    console.log(data)
    dog_random.append(...arraydogs)
  }
}

//Cargar imagenes favoritas
async function loadFavoritesDog() {
  const res = await fetch(API_DOG_FAVORITES,{
    method: 'GET',
    headers: {
      'X-API-KEY': 'd5d2143b-c9a8-437b-a4a4-bf67d4c1a33c'
    }
  });
  const data = await res.json();
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    dog_favorite.innerHTML = "";
    data.map((dog) => {
      dog_favorite.innerHTML += `
      <article class="col-6 col-sm-3 col-md-2 col-xl-1 mb-4 ">
        <div class="card h-100">
          <div class="d-flex align-items-center justify-content-center h-100">
            <img  class="card-img" src=${dog.image.url} alt="perrito">
          </div>
          <button class="btn btn-primary position-absolute  bottom-0 end-0 " onclick=deleteFavoritesDog(${dog.id})>X</button>
        </div>
      </article>
      `
    })

  }
}

//Guardar perros Favoritos
async function saveFavoritesDog(id) {
  const res = await fetch(API_DOG_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': 'd5d2143b-c9a8-437b-a4a4-bf67d4c1a33c'
    },
    body: JSON.stringify({
      image_id: id
    })
  })
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data;
  }else {
    loadFavoritesDog()
  }
}

//Eliminar perros de favoritos
async function deleteFavoritesDog(id) {
  const res = await fetch(API_DOG_DELETE_FAV(id), {
    method: 'DELETE',
    headers:{
      'X-API-KEY': 'd5d2143b-c9a8-437b-a4a4-bf67d4c1a33c'
    }
  })

const data = await res.json();

if (res.status !== 200) {
  spanError.innerHTML = "Hubo un error: " + res.status + data;
}else {
    loadFavoritesDog()
}
}

//Subir nuevo perros
async function uploadDog(){
  const form = document.querySelector("#uploadForm")
  const formData = new FormData(form);
  console.log(formData.get('file'));
  const res = await fetch (API_DOG_UPLOAD, {
    method: "POST",
    headers: {
      // 'Content-Type': 'multipart/form-data;boundary=----',
      'X-API-KEY': 'd5d2143b-c9a8-437b-a4a4-bf67d4c1a33c',
    },
    body: formData,
  })
  const data = await res.json();

  if (res.status !== 200 && res.status !== 201) {
    spanError.innerHTML = "Hubo un error: " + res.status + data;
  }else {
    console.log("foto subida")
    console.log(data.url)
    myUploadDog() 
  }
}

// mis fotos subidas
async function myUploadDog(){
const res = await fetch(API_MY_UPLOAD, {
  method: 'GET',
  headers: {
    'X-API-KEY': 'd5d2143b-c9a8-437b-a4a4-bf67d4c1a33c'
  }
})
const data = await res.json();
console.log(data)

let mydogs = [];

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    my_dogs.innerHTML = "";
    data.map((dog) => {
      const art = document.createElement("article");
      const div = document.createElement("div");
      const contimg = document.createElement("div");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const textBtn = document.createTextNode("Del")
      img.src = dog.url;
      btn.append(textBtn);
      contimg.append(img);
      div.append(contimg, btn);
      art.append(div);
      btn.onclick = () => deleteDog(dog.id);

      art.classList.add("col-6", "col-sm-3", "col-md-2", "col-xl-1", "mb-4");
      div.classList.add("card", "h-100");
      contimg.classList.add("d-flex", "align-items-center", "justify-content-center", "h-100");
      img.classList.add("card-img");
      btn.classList.add("btn", "btn-primary", "position-absolute",  "bottom-0", "end-0");
      mydogs.push(art)
    })
    console.log(data)
    my_dogs.append(...mydogs)
  }

}

async function deleteDog(id) {
  console.log(id)
}




loadRandomDog()
loadFavoritesDog()
myUploadDog()
