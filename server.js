const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require("multer");
const path = require ("path");
const fs = require('fs')
const app = express();
const nodemailer = require("nodemailer");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.listen()

const root = "/projeto4dev/api"

// conexao bd remota
 const connection = mysql.createConnection({
 	host: 'localhost',
 	user: 'meadelag_userbd',
 	password: ")hKaMfja0{[M",
    database: 'meadelag_projeto4',
    multipleStatements: true
});

// conexao bd local 
/*
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: "",
	database: 'projeto4',
    multipleStatements: true
});*/

connection.connect(function(err) {
	if (err) throw err;
});

app.get(root, (req, res) => {
	res.send('Hello World');
});


// const fileFilter = function (req, file, cb) {
// 	const allowedTypes = ['image/jpeg' , 'image/png' , 'image/gif'];
	
// 	if(!allowedTypes.includes(file.mimetype)) {
// 		const error = new Error("extensao nao permitida");
// 		error.code = "LIMIT_FILE_TYPES";
// 		return cb(error, false);
// 	}
// };
 


//Multer Parceiros Meadela
var storage =   multer.diskStorage({
	destination: '../../public_html/assets/gym/parceiros',
	filename: function (req, file, callback) {
	  callback(null, Date.now() + '-' + file.originalname);
	},

  });

  const MAX_SIZE = 200000;
  var upload = multer({ 
	  storage : storage,
	  limits:{
		fileSize: MAX_SIZE
	}
	});
	
	
	var storageMapaAulas =   multer.diskStorage({
		destination: '../../public_html/assets/gym/mapa',
		filename: function (req, file, callback) {
		  callback(null, Date.now() + '-' + file.originalname);
		},
	
    });
    
  var uploadMapaAulas = multer({ 
	  storage : storageMapaAulas,
	 // limits:{
	//	fileSize: MAX_SIZE
	//}
	});



//Multer Serviços Meadela
	var storageServiçosMeadela =   multer.diskStorage({
		destination: '../../public_html/assets/gym/servs',
		filename: function (req, file, callback) {
		  callback(null, Date.now() + '-' + file.originalname);
		},
	
	  });
	
	  var uploadServiçosMeadela = multer({ 
		  storage : storageServiçosMeadela,
		  limits:{
			fileSize: MAX_SIZE
		}
		});

//Multer Serviços Fisiogym
	var storageServiçosFisiogym =   multer.diskStorage({
		destination: '../../public_html/assets/fisio/servs',
		filename: function (req, file, callback) {
		  callback(null, Date.now() + '-' + file.originalname);
		},
	
	  });
	
	  var uploadServiçosFisio = multer({ 
		  storage : storageServiçosFisiogym,
		  limits:{
			fileSize: MAX_SIZE
		}
		});



//Multer Slide Fotos Meadela
	var storageFotosMeadela =   multer.diskStorage({
		destination: '../../public_html/assets/gym/slider',
		filename: function (req, file, callback) {
		  callback(null, Date.now() + '-' + file.originalname);
		},
	
	  });
	
	  var uploadFotosMeadela = multer({ 
		  storage : storageFotosMeadela,
		//   limits:{
			// fileSize: MAX_SIZE
		// }
		});





	//Multer Slide Fotos Fisiogym
	var storageFotosFisioGym =   multer.diskStorage({
		destination: '../../public_html/assets/fisio/slider',
		filename: function (req, file, callback) {
		  callback(null, Date.now() + '-' + file.originalname);
		},
	
	  });
	
	  var uploadFotosFisioGym = multer({ 
		  storage : storageFotosFisioGym,
		//   limits:{
			// fileSize: MAX_SIZE
		// }
		});


			//Multer Slide Fotos Ortho
	var storageFotosOrtho =   multer.diskStorage({
		destination: '../../public_html/assets/ortho/slider',
		filename: function (req, file, callback) {
		  callback(null, Date.now() + '-' + file.originalname);
		},
	
	  });
	
	  var uploadFotosOrtho = multer({ 
		  storage : storageFotosOrtho,
		//   limits:{
			// fileSize: MAX_SIZE
		// }
		});
		
		
	var storageProdutosOrtho =   multer.diskStorage({
    	destination: '../../public_html/assets/ortho/servs',
    	filename: function (req, file, callback) {
    	  callback(null, Date.now() + '-' + file.originalname);
    	},
    
      });
    
      var uploadProdutosOrtho = multer({ 
    	  storage : storageProdutosOrtho,
    	//   limits:{
    		// fileSize: MAX_SIZE
    	// }
    	});


  
