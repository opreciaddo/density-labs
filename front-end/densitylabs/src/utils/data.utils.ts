/* Fetches data from database postgreSQL */
import axios from 'axios';


/** Fetches the posts from database postgreSQL. */
export const getData = async <T>(url: string): Promise<T> => {

  return await axios.get(url);
};
