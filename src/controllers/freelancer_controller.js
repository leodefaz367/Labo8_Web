import Freelancer from "../models/Freelancer.js"

const registro = async (req, res) => {
    try {
        const { email, password } = req.body
        if (Object.values(req.body).includes("")) {
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
        }
        const verificarEmailBDD = await Freelancer.findOne({ email })
        if (verificarEmailBDD) {
            return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })
        }
        const nuevoFreelancer = new Freelancer(req.body)
        nuevoFreelancer.password = await nuevoFreelancer.encryptPassword(password)
        nuevoFreelancer.confirmEmail = true
        await nuevoFreelancer.save()
        res.status(201).json({ msg: "Registro exitoso, ya puedes iniciar sesión" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: `Error en el servidor - ${error}` })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (Object.values(req.body).includes("")) {
            return res.status(404).json({ msg: "Debes llenar todos los campos" })
        }
        const freelancerBDD = await Freelancer.findOne({ email }).select("-status -__v -token -updatedAt -createdAt")
        if (!freelancerBDD) {
            return res.status(404).json({ msg: "El usuario no se encuentra registrado" })
        }
        if (!freelancerBDD.confirmEmail) {
            return res.status(403).json({ msg: "Debes verificar tu cuenta antes de iniciar sesión" })
        }
        const verificarPassword = await freelancerBDD.matchPassword(password)
        if (!verificarPassword) {
            return res.status(401).json({ msg: "El password no es correcto" })
        }
        const { nombre, apellido, direccion, celular, _id, rol } = freelancerBDD
        res.status(200).json({
            rol,
            nombre,
            apellido,
            direccion,
            celular,
            _id,
            email: freelancerBDD.email
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: ` Error en el servidor - ${error}` })
    }
}

export {
    registro,
    login
}