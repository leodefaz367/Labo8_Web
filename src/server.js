import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerFreelancers from './routers/freelancer_routes.js'

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones

// Middlewares
app.use(express.json())
app.use(cors())

app.set('port', process.env.PORT || 3000)

// Rutas
app.get('/', (req, res) => res.send("Server on"))
app.use('/api', routerFreelancers)

app.use((req, res) => res.status(404).send("Endpoint no encontrado - 404"))

export default app