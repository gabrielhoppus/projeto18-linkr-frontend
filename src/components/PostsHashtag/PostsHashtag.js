import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import styled from "styled-components";

import Post from "../Post/Post"
import { AuthContext } from "../../contexts/auth.context";
import { getData } from "../../functions/postFunctions";

export default function PostsHashTag({ picture }) {
    const token = localStorage.getItem("token");
    const { API_URL } = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState("");
    const [url, setPublishURL] = useState("");
    const [modalvisible, setModalvisible] = useState(false);


    const URLposts = `${API_URL}/posts`;
    const URLtrendings = `${API_URL}/hashtag`;

    const likes = 247;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };


    useEffect(() => {

        getData(URLtrendings, setPosts, config);
    });


    return (
        <Wrapper>
            <div>
                {posts.length ? (
                    posts.map((p) => (
                        <Post
                            id={p.id}
                            picture={p.picture}
                            username={p.username}
                            comment={p.comment}
                            url={p.url}
                            image={p.image}
                            likes={likes}
                            description={p.description}
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
