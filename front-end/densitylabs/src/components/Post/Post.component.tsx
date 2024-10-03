import React, { FC, useContext, useState } from 'react';
import axios from 'axios';
// Interfaces
import { PostFields } from '../PostsCard/PostsCard.component';
// Contexts
import { DataContext } from '../../context/data.context';


// Component-props typing
type PostProps = {
  postFields: PostFields;
};

const Post: FC<PostProps> = ({ postFields }) => {

  // Post fields
  const { id, email, comment } = postFields;

  // Editable post
  const [editablePost, setEditablePost] = useState<boolean>(false);
  const [editPostFields, setEditPostFields] = useState<PostFields>({email, comment});

  // Context to update data on DOM
  const { setUpdateData } = useContext(DataContext);

  /** Deletes a post in database postgreSQL. */
  const deletePost = (): void => {

    axios.delete(`http://localhost:4000/post/${id}`)
      .then(res => console.log(res))
      .catch(error => console.log(error));

    setUpdateData(true);
  }

  /** Edits a post in database postgreSQL. */
  const updatePost = (): void => {

    axios.put(`http://localhost:4000/post/${id}`, { email: editPostFields.email, comment: editPostFields.comment })
      .then(res => console.log(res))
      .catch(error => console.log(error));

    setEditablePost(false);
    
    setUpdateData(true);
  }

  /** Gets the values of 'input' and 'textarea' elements, and updates 'editPostFields' state.
   * @param event - React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {

    const { name, value } = event.target;
    setEditPostFields({ ...editPostFields, [name]: value });
  };


  return (
    <div className='post-component mb-4'>
      <div className="card w-100">
        {/* Email header */}
        <div className="card-header text-start">
          {
            !editablePost
            ? email
            : <input type='email' 
                     name='email' 
                     className='mb-2'
                     value={editPostFields.email} 
                     placeholder='Email' 
                     onChange={handleInputChange}/>
          }
        </div>
        {/* Comment body */}
        <div className="card-body text-start">
          {/* Comment */}
          <p className="card-text">
            { 
              !editablePost
              ? comment.length > 0 ? comment : '...'
              : <textarea typeof='text' 
                          name='comment' 
                          className='mb-2 w-100'
                          rows={4} 
                          value={editPostFields.comment} 
                          placeholder='Add a comment' 
                          onChange={handleInputChange} />
            }
          </p>
          {/* Actions on comment */}
          {
            !editablePost
            ? (
                <>
                  <button type='button' className="btn btn-link ps-0" onClick={()=> setEditablePost(true)}>Edit</button>
                  <button type='button' className="btn btn-link ps-0" onClick={deletePost}>Delete</button>
                </>
              )
            : <button type='button' className='btn btn-primary' onClick={updatePost}>Update</button>
            
          }
        </div>
      </div>
    </div>
  )
}

export default Post;
