import { Schema, model } from 'mongoose'
import { randomBytes } from 'node:crypto'
import bcrypt from 'bcryptjs'

const freelancerSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        trim: true,
        default: null
    },
    celular: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    rol: {
        type: String,
        default: "freelancer"
    }
}, {
    timestamps: true
})

// Método para cifrar el password
freelancerSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password, salt)
    return passwordEncryp
}

// Método para verificar si el password es el mismo de la BDD
freelancerSchema.methods.matchPassword = async function(password) {
    const response = await bcrypt.compare(password, this.password)
    return response
}

// Método para crear un token
freelancerSchema.methods.createToken = function() {
    const tokenGenerado = randomBytes(2).toString('hex').toUpperCase()
    this.token = tokenGenerado
    return tokenGenerado
}

export default model('Freelancer', freelancerSchema)