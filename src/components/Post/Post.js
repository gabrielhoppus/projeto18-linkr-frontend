import React, { useContext, useState, useEffect } from "react";
import { ReactTagify } from "react-tagify";
import { AuthContext } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getData } from "../../functions/postFunctions";
import { Tooltip as ReactTooltip, Tooltip } from "react-tooltip";
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
  HeaderWrapper,
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
  like_count,
  getPostId,
}) {
  const { setName, API_URL, token } = useContext(AuthContext);
  const [liked, setLiked] = useState("heart-outline");
  const [userLikes, setLikes] = useState([]);
  const [likedby, setLikedBy] = useState([]);
  const [cor, setColor] = useState("#ffffff");
  const [editPost, setEditPost] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const tagStyle = {
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  };

  const URLlikes = `${API_URL}/likes`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    getLikes();
    userLiked();
    if (userLikes.includes(id)) {
      setLiked("heart");
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
        setLikes(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function userLiked() {
    axios
      .get(`${URLlikes}/${id}`, config)
      .then((res) => {
        setLikedBy(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function likePost(id) {
    const body = { id };
    if (liked === "heart") {
      axios
        .post(URLlikes, body, config)
        .then(() => {
          console.log("ok delete");
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
          console.log("ok like");
        })
        .catch((err) => {
          alert(err.datamessage);
        });
      setLiked("heart");
      setColor("red");
    }
  }

  function patchPost(id) {
    const body = { comment: editValue };
    axios
      .patch(`${API_URL}/posts/${id}`, body, config)
      .then(() => {
        setClicked(false);
        setEditPost(false);

        //getData(URLposts, config, setPosts);
      })
      .catch((err) => {
        console.log(body, config);
        alert(err.response.data.message);
        setClicked(false);
      });
  }

  function handleTagClick(tag) {
    tag = tag.replace("#", "");
    navigate(`/hashtag/${tag}`);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setEditPost(false);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      setClicked(true);
      patchPost(id);

      // setClicked(true);
      // patchPost(id);
    }
  }

  return (
    <Wrapper>
      <UserPost>
        <img src={picture} alt="user"></img>
        <ion-icon
          data-tooltip-id="my-tooltip"
          data-tooltip-content={likedby}
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
            <div data-test="edit-btn">
              <EditIcon
                onClick={() => {
                  setEditPost(!editPost);
                  setEditValue("");
                }}
              >
                <ion-icon name="create-outline"></ion-icon>
              </EditIcon>
            </div>
            <TrashIcon
              onClick={() => {
                setModalvisible(!modalvisible);
                getPostId(id);
              }}
            >
              <div data-test="delete-btn">
                <ion-icon name="trash-outline"></ion-icon>
              </div>
            </TrashIcon>
          </IconContainer>
        </HeaderWrapper>
        {editPost === true ? (
          <EditInput>
            <input
              data-test="edit-input"
              autoFocus={true}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={clicked}
            />
          </EditInput>
        ) : (
          <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => handleTagClick(tag)}
          >
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
