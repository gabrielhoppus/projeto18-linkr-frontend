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
import Posts from "../components/Posts/Posts";
import { getData } from "../functions/postFunctions";
import { click } from "@testing-library/user-event/dist/click";

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
  }, []);

  const [posts, setPosts] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  const [modalvisible, setModalvisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  const URLposts = `${API_URL}/posts`;
  const URLtrendings = `${API_URL}/hashtag`;
  const [postData, setPostData] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  // useEffect(() => {
  //     const promise = axios.get(URLtrendings, config);
  //     promise.then((res) => {
  //         setHashtags(res.data);
  //     })
  //     promise.catch((err) => { alert(err.response.data.message) })
  // }, [])


  function getPostId(id) {
    setPostData(id);
    console.log(id);
  }

  function deletePost(post_id) {
    axios
      .delete(`${URLposts}/${post_id}`, config)
      .then(() => {
        setClicked(false);
        alert("Post deletado com sucesso");
        setModalvisible(!modalvisible);
        getData(URLposts, config, setPosts);
      })
      .catch((err) => {
        alert(err.response.data.message);
        setClicked(false);
      });
  }

  return (
    <Body dataLength={posts.length > 2}>
      <Header />
      <TimelinePosts>
        <title>timeline</title>
        <Section>
          <Posts
            picture={picture}
            modalvisible={modalvisible}
            setModalvisible={setModalvisible}
            getPostId={getPostId}
          />
          <Trendings>
            <p className="title">trending</p>
            <div className="line"></div>

              {hashtags.map((el) =>
                <div key={el.id} className="tags">{`${el.name.replace("#",'# ')}`}</div>

              )}
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
          clicked={clicked}
          setClicked={setClicked}
        />
      ) : (
        ""
      )}
    </Body>
  );
}

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
