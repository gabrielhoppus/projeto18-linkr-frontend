import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import { AuthContext } from "../contexts/auth.context";

export default function Timeline() {

    const { API_URL, token, name, picture } = useContext(AuthContext);
    const [chevron, setChevron] = useState("chevron-down");
    const [iconUp, setIconUp] = useState(false);
    const [liked, setLiked] = useState("heart-outline");
    const [cor, setColor] = useState("#ffffff");
    const [likes, setLikes] = useState(247);
    const [posts, setPosts] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [publishURL, setPubrishURL] = useState("");
    const [comment, setComment] = useState("");
    const [showLogout, setShowLogout] = useState(false);

    const URLposts = `${API_URL}/posts`;
    const URLtrendings = `${API_URL}/hashtag`;

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(() => {
        const promise = axios.get(URLposts, config)
        promise.then((res) => {
            setPosts(res.data);
        })
        //promise.catch((err) => { alert(err.response.data.message) })
    }, [])

    useEffect(() => {
        const promise = axios.get(URLtrendings, config)
        promise.then((res) => {
            setHashtags(res.data);
        })
        //promise.catch((err) => { alert(err.response.data.message) })
    }, [])

    function publishPost(e) {
        e.preventdefault();
        const body = { publishURL, comment};
        const promise = axios.post(URLposts, body, config);
        promise.then((res) => {
            console.log(res.data);
        })
        promise.catch((err) => {
            //alert(err.response.data.message);
        })
    }

    function logout() {
        if (!iconUp) {
            setChevron("chevron-up");
            setIconUp(true);
            setShowLogout(true);
        } else {
            setIconUp(false);
            setChevron("chevron-down");
            setShowLogout(false);
        }
    }

    function search(e) {
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
        <Body dataLength={posts.length > 2}>
            <Header>
                <h1>linkr</h1>
                <form onSubmit={search}>
                    <input type="text" placeholder="Search for People"></input>
                    <button type="submit"><ion-icon name="search-outline"></ion-icon></button>
                </form>
                <span>
                    <ion-icon name={chevron} onClick={logout}></ion-icon>
                    <img src={picture} alt="user"></img>
                </span>
            </Header>
            <Logout showLogout={showLogout}>
                Logout
                </Logout>
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
                                    onChange={e => setPubrishURL(e.target.value)}
                                    required>
                                </input>
                                <input
                                    className="input inpText"
                                    type="text"
                                    placeholder="Awesome article about #javascript"
                                    onChange={e => setComment(e.target.value)}>
                                </input>
                                <button type="submit" className="publishButton"><h4>Publish</h4></button>
                            </form>
                        </div>
                        {posts.map((i) =>
                            <Post key={i.id}>
                                <div className="userPost">
                                    <img src={picture} alt="user"></img>
                                    <ion-icon onClick={likePost} style={{ color: cor }} name={liked}></ion-icon>
                                    <p className="likes">{`${likes} likes`}</p>
                                </div>
                                <div className="dataPost">
                                    <h4 className="userName">{name}</h4>
                                    <p className="description">Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</p>
                                    <UrlContent href={i.url} style={{ textDecoration: 'none' }}>
                                        <p className="urlTitle">Como aplicar o Material UI em um projeto React</p>
                                        <p className="urlDescription">{i.description}</p>
                                        <p className="urlLink">{i.url}</p>
                                        <img src={i.image} alt="image"></img>
                                    </UrlContent>
                                </div>
                            </Post>
                        )}
                    </Posts>
                    <Trendings>
                        <p className="title">trending</p>
                        <div className="line"></div>
                        <span className="allTags">
                            {hashtags.map(i => <div key={i.id} className="tags">{`# ${i.name}`}</div>)}
                        </span>
                    </Trendings>
                </Section>
            </TimelinePosts>
        </Body>
    );
}

