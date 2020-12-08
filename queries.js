const Pool = require('pg').Pool
const pool = new Pool ({
  user: 'tiistai',
  host: 'localhost',
  database: 'tiistaikartat',
  password: 'admin',
  port: 5432,
})

const haePaikat = (request, response) => {
  pool.query('SELECT * FROM paikat ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const lisaaPaikka = (request, response) => {
  const { paikka, arvostelu, longitude, latitude } = request.body;
  console.log(request.body);
  pool.query('INSERT INTO Paikat (paikka, arvostelu, longitude, latitude) VALUES ($1, $2, $3, $4)', [paikka, arvostelu, longitude, latitude], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Paikka lisatty`);
  })
}

module.exports = {
  haePaikat,
  lisaaPaikka
}
