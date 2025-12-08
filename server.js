import * as https_package from "node:https"
import * as fs_package from "node:fs"
import * as path_package from "node:path"

let fs = fs_package.default

let environmental_variables = ''
try{
  environmental_variables = fs.readFileSync('.env', 'utf8')
}
catch{
  console.log("Error while reading .env file. Use cp env_sample .env to create a new one. Then, specify the https server's private key and public cert.")
  process.exit()
}

let environmental_variables_json = ''
try{
  environmental_variables_json = JSON.parse(environmental_variables)
}
catch{
  console.log("Unable to parse .env file as JSON. There is a syntax error.")
  process.exit()
}


const options = {
  key: fs.readFileSync(environmental_variables_json.key),
  cert: fs.readFileSync(environmental_variables_json.cert),
  documentRoot: environmental_variables_json.documentRoot
};


let https = https_package.default

https.createServer(options, (req, response) => {
  let contents = ''
  let content_type = 'text/plain'
  let response_code = 200
  let url = req.url
  try{
    console.log(url)

    if (url == '/'){
      url = '/index.html'
    }
    contents = fs.readFileSync(options.documentRoot + url)
    if (path_package.extname(url) == '.html'){
      content_type = 'text/html'
    }else if (path_package.extname(url) == '.js'){
      content_type = 'text/javascript'
    }else if (path_package.extname(url) == '.css'){
      content_type = 'text/css'
    }
  }
  catch{
    response_code = 404
  }
  response.setHeader('Content-Type', content_type); 

  response.writeHead(response_code);

  // res.type()
  response.end(contents);
}).listen(443);
