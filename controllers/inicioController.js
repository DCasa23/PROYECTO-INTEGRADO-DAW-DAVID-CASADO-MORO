const Usuario = require("../models/user");

exports.login = (req, res) => {
    req.session.cuenta = undefined;
    res.render("inicio", { tituloWeb: "Inicio de sesión", error: false });
};

exports.user_login_post = async (req, res) => {
    // Recuperación de los datos introducidos en el login mediante body-parser
    let body = req.body;
    try {
        let usuarioEncontrado = await Usuario.findOne({ correo: `${body.correo}`, password: `${body.password}` });
        if (usuarioEncontrado !== null) {
            req.session.cuenta = usuarioEncontrado;
            res.redirect("/");
        } else {
            res.render("inicio", { tituloWeb: "Inicio de sesión fallido", error: true });
        }
    } catch (error) {
        console.log(error);
    }
};