/* Controllers for Routes */
import { pool } from '../database.js';


/** Gets the posts from database postgreSQL.
 * @param req - Request from client.
 * @param res - Response of server.
 */
export const getPosts = async (req, res) => {

  try {
    const { rows } = await pool.query('SELECT * FROM posts;');
    res.json(rows);

  } catch (error) {
    console.log(error);
  }
};

/** Creates a new post into database postgreSQL.
 * @param req - Request from client.
 * @param res - Response of server.
 */
export const createNewPost = async (req, res) => {

  try {
    const data = req.body;
    const { rows } = await pool.query('INSERT INTO posts (email, comment) VALUES ($1, $2) RETURNING *;', [data.email, data.comment]);

    return res.json(rows[0]);
    
  } catch (error) {
    
    res.status(500).json({message: 'Internal server error.'});
  }
};

/** Updates an existing post in database postgreSQL.
 * @param req - Request from client.
 * @param res - Response of server.
 */
export const updatePost = async (req, res) => {

  try {
    const { id } = req.params;
    const data = req.body;

    const { rows } = await pool.query('UPDATE posts SET email = $1, comment = $2 WHERE id = $3 RETURNING *;', [data.email, data.comment, id]);

    return res.json(rows[0]);

  } catch (error) {
    
    return res.status(500).json({message: 'Internal server error'});
  }
};

/** Deletes a post in database postgreSQL.
 * @param req - Request from client.
 * @param res - Response of server.
 */
export const deletePost = async (req, res) => {

  try {
    const { id } = req.params;
    console.log(id);

    const { rows, rowCount } = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *;', [id]);

    if (rowCount === 0) {
      return res.status(404).json({message: 'User not found'});
    } 

    return res.sendStatus(204);

  } catch (error) {
    
    return res.status(500).json({message: 'Internal server error'});
  }
};