// const MAX_SIZE = 200000;
// const upload = multer({
// 	dest: './src/assets/gym/parceiros',
// 	// fileFilter, 
// 	limits:{
// 		fileSize: MAX_SIZE
// 	}
// })

// PARCEIROS

app.post(root + '/imagem', upload.single('file','link','nome'), function (req, res){
	connection.connect(function (err) {

		var query = "INSERT INTO slidefotosparceiros(nome,link,foto, idEmpresa) VALUES ('" + req.body.nome + "','" + req.body.link + "', '"  + req.file.filename + "' , '1') ";
		//console.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });
})

app.use(function(err, req, res, next){
	if( err.code === "LIMIT_FILE_TYPES"){
		res.status(422).json({error: "introduza apenas imagens"});
		return;
	}
	if( err.code === "LIMIT_FILE_SIZE"){
		res.status(422).json({error: "introduza imagens pequenas"});
		return;
	}
})

app.get(root + '/parceiros', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM slidefotosparceiros where idEmpresa= '" + req.query.id  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		//console.log(result);
	  });
	});
  });

  app.post(root + '/deleteParceiros', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("DELETE FROM slidefotosparceiros where idFotoParceiro= '" + req.body.idParceiro  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);

//Eliminar a imagem da diretoria
	const path = '../../public_html/assets/gym/parceiros/'+req.body.nome; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}
		
			//file removed
		})

		// console.log(result);
		// console.log("id:" +req.body.idParceiro);
	  });
	});
  });


  app.post(root + '/updateParceiros',upload.single('file','link', 'nome', 'id', 'nomeRemover'), function (req, res) {
	connection.connect(function (err) {

		if(req.file != null){
	var query = "Update slidefotosparceiros set nome = '" + req.body.nome  + "',link = '" + req.body.link  + "', foto = '" + req.file.filename  + "' WHERE idFotoParceiro = '" + req.body.id  + "'";
	
	    //console.log(query);
	  connection.query(query, function (err, result, fields) {
		// if (err) throw err;
		res.send(result);

		// console.log("nomeee:"  +req.body.nomeRemover);

//Eliminar a imagem da diretoria
	const path = '../../public_html/assets/gym/parceiros/'+req.body.nomeRemover; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}
		
			//file removed
		})

	  });

	}else{
		// console.log("vazio");
		// var query2 = "Update slidefotosparceiros set nome = '" + req.body.nome  + "'  WHERE idFotoParceiro = '" + req.body.id  + "' ";
		// console.log(query2);
		connection.query("Update slidefotosparceiros set nome = '" + req.body.nome  + "' ,link = '" + req.body.link  + "'  WHERE idFotoParceiro = '" + req.body.id  + "' ", function (err, result, fields) {
			// if (err) throw err;
			res.send(result);
		  });
		
	}


	});
  });





// FIM PARCEIROS

//SERVIÇOS MEADELA

app.post(root + '/imagemServicos', uploadServiçosMeadela.single('file', 'nome', 'descricao'), function (req, res){
	connection.connect(function (err) {

		var query = "INSERT INTO servicos(nome,descricao, foto, idEmpresa) VALUES ('" + req.body.nome + "' , '" + req.body.descricao + "', '"  + req.file.filename + "' , '1') ";
		//console.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });
})

app.get(root + '/servicos', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM servicos where idEmpresa= '" + req.query.id  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
	//	console.log(result);
	  });
	});
  });

