import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import styled from "styled-components";

import Post from "../Post/Post"
import { AuthContext } from "../../contexts/auth.context";
import { getData } from "../../functions/postFunctions";

export default function Posts({ picture }) {
    const token = localStorage.getItem("token");
    const { API_URL } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState("");
    const [url, setPublishURL] = useState("");
    const [modalvisible, setModalvisible] = useState(false);


    const URLposts = `${API_URL}/posts`;
    const URLlikes = `${API_URL}/likes`;
    const URLtrendings = `${API_URL}/hashtag`;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };


    useEffect(() => {
        getData(URLposts, setPosts, config);
    });
    

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

    function publishPost(e) {
        e.preventDefault();
        const body = { url, comment };
        axios
            .post(URLposts, body, config)
            .then(() => {
                alert("Post criado com sucesso");
                setPublishURL("");
                setComment("");
                getData(URLposts, setPosts, config);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });

        postHashTag();
    }

    return (
        <Wrapper>
            <div>
                <Publish>
                    <div>
                        <img src={picture} alt="user" />
                    </div>
                    <div>
                        <form onSubmit={publishPost}>
                            <h3>What are you going to share today?</h3>
                            <input
                                type="text"
                                placeholder="http://..."
                                value={url}
                                onChange={(e) => setPublishURL(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Awesome article about #javascript"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                            <button type="submit">Publish</button>
                        </form>
                    </div>
                </Publish>
            </div>
            <div>
                {posts.length ? (
                    posts.map((p) => (
                        <Post
                            key={p.id}
                            id={p.id}
                            picture={p.picture}
                            username={p.username}
                            comment={p.comment}
                            url={p.url}
                            user_id={p.user_id}
                            image={p.image}
                            likes={p.like_count}
                            description={p.description}
                            like_count={p.like_count}
                            modalvisible={modalvisible}
                            setModalvisible={setModalvisible}
                        />
                    ))
                ) : (
                    <></>
                )}

            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    >:nth-child(1){
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 30px;
    }
`

const Publish = styled.div`
    display: flex;
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
      input {
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
        :nth-child(2){
            height: 30px;
        }
        :nth-child(3){
            height: 65px;
        }
      }
      button {
        width: 112px;
        height: 31px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1877f2;
        border-radius: 5px;
        border: none;
        margin-left: 390px;
        font-family: "Lato";
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
        transition: 0.5s all;
        :hover {
            cursor: pointer;
            filter: brightness(120%);
            transform: scale(1.03);
        }
      }
    }

`