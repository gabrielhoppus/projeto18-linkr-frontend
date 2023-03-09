import React from "react";
import styled from "styled-components";
import close from "../assets/images/closeIcon.svg";

export default function DeleteModal({ modalvisible, setModalvisible }) {
  function deletePost() {}
  return (
    <>
      <Modal>
        <Closebtn onClick={() => setModalvisible(!modalvisible)}>
          {/* <img src={close} alt="close" /> */}
          <ion-icon name="close-circle-outline"></ion-icon>
        </Closebtn>
        <ModalContainer>
          <h1>Tem certeza que deseja Excluir o post?</h1>
          <div>
            <Modalbtn
              color={"#CECECE"}
              onClick={() => setModalvisible(!modalvisible)}
            >
              Não
            </Modalbtn>

            <Modalbtn color={"crimson"} onClick={deletePost}>
              Excluir
            </Modalbtn>
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
}

const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 40%;
  width: 400px;
  height: auto;
  background-color: #333333;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Lato";
  h1 {
    margin-top: 20px;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: white;
    text-align: center;
    padding-left: 3px;
  }
`;
const Modalbtn = styled.button`
  width: 90px;
  height: 50px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  color: white;
  margin: 17px;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 16px;
  font-family: "Lato";
`;

const Closebtn = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  cursor: pointer;
  ion-icon {
    font-size: 30px;
    color: #333333;
  }
`;
