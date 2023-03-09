import styled from "styled-components";
import { useState, useEffect } from "react";
import React from "react";
import DeleteModal from "../components/modal";

export default function Timeline() {
  const imgUser =
    "https://img1.ak.crunchyroll.com/i/spire3/38bed21ddb85f2ceb0a8986eea3485bd1661224942_large.jpg";
  const [chevron, setChevron] = useState("chevron-down");
  const [iconUp, setIconUp] = useState(false);
  const [liked, setLiked] = useState("heart-outline");
  const [cor, setColor] = useState("#ffffff");
  const [likes, setLikes] = useState(247);
  const [modalvisible, setModalvisible] = useState(false);
  const hashtags = [
    { id: 1, name: "javascript" },
    { id: 2, name: "react" },
    { id: 3, name: "react-native" },
    { id: 4, name: "material" },
    { id: 5, name: "web-dev" },
    { id: 6, name: "mobile" },
    { id: 8, name: "html" },
    { id: 9, name: "jorge" },
  ];

  function logout() {
    if (!iconUp) {
      setChevron("chevron-up");
      setIconUp(true);
    } else {
      setIconUp(false);
      setChevron("chevron-down");
    }
  }

  function search(e) {
    e.preventdefault();
  }
  function publishPost(e) {
    e.preventdefault();
  }
  function likePost() {
    if (liked === "heart") {
      setLiked("heart-outline");
      setColor("#ffffff");
    } else {
      setLiked("heart");
      setColor("red");
    }
  }

  return (
    <Body>
      <Header>
        <h1>linkr</h1>
        <form onSubmit={search}>
          <input type="text" placeholder="Search for People"></input>
          <button type="submit">
            <ion-icon name="search-outline"></ion-icon>
          </button>
        </form>
        <span>
          <ion-icon name={chevron} onClick={logout}></ion-icon>
          <img src={imgUser} alt="user"></img>
        </span>
      </Header>
      <TimelinePosts>
        <title>timeline</title>
        <Section>
          <Posts>
            <div className="publish">
              <img src={imgUser} alt="user"></img>
              <form onSubmit={publishPost}>
                <h3>What are you going to share today?</h3>
                <input
                  className="input inpLink"
                  type="text"
                  placeholder="http://..."
                ></input>
                <input
                  className="input inpText"
                  type="text"
                  placeholder="Awesome article about #javascript"
                ></input>
                <button type="submit" className="publishButton">
                  <h4>Publish</h4>
                </button>
              </form>
            </div>
            <Post>
              <div className="userPost">
                <img src={imgUser} alt="user"></img>
                <ion-icon
                  onClick={likePost}
                  style={{ color: cor }}
                  name={liked}
                ></ion-icon>
                <p className="likes">{`${likes} likes`}</p>
              </div>
              <div className="dataPost">
                <PostHeader>
                  <h4 className="userName">Saitama da Silva</h4>
                  <IconContainer>
                    {" "}
                    <Editicon>
                      <ion-icon name="create-outline"></ion-icon>
                    </Editicon>
                    <TrashIcon onClick={() => setModalvisible(!modalvisible)}>
                      <ion-icon name="trash-outline"></ion-icon>
                    </TrashIcon>
                  </IconContainer>
                </PostHeader>

                <p className="description">
                  Muito maneiro esse tutorial de Material UI com React, deem uma
                  olhada!
                </p>

                <UrlContent
                  href="https://www.youtube.com/watch?v=xQtC3F8fH6g"
                  style={{ textDecoration: "none" }}
                >
                  <p className="urlTitle">
                    Como aplicar o Material UI em um projeto React
                  </p>
                  <p className="urlDescription">
                    Hey! I have moved this tutorial to my personal blog. Same
                    content, new location. Sorry about making you click through
                    to another page.
                  </p>
                  <p className="urlLink">
                    https://www.youtube.com/watch?v=xQtC3F8fH6g
                  </p>
                  <img
                    src="https://usemobile.com.br/wp-content/uploads/2022/08/react-native-logo-em-cores-claras.png"
                    alt="image"
                  ></img>
                </UrlContent>
              </div>
            </Post>
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
        />
      ) : (
        ""
      )}
    </Body>
  );
}

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #333333;
  box-sizing: border-box;
  padding-top: 102px;
  position: relative;
`;
const Header = styled.header`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000000;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  position: fixed;
  top: 0;
  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    color: #ffffff;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      width: 513px;
      height: 45px;
      background: #ffffff;
      font-family: "Lato";
      font-style: normal;
      font-weight: 200;
      font-size: 18px;
      color: #000000;
      box-sizing: border-box;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border: none;
      padding-left: 20px;
      &:placeholder-shown {
        line-height: 25px;
        padding-left: 20px;
        color: #dbdbdb;
      }
    }
    button {
      width: 50px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: #ffffff;
      border: none;
      ion-icon {
        color: #c6c6c6;
        font-size: 25px;
        --ionicon-stroke-width: 50px;
      }
      &:hover {
        cursor: pointer;
        background-color: #333333;
        transition: 0.5s;
        ion-icon {
          --ionicon-stroke-width: 70px;
          color: #ffffff;
          transition: 0.5s;
        }
      }
      &:not(:hover) {
        transition: 0.5s;
        ion-icon {
          transition: 0.5s;
        }
      }
    }
  }
  span {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ion-icon {
      color: #ffffff;
      font-size: 35px;
      &:hover {
        cursor: pointer;
      }
    }
    img {
      width: 53px;
      clip-path: circle(50% at 50% 50%);
    }
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
const Post = styled.div`
  width: 611px;
  height: 276px;
  background: #171717;
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 16px;
  .userPost {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 53px;
      height: 53px;
      clip-path: circle(50% at 50% 50%);
      margin-bottom: 12px;
      margin-right: 15px;
    }
    ion-icon {
      font-size: 25px;
      margin-bottom: 5px;
      &:hover {
        cursor: pointer;
      }
    }
    .likes {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      color: #ffffff;
    }
  }
  .dataPost {
    display: flex;
    flex-direction: column;
    .userName,
    .description {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
    }
    .userName {
      font-size: 19px;
      line-height: 23px;
      color: #ffffff;
      margin-bottom: 5px;
    }
    .description {
      font-size: 17px;
      line-height: 20px;
      color: #b7b7b7;
      margin-bottom: 10px;
    }
  }
`;
const UrlContent = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 503px;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  position: relative;
  img {
    position: absolute;
    right: 0;
    width: 155px;
    height: 155px;
    border-radius: 0px 11px 11px 0px;
  }
  .urlTitle,
  .urlDescription,
  .urlLink {
    width: 65%;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    margin-left: 10px;
  }
  .urlTitle {
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-top: 24px;
    margin-bottom: 5px;
  }
  .urlDescription {
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;
  }
  .urlLink {
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TrashIcon = styled.div`
  color: white;
  font-size: 24px;
  margin: 0 5px;
  &:hover {
    color: crimson;
  }
`;
const Editicon = styled.div`
  color: white;
  font-size: 24px;
  margin: 0 5px;
  &:hover {
    color: lightblue;
  }
`;
const IconContainer = styled.div`
  display: flex;
`;
