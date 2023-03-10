import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { AuthContext } from "../contexts/auth.context";

export function Header() {
    const { picture, setToken } = useContext(AuthContext);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    async function search(e) {
        e.preventDefault();
    }
    function logout() {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <>
            <StyledHeader>
                <Link to='/timeline'>linkr</Link>
                <form onSubmit={search}>
                    <input type="text" placeholder="Search for People"></input>
                    <button type="submit">
                        <ion-icon name="search-outline"></ion-icon>
                    </button>
                </form>
                <span onClick={() => setShowLogout(!showLogout)}>
                    <ion-icon name=
                        {showLogout ? 'chevron-up' : 'chevron-down'} />
                    <img
                        data-test="avatar"
                        src={picture}
                        alt="user"></img>
                </span>
            </StyledHeader>
            <Logout
                data-test="menu"
                showLogout={showLogout}
                onClick={logout}>Logout</Logout>
        </>
    )
}

const StyledHeader = styled.header`
    z-index: 1;
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
  a {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    color: #ffffff;
    text-decoration: none;
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
`

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
    :hover{
        cursor: pointer;
    }
`;