import React, { FC, useContext, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
// Utils
import { getData } from '../../utils/data.utils';
// Components
import Form from '../Form/Form.component';
import Post from '../Post/Post.component';
// Contexts
import { DataContext } from '../../context/data.context';


/** Fields of a post.
 * @param id number - Id identifier.
 * @param email string - Email from a user.
 * @param comment string - Comment from a user.
 * @param created_at string - Date of post creation.
 */
export interface PostFields {
  id?: number;
  email: string;
  comment: string;
  created_at?: string;
}

// Component-props typing
type PostsCardProps = {};

const PostsCard: FC<PostsCardProps> = () => {

  const [posts, setPosts] = useState<PostFields[]>([]);

  const { updateData, setUpdateData } = useContext(DataContext);

  useEffect(() => {

    /** Fetches the posts from database postgreSQL. */
    const fetchPosts = async () => {

      const postsData = await getData<AxiosResponse <PostFields[]>>('http://localhost:4000/posts');
      setPosts(postsData.data);
      setUpdateData(false);
    };

    fetchPosts();

  }, [updateData]);


  return (
    <div className='postcard-component w-50 mb-4'>
      <div className='card w-100'>
        <div className='card-body'>
          <h5 className='card-title text-start'>Leave Comments</h5>
          {/* Form component */}
          <Form />
          {/* Post component */}
          {
            posts.map((post: PostFields) => <Post key={post.id} postFields={post} />)
          }
        </div>
      </div>
    </div>
  )
};

export default PostsCard;
