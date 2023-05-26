export { generator, buscarPersonaje }

class Personajes {
    constructor(id, nombre, tamanio, peso) {
        this.id = id;
        this.nombre = nombre;
        this.tamanio = tamanio;
        this.peso = peso;
    }
}

function* generator(inicio, final) {
    for (let i = inicio; i <= final; i++) {
        yield obtenerPersonaje(i)
    }
}

const obtenerPersonaje = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(`https://swapi.dev/api/people/${id}/`);
            let data = await response.json();
            console.log(data)
            let nuevoPersonaje = new Personajes(id, data.name, data.height, data.mass);
            resolve(nuevoPersonaje)
        } catch (error) {
            reject();
        }
    })
}

const mostrarPersonaje = (personaje, valor) => {
    const rangoElement = document.getElementById(`rango${valor}`);
    if (rangoElement) {
        const divElement = document.createElement("div");
        divElement.id = `${personaje.id}-${valor}`;
        divElement.className = "d-flex card mb-3 me-3 col-3 shadow justify-content-center lista";

        const liElement = document.createElement("li");
        liElement.className = "card-body h-25";

        const h5Element = document.createElement("h5");
        h5Element.className = "card-title";
        h5Element.textContent = personaje.nombre;

        const pElement = document.createElement("p");
        pElement.className = "card-text";
        pElement.textContent = `Estatura: ${personaje.tamanio} cm. Peso: ${personaje.peso} kg.`;

        liElement.appendChild(h5Element);
        liElement.appendChild(pElement);

        divElement.appendChild(liElement);
        rangoElement.appendChild(divElement);
    }
};


const buscarPersonaje = (rango, valor) => {
    if (rango.done) {
        alert("No hay mas personajes en este rango");
    } else {
        rango.value.then((personaje) => {
            mostrarPersonaje(personaje, valor)
        }).catch((error) => {
            console.log(`Error: ${error}`);
        })
    }
}