app.post(root + '/deleteServicos', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("DELETE FROM servicos where idServico = '" + req.body.idServico  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);

//Eliminar a imagem da diretoria
	const path = '../../public_html/assets/gym/servs/'+req.body.nome; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}
		
			//file removed
		})

		// console.log(result);
		// console.log("id:" +req.body.idParceiro);
	  });
	});
  });


  app.post(root + '/updateServicos',uploadServiçosMeadela.single('file', 'nome', 'descricao', 'id', 'nomeRemover'), function (req, res) {
	connection.connect(function (err) {

		if(req.file != null){
	  // if (err) throw err;
	  connection.query("Update servicos set nome = '" + req.body.nome  + "', descricao = '" + req.body.descricao  + "', foto = '" + req.file.filename  + "' WHERE idServico = '" + req.body.id  + "'  ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);

		//console.log("nome:"  +req.body.nomeRemover);

//Eliminar a imagem da diretoria
	const path = '../../public_html/assets/gym/servs/'+req.body.nomeRemover; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}
		
			//file removed
		})

	  });

	}else{
		connection.query("Update servicos set nome = '" + req.body.nome  + "', descricao = '" + req.body.descricao  + "' WHERE idServico = '" + req.body.id  + "'  ", function (err, result, fields) {
			// if (err) throw err;
			res.send(result);
			// console.log("entrou");
		  });
		
	}


	});
  });






//FIM SERVIÇOS MEADELA




//SERVIÇOS FISIOGYM

app.post(root + '/imagemServicosFisio', uploadServiçosFisio.single('file', 'nome', 'descricao'), function (req, res){
	connection.connect(function (err) {

		var query = "INSERT INTO servicos(nome, descricao, foto, idEmpresa) VALUES ('" + req.body.nome + "', '" + req.body.descricao + "', '"  + req.file.filename + "' , '3') ";
		//console.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });
})

app.get(root + '/servicosFisio', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM servicos where idEmpresa= '" + req.query.id  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
	//	console.log(result);
	  });
	});
  });

app.post(root + '/deleteServicosFisio', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("DELETE FROM servicos where idServico = '" + req.body.idServico  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);

//Eliminar a imagem da diretoria
	const path = '../../public_html/assets/fisio/servs/'+req.body.nome; 

		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}

		})
	  });
	});
  });


  app.post(root + '/updateServicosFisioGym',uploadServiçosFisio.single('file', 'nome','descricao', 'id', 'nomeRemover'), function (req, res) {
	connection.connect(function (err) {

		if(req.file != null){
	  // if (err) throw err;
	  connection.query("Update servicos set nome = '" + req.body.nome  + "', descricao = '" + req.body.descricao  + "', foto = '" + req.file.filename  + "' WHERE idServico = '" + req.body.id  + "'  ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);

		//console.log("nome:"  +req.body.nomeRemover);

//Eliminar a imagem da diretoria
	const path = '../../public_html/assets/fisio/servs/'+req.body.nomeRemover; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}
		
			//file removed
		})

	  });

	}else{
		connection.query("Update servicos set nome = '" + req.body.nome  + "' , descricao = '" + req.body.descricao  + "' WHERE idServico = '" + req.body.id  + "'  ", function (err, result, fields) {
			// if (err) throw err;
			res.send(result);
			// console.log("entrou");
		  });
		
	}


	});
  });



//FIM SERVIÇOS FISIOGYM


//INICIO SLIDE FOTOS MEADELA/Fisiogym/OrthoGYM

app.post(root + '/inserirSlideFotosMeadela', uploadFotosMeadela.single('file'), function (req, res){
	connection.connect(function (err) {

		var query = "INSERT INTO slidefotosinicial(foto, idEmpresa) VALUES ('"  + req.file.filename + "' , '"  + req.query.id + "') ";
		// console.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });
})


app.get(root + '/slideFotos', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM slidefotosinicial where idEmpresa= '" + req.query.id  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		 //console.log(result);
	  });
	});
  });


