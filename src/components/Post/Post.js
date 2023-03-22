import React, { useContext, useState } from "react";
import { ReactTagify } from "react-tagify";
import { AuthContext } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";
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
}) {
  const { setName } = useContext(AuthContext);
  const [liked, setLiked] = useState("heart-outline");
  const [cor, setColor] = useState("#ffffff");
  const [editPost, setEditPost] = useState(false);

  const navigate = useNavigate();

  const tagStyle = {
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };

  function likePost() {
    if (liked === "heart") {
      setLiked("heart-outline");
      setColor("#ffffff");
    } else {
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
          onClick={likePost}
          style={{ color: cor }}
          name={liked}
        ></ion-icon>
        <Likes>{`${likes} likes`}</Likes>
      </UserPost>
      <DataPost>
        <StyledLink to={`/user/${id}`} onClick={() => setName(username)}>
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
        {editPost === true ? (
          <EditInput></EditInput>
        ) : (
          <ReactTagify tagStyle={tagStyle} tagClicked={handleTagClick}>
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
