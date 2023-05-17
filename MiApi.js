const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tienda = [
{cod: 100 , name: 'El poblado', tipo: 'Cafeteria'},
{cod: 200 , name: 'D1', tipo: 'Super mercado'},
{cod: 300 , name: 'Exito', tipo: 'Super mercado'}
];
const juego = [
{ titulo: 'FIfa 23', descripcion: 'Deportes', imagen:'./Img/Fifa23.png'},
{ titulo: 'Wwe', descripcion: 'lucha', imagen:'./Img/Fifa23.png'},
{ titulo: 'Cod', descripcion: 'Cafeteria', imagen:'./Img/Fifa23.png'}
];
//------------------------------
app.get('/', (req, res) => {
    let filePath = req.url;
    
    if (filePath == '/') {
        filePath = '/MiApi.html';
    }
    res.sendFile(__dirname + '/MiApi.html');
  });
//------------------------------
//me muestra todas las tiendas
app.get('/tiendas', (req, res) => {
    res.send(tienda);
});
//------------------------------
//me muestra informacion de una tienda en especifico
app.get('/tiendas/:cod', (req, res) => {
    const local = tienda.find( e => e.cod === parseInt(req.params.cod) );
    if(!local){
        //return res.send(404);
        return res.status(404).send('Error');
    }else{
        res.send(local);
    }
});
//------------------------------
//agregar un nuevo dato
app.post('/tiendas', ( req, res) => {
    const Cod= req.body.cod;
    const Name = req.body.name;
    const Type = req.body.tipo;
    const local = {
    cod: Cod,
    name: Name,
    tipo: Type
    }
    tienda.push(local);
    res.send(tienda);
});
app.post('/productos', ( req, res) => {
    const producto = {
    
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen
    }
    juego.push(producto);
    res.send(juego);
});




//tabnine. extension de autocompletado
app.listen(5000,() => console.log('El servidor se subio en el puerto 5000'));