app.post(root + '/deleteSlideFotos', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("DELETE FROM slidefotosinicial where idFotoSlideInicial  = '" + req.body.idFotoSlide  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);

//Eliminar a imagem da diretoria
	const path = '../../public_html/assets/gym/slider/'+req.body.nome; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}
		
			//file removed
		})
	  });
	});
  });

  app.post(root + '/updateSlideFotosMeadela', uploadFotosMeadela.single('file', 'id', 'nomeRemover'), function (req, res){
	connection.connect(function (err) {

		var query = "Update slidefotosinicial  set foto = '"  + req.file.filename + "' WHERE idFotoSlideInicial = '" + req.body.id  + "'  ";
		// console.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });


		//Eliminar a imagem da diretoria
		const path = '../../public_html/assets/gym/slider/'+req.body.nomeRemover; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}

			//file removed
})


})




//FIM SLIDE FOTOS MEADELA



app.get(root + '/empresa', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM empresa where idEmpresa= '" + req.query.id  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	}); 
  });

  app.post(root + '/editarDadosEmpresa', function (req, res) {
	var id = req.query.id;
	connection.connect(function (err) {
		// console.log(req.body.email);

		var query2= "UPDATE `empresa` SET email = '" + req.body.email + "' , contato = '" + req.body.contato + "' , morada = '" + req.body.morada + "', latitude = '" + req.body.latitude + "', longitude = '" + req.body.longitude + "', horarioSemana = '" + req.body.horarioSemana + "', horarioFimSemana = '" + req.body.horarioFimSemana  + "' where idEmpresa= '" + req.query.id  + "' ";
		// console.log(query2)

		connection.query(query2, function (err, result, fields) {
			res.send(result);
	  });;
	});
  });
  
  
  
    app.post(root + '/editarDescricoesEmpresa', function (req, res) {
	var id = req.query.id;
	connection.connect(function (err) {
		// console.log(req.body.email);

		var query= "UPDATE empresa SET miniSobre = '" + req.body.minisobre + "' , sobre = '" + req.body.sobre  + "' where idEmpresa= '" + req.query.id  + "' ";

		connection.query(query, function (err, result, fields) {
			res.send(result);
	  });;
	});
  });
  

  app.get(root + '/servicos', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM servicos where idEmpresa= '" + req.query.id  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	});
  });

  app.post(root + '/loginAdmin', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  var query = "SELECT * FROM admin WHERE nome='" + req.body.NomeUtilizador + "' ";
	  // console.log(query)
	  connection.query(query, function (err, result, fields) {
		// console.log(result);
		res.send(result);
	  });
	});
  });
  
  
//INICIO SLIDE FOTOS OrthoGYM

app.post(root + '/inserirSlideFotosOrtho', uploadFotosOrtho.single('file'), function (req, res){
	connection.connect(function (err) {

		var query = "INSERT INTO slidefotosinicial(foto, idEmpresa) VALUES ('"  + req.file.filename + "' , '"  + req.query.id + "') ";
		// console.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });
})

app.post(root + '/updateSlideFotosOrtho', uploadFotosOrtho.single('file', 'id', 'nomeRemover'), function (req, res){
	connection.connect(function (err) {

		var query = "Update slidefotosinicial  set foto = '"  + req.file.filename + "' WHERE idFotoSlideInicial = '" + req.body.id  + "'  ";
		// console.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });


		//Eliminar a imagem da diretoria
		const path = '../../public_html/assets/ortho/slider/'+req.body.nomeRemover; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}

			//file removed
})


})



//INICIO SLIDE FOTOS fisio

app.post(root + '/inserirSlideFotosFisiogym', uploadFotosFisioGym.single('file'), function (req, res){
	connection.connect(function (err) {

		var query = "INSERT INTO slidefotosinicial(foto, idEmpresa) VALUES ('"  + req.file.filename + "' , '"  + req.query.id + "') ";
		// console.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });
})

app.post(root + '/updateSlideFotosFisiogym', uploadFotosFisioGym.single('file', 'id', 'nomeRemover'), function (req, res){
	connection.connect(function (err) {

		var query = "Update slidefotosinicial  set foto = '"  + req.file.filename + "' WHERE idFotoSlideInicial = '" + req.body.id  + "'  ";
		// console.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });


		//Eliminar a imagem da diretoria
		const path = '../../public_html/assets/fisio/slider/'+req.body.nomeRemover; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}

			//file removed
})


})





  //  CATEGORIAS ORTHO PRODUTOS

  app.get(root + '/categorias', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM categorias", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	}); 
  });
  
  
    app.get(root + '/subcategorias', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM sub_categorias where idCategoria= '"  + req.query.id + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	}); 
  });
  

