//Servidor de express
const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extraname(file.originalname)
    );
  },
});
class Server {
  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT);
    // Http server
    this.server = http.createServer(this.app);
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    // Habilitar cors
    this.app.use(cors());
    // Parseo del body
    this.app.use(express.json());
    // Carga de imágenes

    this.app.use(fileUpload());
    /**
     * Habilita los endpoint:
     * APIEndpoints
     * this.app.use("ruta",require("archivo-controlador"))
     */
    this.app.use("/api/login", require("../router/auth"));
    this.app.use("/api/users", require("../router/user"));
    this.app.use("/api/blobs", require("../router/files"));
    this.app.post("/upload", (req, res) => {
      let EDFile = req.files.file;
      EDFile.mv(`./files/${EDFile.name}`, (err) => {
        if (err) return res.status(500).send({ message: err });

        return res.status(200).send({ message: "File upload" });
      });
    });
  }

  execute() {
    //   Inicializar middlewares
    this.middlewares();
    // Inicializar server
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto : ${this.port}`);
    });
  }
}

module.exports = Server;
