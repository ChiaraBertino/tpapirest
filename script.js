const API_URL = "https://rickandmortyapi.com/api/character";
const resultado = document.getElementById("resultado");

document.getElementById("todos").addEventListener("click", obtenerTodos);
document.getElementById("buscar").addEventListener("click", filtrar);

async function obtenerTodos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    mostrarPersonajes(data.results);
  } catch (error) {
    resultado.innerHTML = "<p>Error al obtener los personajes.</p>";
  }
}

async function filtrar() {
  const name = document.getElementById("name").value;
  const status = document.getElementById("status").value;
  const species = document.getElementById("species").value;
  const type = document.getElementById("type").value;
  const gender = document.getElementById("gender").value;

  let url = `${API_URL}/?`;
  if (name) url += `name=${name}&`;
  if (status) url += `status=${status}&`;
  if (species) url += `species=${species}&`;
  if (type) url += `type=${type}&`;
  if (gender) url += `gender=${gender}&`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("No encontrado");
    const data = await res.json();
    mostrarPersonajes(data.results);
  } catch (error) {
    resultado.innerHTML = "<p>No se encontraron resultados.</p>";
  }
}

function mostrarPersonajes(personajes) {
  resultado.innerHTML = "";
  personajes.forEach(p => {
    resultado.innerHTML += `
      <div class="personaje">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p><b>Estado:</b> ${p.status}</p>
        <p><b>Especie:</b> ${p.species}</p>
      </div>`;
  });
}
