const basicErrorHandler = require("../helpers/basicErrorHandler");
const createNewObjectBook = require("../helpers/createnewObjectbook");
const getBodyData = require("../helpers/getBodyData");
const notFoundfunc = require("../helpers/notFound.error");
const bookModel = require("../models/bookmodel");
const pool  = require("../config/database/connect");

async function getAllBookmarket(req, res) {
  try {
    const results = await new Promise((resolve, reject) => {
      pool.query('SELECT * FROM bookmarket',(error,results) => {
        if(error) {
          reject(error);
        } else {
          resolve(results)
        }
      })
    });  
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const resp = {
      status: "OK",
      results,
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    console.log(error)
    basicErrorHandler(res);
  }
}


async function createBookmarket(req, res) {
  try {
    const data = await getBodyData(req);
    const { title, pages, author } = JSON.parse(data);
    const newBook = createNewObjectBook(title, pages, author);
    const query="INSERT INTO bookmarket(id,book_id,summa,adress) VALUES(?,?,?,?)";
    const VALUES=[2,1,25000,"Toshkent shahar Chilonzor tumani Samarqand darvoza kuchasi 34uy"];
    const nRegion= await new Promise((resolve,reject)=>{
      pool.query(query,VALUES,(error,result)=>{
        if(error){
          reject(error)
        } else{
          resolve(result);
        }
      });
    });
    console.log(nRegion);
    bookModel.push(newBook);

    res.writeHead(201, {
      "Content-type": "application/json charset utf-8",
    });
    const resp = {
      status: "Created",
      book: newBook,
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    console.log(error);
    basicErrorHandler(res);
  }
}

async function getBookmarketById(req, res) {
  try {
    const id = req.url.split("/")[2];
    const query="SELECT * FROM bookmarket WHERE id=?";
    const oneBook = await new Promise((resolve,reject)=>{
      pool.query(query,id,(error,result)=>{
        if(error){
          reject(error)
        } else{
          resolve(result)
        }
      })
    })
    
    res.writeHead(200, {
      "Content-type": "application/json charset utf-8",
    });
    const resp = {
      status: 200,
      book: book,
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    basicErrorHandler(res);
  }
}

async function updateBookmarket(req, res) {
  try {
    const id = req.url.split("/")[2];
    const body = await getBodyData(req);
    const {title} = JSON.parse(body);
    const query = "UPDATE bookmarket SET summa=? WHERE id=?";
    const values = [summa,id];
    const updatedBook = await new Promise((resolve,reject)=>{
      pool.query(query,values,(error,result)=>{
        if(error){
          reject(error)
        } else{
          resolve(result)
        }
      })
    })
    
    res.writeHead(200, {
      "Content-type": "application/json charset utf-8",
    });
    const resp = {
      status: 200,
      message: "Successfully updated",
      updatedBook: updatedBook,
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    console.log(error);
    basicErrorHandler(res);
  }
}

async function deleteBookmarket(req, res) {
  try {
    const id = req.url.split("/")[2];
    const book = bookModel.findIndex((b) => b.id == id);
    if (book == -1) {
      notFoundfunc(res)
    }
    bookModel.splice(book, 1);
    res.writeHead(200, {
      "Content-type": "application/json charset utf-8",
    });
    const resp = {
      status: 200,
      message: "Successfully deleted",
    };
    res.end(JSON.stringify(resp));
  } catch (error) {
    basicErrorHandler(res)
  }
}
module.exports = {
  getAllBookmarket,
  createBookmarket,
  getBookmarketById,
  updateBookmarket,
  deleteBookmarket
};