const Body = styled.div`
    width: 100vw;
    height: ${props => props.dataLength ? "max-content" : "100vh"};
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
    h1{
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 54px;
        color: #FFFFFF;
    }
    form{
        display: flex;
        align-items: center;
        justify-content: center;
        input{
            width: 513px;
            height: 45px;
            background: #FFFFFF;
            font-family: 'Lato';
            font-style: normal;
            font-weight: 200;
            font-size: 18px;
            color: #000000;
            box-sizing: border-box;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            border: none;
            padding-left: 20px;
            &:placeholder-shown{
                line-height: 25px;
                padding-left: 20px;
                color: #DBDBDB;
            }
        }
        button{
            width: 50px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: #FFFFFF;
            border: none;
            ion-icon {
                color: #C6C6C6;
                font-size: 25px;
                --ionicon-stroke-width: 50px;
            }
            &:hover{
                cursor: pointer;
                background-color: #333333;
                transition: 0.5s;
                ion-icon {
                    --ionicon-stroke-width: 70px;
                    color: #FFFFFF;
                    transition: 0.5s;
            }
            }
            &:not(:hover){
                transition: 0.5s;
                ion-icon {
                    transition: 0.5s;
                }
            }
        }
    }
    span{
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        ion-icon{
            color: #FFFFFF;
            font-size: 35px;
            &:hover{
            cursor: pointer;
        }
        }
        img{
            width: 53px;
            clip-path: circle(50.0% at 50% 50%);
        }
    }
    
`;
const Logout = styled.p`
    width: 150px;
    height: 47px;
    display: ${props => props.showLogout ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    background: #171717;
    border-bottom-left-radius: 20px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
    position: fixed;
    right: 0;
    top: 72px;
`;
const TimelinePosts = styled.div`
    width: 937px;
    display: flex;
    flex-direction: column;
    align-items: center;
    title{
        width: 100%;
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
    }
`;
const Section = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const Posts = styled.div`
    .publish{
        width: 611px;
        height: 209px;
        display: flex;
        box-sizing: border-box;
        padding: 16px;
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 16px;
        margin-bottom: 25px;
        img{
            width: 53px;
            height: 53px;
            clip-path: circle(50.0% at 50% 50%);
        }
        h3{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 300;
            font-size: 20px;
            line-height: 24px;
            color: #707070;
            box-sizing: border-box;
            padding-bottom: 12px;
        }
        form{
            width: 519px;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            padding-left: 16px;
            position: relative;
            .input{
                width: 503px;
                background: #EFEFEF;
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
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 21px;
                    color: #898b90;
                }                
            }
            .inpLink{
                height: 30px;
            }
            .inpText{
                height: 66px;
            }
            .publishButton{
                width: 112px;
                height: 31px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #1877F2;
                border-radius: 5px;
                border: none;
                position: absolute;
                bottom: 0;
                right: 0;
                h4{
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 17px;
                    color: #FFFFFF;
                }
                &:hover{
                    cursor: pointer;
                    filter: brightness(120%);
                    h4{
                        font-size: 16px;
                        transition: 0.5s;
                    }
                    transition: 0.5s;
                }
                &:not(:hover){
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
    .title, .allTags{
        width: 100%;
        box-sizing: border-box;
        padding-left: 16px;
    }
    .title{
        height: 61px;
        display: flex;
        align-items: center;
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #FFFFFF;
    }
    .line{
        width: 100%;
        height: 2px;
        background-color: #333333;
        margin-bottom: 20px;
    }
    .allTags{
        margin-bottom: 20px;
        .tags{
            margin-bottom: 5px;
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            font-size: 19px;
            line-height: 23px;
            color: #FFFFFF;
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
    margin-bottom: 15px;
    .userPost{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 15px;
        img{
        width: 53px;
        height: 53px;
        clip-path: circle(50.0% at 50% 50%);
        margin-bottom: 12px;
        }
        ion-icon{
            font-size: 25px;
            margin-bottom: 5px;
            &:hover{
                cursor: pointer;
            }
        }
        .likes{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            color: #FFFFFF;
        }

    }
    .dataPost{
        display: flex;
        flex-direction: column;
        .userName, .description{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
        }
        .userName{
            font-size: 19px;
            line-height: 23px;
            color: #FFFFFF;
            margin-bottom: 5px;
        }
        .description{
            font-size: 17px;
            line-height: 20px;
            color: #B7B7B7;
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
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    position: relative;
    img{
        position: absolute;
        right: 0;
        width: 155px;
        height: 155px;
        border-radius: 0px 11px 11px 0px;
    }
    .urlTitle, .urlDescription, .urlLink{
        width:65%;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        margin-left: 10px;
    }
    .urlTitle{
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        margin-top: 24px;
        margin-bottom: 5px;
    }
    .urlDescription{
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin-bottom: 13px;
    }
    .urlLink{
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
    }
`;
