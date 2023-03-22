import styled from "styled-components";
import { Link } from "react-router-dom";

export const UserPost = styled.div`
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
`;
export const Description = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
  margin-bottom: 10px;
`;
export const DataPost = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StyledLink = styled(Link)`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
`;
export const Likes = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  color: #ffffff;
`;
export const Wrapper = styled.div`
  width: 611px;
  height: 276px;
  background: #171717;
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 13px;

  .dataPost {
    display: flex;
    flex-direction: column;
  }
`;

export const TrashIcon = styled.div`
  color: white;
  font-size: 24px;
  margin: 0 5px;
  &:hover {
    color: crimson;
  }
`;
export const Editicon = styled.div`
  color: white;
  font-size: 24px;
  margin: 0 5px;
  &:hover {
    color: lightblue;
  }
`;
export const IconContainer = styled.div`
  display: flex;
`;
export const EditInput = styled.input`
  border-radius: 7px;
  margin: 7px 0;
  height: 44px;
  font-family: "Lato";
  font-size: 18px;
  padding-left: 7px;
`;
const NaviIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const UrlContent = styled.a`
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
  h1,
  h2,
  h3 {
    width: 65%;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    margin-left: 10px;
  }
  h1 {
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    margin-top: 24px;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    margin-bottom: 13px;
  }
  h3 {
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
  }
`;
