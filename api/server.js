const express = require('express');
const projectRoutes=require("./projects/projects-router");
const actionRoutes=require("./actions/actions-router");
const {logger}=require("./projects/projects-middleware");

const cors=require("cors");
const server = express();

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

server.use(express.json());
server.use(cors());
server.use("/api/projects", logger, projectRoutes);
server.use("/api/actions", logger,actionRoutes);

server.get("/", (req, res)=>{
    res.send("DON'T WORRY HACK IT")
})

module.exports = server;
