import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { usePanelValues } from "../../context/panelContext";
import { MINIMIZE, SET_COMPONENT } from "../../reducer/panelReducer";
import { arrowToRight } from "../../utils/arrowKeyframes";
import isMobile from "../../utils/isMobile";

const BtnStyle = styled.div`
  cursor: pointer;
  position: fixed;
  margin: 0;
  padding: 0;
  bottom: 5px;
  right: ${props => props.x}px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: white;
  transform: scale(${props => (props.isHold ? 1.3 : 1)});
  transition: transform ${props => props.duration}ms ease,
    right
      ${props =>
        props.x < props.threshold && props.isHold ? 0 : props.duration * 3}ms
      ease;
  z-index: 100;

  & > .wrapper {
    width: 200px;
    display: flex;
    position: absolute;
    justify-items: center;
    transform: translateX(
      ${props =>
        props.isHold ? 12.5 : props.x < props.threshold ? 37.5 : -25}%
    );
    transition: transform ${props => props.duration}ms ease;
    margin: 0;
    padding: 0;

    & > section {
      width: 100px;
      /* border: 1px solid green; */
      display: grid;
      grid-template-columns: repeat(2, 50%);

      & > span {
        text-align: center;
        /* border: 1px solid yellow; */
      }

      & .second {
        font-size: 12px;
      }

      & .second > i:nth-child(1) {
        animation: ${arrowToRight} 1000ms ${props => props.duration + 100}ms
          ease-in infinite;
      }

      & .second > i:nth-child(2) {
        animation: ${arrowToRight} 1000ms ${props => props.duration + 200}ms
          ease-in infinite;
      }

      & .second > i:nth-child(3) {
        animation: ${arrowToRight} 1000ms ${props => props.duration + 300}ms
          ease-in infinite;
      }
    }

    & > span {
      text-align: center;
      width: 100px;
      /* border: 1px solid blue; */
    }
  }
`;

const SidenoteBtn = () => {
  const X_POS = 10;
  const DURATION = 400;
  const THRESHOLD = window.screen.width / 4;

  const btnRef = useRef();

  const [isHold, setHold] = useState(false);
  const [btnX, setBtnX] = useState(X_POS);

  const [{ expand }, dispatch] = usePanelValues();

  const handleClose = () => dispatch({ type: MINIMIZE });

  const moveBtn = e => {
    let screenWidth = window.screen.width;
    let x = screenWidth - e.pageX;
    if (btnX < THRESHOLD && isHold) {
      setBtnX(x);
    } else if (isHold) {
      setBtnX(
        screenWidth / 2 - btnRef.current.getBoundingClientRect().width / 2
      );
      setHold(false);
      dispatch({ type: SET_COMPONENT, payload: "sidenote" });
    }
  };

  const resetMoveBtn = () => setBtnX(X_POS);

  const handleMouseDown = e => {
    if (btnX < THRESHOLD) setHold(true);
    moveBtn(e);
  };

  const handleMouseMove = e => isHold && moveBtn(e);

  const handleMouseUp = e => {
    if (btnX < THRESHOLD) {
      setHold(false);
      resetMoveBtn();
    } else moveBtn(e);
  };

  useEffect(() => {
    if (!expand) {
      setHold(false);
      resetMoveBtn();
    }
  }, [expand]);

  return (
    <BtnStyle
      ref={btnRef}
      isHold={isHold}
      x={btnX}
      duration={DURATION}
      threshold={THRESHOLD}
      onMouseDown={e => handleMouseDown(e)}
      onMouseMove={e => handleMouseMove(e)}
      onMouseUp={e => handleMouseUp(e)}
      onTouchStart={e => handleMouseDown(e)}
      onTouchMove={e => handleMouseMove(e)}
      onTouchEnd={e => handleMouseUp(e)}
      onClick={handleClose}
    >
      <div className="wrapper">
        <section>
          <span className="first">
            <i className="fas fa-comment-dots" />
          </span>
          <span className="second">
            <i className="fas fa-chevron-left" />
            <i className="fas fa-chevron-left" />
            <i className="fas fa-chevron-left" />
          </span>
        </section>
        <span className="close">
          <i className="fas fa-times" />
        </span>
      </div>
    </BtnStyle>
  );
};

export default SidenoteBtn;
