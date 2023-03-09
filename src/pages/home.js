import styled from "styled-components";
import { useState } from "react";
import React from "react";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate()

    const imgUser = "https://img1.ak.crunchyroll.com/i/spire3/38bed21ddb85f2ceb0a8986eea3485bd1661224942_large.jpg";
    const [chevron, setChevron] = useState("chevron-down");
    const [iconUp, setIconUp] = useState(false);
    const hashtags = [{ id: 1, name: "javascript" }, { id: 2, name: "react" }, { id: 3, name: "react-native" },
    { id: 4, name: "material" }, { id: 5, name: "web-dev" }, { id: 6, name: "mobile" }, { id: 7, name: "css" },
    { id: 8, name: "html" }, { id: 9, name: "node" }];

    function logout(){
        if(!iconUp){
            setChevron("chevron-up");
            setIconUp(true);
        }else{
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

    return (
        <Body>
            <Header>
                <h1>linkr</h1>
                <form onSubmit={search}>
                    <input type="text" placeholder="Search for People"></input>
                    <button type="submit"><ion-icon name="search-outline"></ion-icon></button>
                </form>
                <span>
                    <ion-icon name={chevron} onClick={logout}></ion-icon>
                    <img src={imgUser} alt="user"></img>
                </span>
            </Header>
            <Timeline>
                <title>timeline</title>
                <Section>
                    <ReactTagify
                    colors={"white"}
                    tagClicked={(tag)=> navigate(`/hashtag/${tag}`)}>
                        <Posts>
                            <div className="publish">
                                <img src={imgUser} alt="user"></img>
                                <form onSubmit={publishPost}>
                                    <h3>What are you going to share today?</h3>
                                    <input className="input inpLink" type="text" placeholder="http://..."></input>
                                    <input className="input inpText" type="text" placeholder="Awesome article about #javascript"></input>
                                    <button type="submit" className="publishButton"><h4>Publish</h4></button>
                                </form>
                            </div>
                        </Posts>
                    </ReactTagify>
                    <Trendings>
                        <p className="title">trending</p>
                        <div className="line"></div>
                        <span className="allTags">
                            {hashtags.map(i => <div key={i.id} className="tags">{`# ${i.name}`}</div>)}
                        </span>
                    </Trendings>
                </Section>
            </Timeline>
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
const Timeline = styled.div`
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
        margin-bottom: 10px;
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

