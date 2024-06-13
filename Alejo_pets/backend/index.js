import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mascotasRoutes from './src/routes/mascotas.routes.js';
import userRoutes from './src/routes/user.routes.js';
import categoriasRoutes from './src/routes/categorias.routes.js';
import generosRoutes from './src/routes/generos.routes.js';
import razasRoutes from './src/routes/razas.routes.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));

//ruta de documetacion
app.set("view engine", "ejs");
app.set("views", "./view");

app.use(express.static('./public'));
app.use(express.static('./uploads'))

app.get("/documents", (req, res) => {
    res.render("document.ejs");
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(generosRoutes);
app.use(userRoutes);
app.use(mascotasRoutes);
app.use(categoriasRoutes);
app.use(razasRoutes);




app.listen(3000, () => {
    console.log(`servidor esta funcionando en el puerto: 3000`);
});
