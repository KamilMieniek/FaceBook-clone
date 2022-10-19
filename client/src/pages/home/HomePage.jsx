import React from 'react';
import Navbar from '../../layouts/Navbar.js';
import FriendsContainer from '../../features/chat/friendsContainer/FriendsContainer.js';
import './HomePage.css';
import basicimg from '../../assets/basic_user.png';
import Post from '../../components/Post.js';
import boner from '../../assets/boner.jpg';
import NewPost from '../../components/NewPost.js';
export const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="homePageContainer">
        <div className="left"></div>
        <div className="posts">
          <NewPost></NewPost>
          <Post
            img={`${basicimg}`}
            username="Kamil Mieniek"
            date="18h ago"
            description="OMG ja chyba śnie, uszczypnij mnie!
            Ale że to już??? Nowy sezon Egzorcysty"
            gallery={`${boner}`}
            likes="666"
            comments="666"
          />
          <Post
            img={`${basicimg}`}
            username="Kamil Mieniek"
            date="18h ago"
            description="OMG ja chyba śnie, uszczypnij mnie!
            Ale że to już??? Nowy sezon Egzorcysty"
            gallery={`${boner}`}
            likes="666"
            comments="666"
          />
          <Post
            img={`${basicimg}`}
            username="Kamil Mieniek"
            date="18h ago"
            description="OMG ja chyba śnie, uszczypnij mnie!
            Ale że to już??? Nowy sezon Egzorcysty"
            gallery={`${boner}`}
            likes="666"
            comments="666"
          />
          <Post
            img={`${basicimg}`}
            username="Kamil Mieniek"
            date="18h ago"
            description="OMG ja chyba śnie, uszczypnij mnie!
            Ale że to już??? Nowy sezon Egzorcysty"
            gallery={`${boner}`}
            likes="666"
            comments="666"
          />
        </div>
        <FriendsContainer></FriendsContainer>
      </div>
    </>
  );
};

export { HomePage as default };
