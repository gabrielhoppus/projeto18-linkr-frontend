import React, { useContext, useState, useEffect } from "react";
import { ReactTagify } from "react-tagify";
import { AuthContext } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip'
import {
  Wrapper,
  UserPost,
  Likes,
  StyledLink,
  IconContainer,
  EditIcon,
  TrashIcon,
  EditInput,
  Description,
  UrlContent,
  DataPost,
  HeaderWrapper
} from "./StyledPost";

export default function Post({
  id,
  username,
  picture,
  image,
  likes,
  comment,
  url,
  description,
  modalvisible,
  setModalvisible,
  user_id,
  like_count
}) {
  const { setName, API_URL, token } = useContext(AuthContext);
  const [liked, setLiked] = useState("heart-outline");
  const [userLikes, setLikes] = useState([]);
  const [likedby, setLikedBy] = useState([]);
  const [cor, setColor] = useState("#ffffff");
  const [editPost, setEditPost] = useState(false);

  const navigate = useNavigate();

  const tagStyle = {
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };

  const URLlikes = `${API_URL}/likes`

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    getLikes();
    userLiked();
    if (userLikes.includes(id)) {
      setLiked("heart")
      setColor("red");
    } else {
      setLiked("heart-outline");
      setColor("#ffffff");
    }
  }, [userLikes]);

  function getLikes() {
    axios
      .get(URLlikes, config)
      .then((res) => {
        setLikes(res.data)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  function userLiked(){
    axios
      .get(`${URLlikes}/${id}`, config)
      .then((res) => {
        setLikedBy(res.data)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  function likePost(id) {
    const body = { id };
    if (liked === "heart") {
      axios
        .post(URLlikes, body, config)
        .then(() => {
          console.log("ok delete")
        })
        .catch((err) => {
          alert(err.message);
        });
      setLiked("heart-outline");
      setColor("#ffffff");
    } else {
      axios
        .post(URLlikes, body, config)
        .then(() => {
          console.log("ok like")
        })
        .catch((err) => {
          alert(err.datamessage);
        });
      setLiked("heart");
      setColor("red");
    }
  }

  function handleTagClick(tag) {
    tag = tag.replace("#", "");
    navigate(`/hashtag/${tag}`);
  }


  return (
    <Wrapper>
      <UserPost>
        <img src={picture} alt="user"></img>
          <ion-icon
            data-tooltip-id="my-tooltip" data-tooltip-content={likedby}
            onClick={() => likePost(id)}
            style={{ color: cor }}
            name={liked}
          ></ion-icon>
          <Tooltip id="my-tooltip" />
        <Likes>{`${like_count} likes`}</Likes>
      </UserPost>
      <DataPost>
        <HeaderWrapper>
          <StyledLink to={`/user/${user_id}`} onClick={() => setName(username)}>
            {username}
          </StyledLink>
          <IconContainer>
            {" "}
            <EditIcon onClick={() => setEditPost(!editPost)}>
              <ion-icon name="create-outline"></ion-icon>
            </EditIcon>
            <TrashIcon onClick={() => setModalvisible(!modalvisible)}>
              <ion-icon name="trash-outline"></ion-icon>
            </TrashIcon>
          </IconContainer>
        </HeaderWrapper>
        {editPost === true ? (
          <EditInput></EditInput>
        ) : (
          <ReactTagify tagStyle={tagStyle} tagClicked={(tag)=>handleTagClick(tag)}>
            <Description>{comment}</Description>
          </ReactTagify>
        )}
        <UrlContent href={url} style={{ textDecoration: "none" }}>
          <h1>Como aplicar o Material UI em um projeto React</h1>
          <h2>{description}</h2>
          <h3>{url}</h3>
          <img src={image} alt="post"></img>
        </UrlContent>
      </DataPost>
    </Wrapper>
  );
}
