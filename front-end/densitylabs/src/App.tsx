import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// Components
import PostsCard from './components/PostsCard/PostsCard.component';
// Styles
import './App.css';


function App() {

  return (
    <div className="App">
      <h2>DensityLabs Posts</h2>
      <br />
      <div className='d-flex flex-column align-items-center container'>
        <PostsCard />
      </div>
    </div>
  );
}

export default App;