app.post(root + '/produtosortho', uploadProdutosOrtho.single('file','idproduto'), function (req, res){
	connection.connect(function (err) {

		var query = "INSERT INTO fotoproduto(foto, idProduto) VALUES ('"+ req.file.filename + "' , '"+ req.body.idproduto + "' ) ";
		 // console.log.log(query);
		connection.query(query, function (err, result, fields) {
		    res.sendStatus(200);
		  // if (err) throw err;
		//   res.send(result);
		});
	  });
});


app.post(root + '/criarproduto', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  	var query = "INSERT INTO produto(nome, descricao,referencia,idSubcategoria) VALUES ('"+ req.body.nome + "' , '"+ req.body.descricao + "' ,'"+ req.body.referencia + "' , '"+ req.body.subcategoria + "' ) ";
	  connection.query(query, function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		 // console.log("id: " +result.insertId);
	  });
	}); 
  });
  
    app.get(root + '/produtos', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM produto", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	});
  });
  // endpoint para testar com vários produtos 
  app.get(root + '/produtosteste', function (req, res) {
    var final = [];
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM produto", function (err, result, fields) {
		// if (err) throw err;
		//res.send(result);
		for (var x = 0; x <= 5; x++) {
		   result.forEach( el => {
		       final.push(el);
		   });
        }
		res.send(final);
		// console.log(result);
	  });
	});
  });
  
  
    app.get(root + '/fotosprodutos', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	var query = "SELECT * FROM fotoproduto where idProduto ='"+ req.query.id+"'";
	  // console.log(query);
	  connection.query(query, function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	}); 
  });
  
  
  app.get(root + '/categoriaproduto', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	var query = "SELECT sc.nome as subcategoria, c.nome as categoria from sub_categorias sc, categorias c where idSubcategoria = '"+ req.query.id+"' and sc.idCategoria = c.idCategoria ";
	  // console.log(query);
	  connection.query(query, function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	}); 
  });
  
  app.post(root + '/updateproduto', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	var query = "UPDATE produto set nome = '"+ req.body.nome+"' , descricao = '"+ req.body.descricao+"', referencia = '"+ req.body.referencia+"' where idProduto ='"+ req.query.id+"'";
	  // console.log(query);
	  connection.query(query, function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	}); 
  });
  
  app.post(root + '/deleteprodutos', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	var query = "DELETE FROM fotoproduto WHERE idProduto ='"+ req.query.id+"'; DELETE FROM produto WHERE idProduto ='"+ req.query.id+"'";
	  // console.log(query);
	  connection.query(query, function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	}); 
  });
  
      //Mapa Aulas
  
	app.post(root + '/mapaaulas', uploadMapaAulas.single('file', 'descricao'), function (req, res){
		connection.connect(function (err) {
	
			var query = "INSERT INTO mapaAulas(foto, descricao) VALUES ('"+ req.file.filename + "', '"+ req.body.descricao+"') ";
			// console.log(query);
			connection.query(query, function (err, result, fields) {
				res.sendStatus(200);
			  // if (err) throw err;
			//   res.send(result);
			});
		  });
	})
	
	
  app.get(root + '/mapa', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM mapaAulas", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	}); 
  });
  
  
    app.post(root + '/deleteMapa', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  var query = "DELETE FROM mapaAulas where idMapa= '"+req.body.idMapa+"'";
	  consle.log(query);
	  connection.query(query, function (err, result, fields) {
		// if (err) throw err;
		res.send(result);

//Eliminar a imagem da diretoria
	const path = '../../public_html/assets/gym/mapa/'+req.body.nome; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}
		
			//file removed
		})
	  });
	});
  });
  
  
  //CAPA INICIAL
  	app.post(root + '/inserircapa', uploadMapaAulas.single('file'), function (req, res){
		connection.connect(function (err) {
	
			var query = "INSERT INTO capa(foto) VALUES ('"+ req.file.filename+ "') ";
			// console.log(query);
			connection.query(query, function (err, result, fields) {
				res.sendStatus(200);
			  // if (err) throw err;
			//   res.send(result);
			});
		  });
	})
	
	
    app.post(root + '/deleteCapa', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("DELETE FROM capa where idCapa= '" + req.body.idCapa  + "' ", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);

//Eliminar a imagem da diretoria
	const path = '../../public_html/assets/gym/mapa/'+req.body.nome; 


		fs.unlink(path, (err) => {
			if (err) {
			console.error(err)
			return
			}
		
			//file removed
		})
	  });
	});
  });
  
  
    app.get(root + '/capa', function (req, res) {
	connection.connect(function (err) {
	  // if (err) throw err;
	  connection.query("SELECT * FROM capa", function (err, result, fields) {
		// if (err) throw err;
		res.send(result);
		// console.log(result);
	  });
	}); 
  });
  
  
  
  
  
