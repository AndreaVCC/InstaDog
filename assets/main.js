const API_DOG_RANDOM = "https://api.thedogapi.com/v1/images/search?limit=2"
const API_DOG_FAVORITES = "https://api.thedogapi.com/v1/favourites?limit=30"
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
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const textBtn = document.createTextNode("Agregar a favoritos")
      img.src = dog.url;
      btn.append(textBtn);
      art.append(img, btn);
      btn.onclick = () => saveFavoritesDog(dog.id);
      // btn.addEventListener('click',  saveFavoritesDog.bind("idDog",dog.id))
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
      <article>
       <img src=${dog.image.url} alt="" height="100px">
       <button onclick=deleteFavoritesDog(${dog.id})>Quitar favoritos</button>
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
      const img = document.createElement("img");
      img.src = dog.url;
      art.append(img);
      mydogs.push(art)
    })
    console.log(data)
    my_dogs.append(...mydogs)
  }

}




loadRandomDog()
loadFavoritesDog()
myUploadDog()