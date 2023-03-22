import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import { AuthContext } from "../contexts/auth.context";
import DeleteModal from "../components/modal";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { IoPencil, IoTrashOutline } from "react-icons/io5";

import swal from "sweetalert";
import Post from "../components/Post/Post";

export default function Timeline() {
  const { API_URL, name, picture, setName } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      swal({
        title: "Não autorizado",
        text: "Não foi possível realizar a autenticação",
        icon: "error",
      });
      navigate("/");
    }
  });


  const [likes, setLikes] = useState(247);

  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [url, setPublishURL] = useState("");
  const [comment, setComment] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [modalvisible, setModalvisible] = useState(false);

  const URLposts = `${API_URL}/posts`;
  const URLtrendings = `${API_URL}/hashtag`;
  const [postData, setPostData] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {

    getPosts();
  }, []);

  function getPosts() {
    const promise = axios.get(URLposts, config);

    promise.then((res) => {
      setPosts(res.data);
    });
    promise.catch((err) => {
      console.log(err.message);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  }

  // useEffect(() => {
  //     const promise = axios.get(URLtrendings, config);
  //     promise.then((res) => {
  //         setHashtags(res.data);
  //     })
  //     promise.catch((err) => { alert(err.response.data.message) })
  // }, [])

  function publishPost(e) {
    e.preventDefault();
    const body = { url, comment };
    axios
      .post(URLposts, body, config)
      .then(() => {
        alert("Post criado com sucesso");
        setPublishURL("");
        setComment("");
        getPosts();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    postHashTag();
  }

  function postHashTag() {

    let commentArray = comment.split(" ");

    let commentFiltered = commentArray.filter((el) => el[0] === "#");

    if (commentFiltered.length > 0) {
      commentFiltered.forEach((el) => {
        el.replace("#", "");
        const body = { name: el };
        const promise = axios.post(URLtrendings, body, config);
        promise.then((res) => {
          console.log(res.data);
        });
        promise.catch((err) => {
          alert(err.response.data.message);
        });
      });

    
    }
  }

  function search(e) {
    e.preventdefault();
  }



  function deletePost(post_id) {
    axios
      .post(`${URLposts}/${post_id}`, config)
      .then(() => {
        alert("Post deletado com sucesso");
        setModalvisible(!modalvisible);
        getPosts();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  return (
    <Body dataLength={posts.length > 2}>
      <Header />
      <TimelinePosts>
        <title>timeline</title>
        <Section>
          <Posts>
            <div className="publish">
              <img src={picture} alt="user"></img>
              <form onSubmit={publishPost}>
                <h3>What are you going to share today?</h3>
                <input
                  className="input inpLink"
                  type="text"
                  placeholder="http://..."
                  value={url}
                  onChange={(e) => setPublishURL(e.target.value)}
                  required
                ></input>
                <input
                  className="input inpText"
                  type="text"
                  placeholder="Awesome article about #javascript"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></input>
                <button type="submit" className="publishButton">
                  <h4>Publish</h4>
                </button>
              </form>
            </div>

            {posts.length ? (
              posts.map((i) => (
                <Post
                  id={i.id}
                  picture={i.picture}
                  username={i.username}
                  comment={i.comment}
                  url={i.url}
                  image={i.image}
                  likes={likes}
                  description={i.description}
                  modalvisible={modalvisible}
                  setModalvisible={setModalvisible}
                />
              ))
            ) : (
              <></>
            )}

  
          </Posts>
          <Trendings>
            <p className="title">trending</p>
            <div className="line"></div>
            <span className="allTags">
              {hashtags.map((i) => (
                <div key={i.id} className="tags">{`# ${i.name}`}</div>
              ))}
            </span>
          </Trendings>
        </Section>
      </TimelinePosts>
      {modalvisible === true ? (
        <DeleteModal
          modalvisible={modalvisible}
          setModalvisible={setModalvisible}
          deletePost={deletePost}
          postData={postData}
        />
      ) : (
        ""
      )}
    </Body>
  );
}

const StyledLink = styled(Link)`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const PencilIcon = styled(IoPencil)`
  color: white;
  font-size: 24px;
  margin: 0 5px;
  &:hover {
    color: lightblue;
  }`
;

const TrashIcon = styled(IoTrashOutline)`
  color: white;
  font-size: 24px;
  margin: 0 5px;
  &:hover {
    color: crimson;
  }
`

const Body = styled.div`
  width: 100%;
  height: ${(props) => (props.dataLength ? "max-content" : "100%")};
  display: flex;
  justify-content: center;
  background-color: #333333;
  box-sizing: border-box;
  padding-top: 102px;
  position: relative;
`;

const Logout = styled.p`
  width: 150px;
  height: 47px;
  display: ${(props) => (props.showLogout ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: #171717;
  border-bottom-left-radius: 20px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  color: #ffffff;
  position: fixed;
  right: 0;
  top: 72px;
  :hover {
    cursor: pointer;
  }
`;
const TimelinePosts = styled.div`
  width: 937px;
  display: flex;
  flex-direction: column;
  align-items: center;
  title {
    width: 100%;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
  }
`;
const Section = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Posts = styled.div`
  .publish {
    width: 611px;
    height: 209px;
    display: flex;
    box-sizing: border-box;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 25px;
    img {
      width: 53px;
      height: 53px;
      clip-path: circle(50% at 50% 50%);
    }
    h3 {
      font-family: "Lato";
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 24px;
      color: #707070;
      box-sizing: border-box;
      padding-bottom: 12px;
    }
    form {
      width: 519px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: 16px;
      position: relative;
      .input {
        width: 503px;
        background: #efefef;
        border-radius: 5px;
        border: none;
        box-sizing: border-box;
        margin-bottom: 5px;
        display: flex;
        position: relative;
        padding-left: 10px;
        ::placeholder {
          position: absolute;
          top: 5px;
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          color: #898b90;
        }
      }
      .inpLink {
        height: 30px;
      }
      .inpText {
        height: 66px;
      }
      .publishButton {
        width: 112px;
        height: 31px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1877f2;
        border-radius: 5px;
        border: none;
        position: absolute;
        bottom: 0;
        right: 0;
        h4 {
          font-family: "Lato";
          font-style: normal;
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          color: #ffffff;
        }
        &:hover {
          cursor: pointer;
          filter: brightness(120%);
          h4 {
            font-size: 16px;
            transition: 0.5s;
          }
          transition: 0.5s;
        }
        &:not(:hover) {
          transition: 0.5s;
        }
      }
    }
  }
`;

const Trendings = styled.aside`
  display: flex;
  flex-direction: column;
  width: 301px;
  height: min-content;
  background: #171717;
  border-radius: 16px;
  .title,
  .allTags {
    width: 100%;
    box-sizing: border-box;
    padding-left: 16px;
  }
  .title {
    height: 61px;
    display: flex;
    align-items: center;
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
  }
  .line {
    width: 100%;
    height: 2px;
    background-color: #333333;
    margin-bottom: 20px;
  }
  .allTags {
    margin-bottom: 20px;
    .tags {
      margin-bottom: 5px;
      font-family: "Lato";
      font-style: normal;
      font-weight: 700;
      font-size: 19px;
      line-height: 23px;
      color: #ffffff;
    }
  }
`;