// formulário de enviar email
var transport = nodemailer.createTransport({
    host: "trinity.ptservidor.net",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'noreply@meadelagym.pt',
      pass: '1335okv7zv',
    },
  });
app.post(root + '/email/form', function (req, res) {
	var id = req.query.id;
	// console.log(req.body);
	var empresa = null;
	var meadelaMail = 'direcaotecnica@meadelagym.pt'
	if (id == 1) {
	    empresa = 'MeadelaGym';
	} else if (id == 2 ) {
	    empresa = 'OrthoGym';
	    meadelaMail = 'ortho@meadelagym.pt'
	} else if (id == 3) {
	    empresa = 'FisioGym';
	}
	var userNome = req.body.nome;
	var userEmail = req.body.email;
	var assunto = req.body.assunto;
	var msg = req.body.mensagem;
	var mailOptions = {
		from: '"Grupo MeadelaGym" <noreply@meadelagym.pt>',
		to: userEmail,
		subject: assunto,
		html: 'Obrigado pelo seu contacto '+userNome+'!<br>Foi enviado um email para os nossos colaboradores e será respondido assim que possível.<br>A sua mensagem foi:<br>"'+msg+'"<br><br>Esta é uma mensagem automática, não responda a este email.<br>Obrigado!'
	};
	var mailOptions2 = {
		from: '"Grupo MeadelaGym" <noreply@meadelagym.pt>',
		to: meadelaMail,
		subject: assunto,
		html: 'O utilizador '+userNome+', com o email: '+userEmail+', enviou a seguinte mensagem através do formulário do '+empresa+'<br>"'+msg+'".'
	};
	transport.sendMail(mailOptions, (error, info) => {
		if(error){
			res.send(error);
			console.log("erro1");
			console.log(error);
		} else {
			transport.sendMail(mailOptions2, (error, info) => {
        		if(error){
        			res.send(error);
			        console.log("erro2");
			        console.log(error);
        		} else {
        			res.send(info);
			        console.log(info);
        		}
        	});
		}
	});
});
  