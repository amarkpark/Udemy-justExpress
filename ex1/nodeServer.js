const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    res.writeHead(200,{"content-type":"text/html"});
    const homePage = fs.readFileSync("node.html");
    res.write(homePage);
    // res.write("<h2 style='color:royalblue'>Express? What's the rush?</h2>");
    res.end();
  } else if (req.url === "/SwirLogo.jpg") {
    res.writeHead(200,{"content-type":"image/jpeg"});
    // res.write("<img src='./SwirLogo.jpg' 'height:640' 'width:640'>");
    const swirl = fs.readFileSync("./SwirLogo.jpg");
    res.write(swirl);
    res.end();
  } else if (req.url === "/HastaLasagna.png") {
    res.writeHead(200,{"content-type":"image/png"});
    // res.write("<img src='./HastaLasagna.png' 'height:559' 'width:733'>");
    const hasta = fs.readFileSync("./HastaLasagna.png");
    res.write(hasta);
    res.end();
  } else if (req.url === "/styles.css") {
    res.writeHead(200,{"content-type":"text/css"});
    const style = fs.readFileSync("./styles.css");
    res.write(style);
    res.end();
  } else {
    res.writeHead(404,{"content-type":"text/html"});
    res.write("<h2 style='color:red'>DEE-NEYED!</h2>");
    res.end();
  }
});

server.listen(3333);
