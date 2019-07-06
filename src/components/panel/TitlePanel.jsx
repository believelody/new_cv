import React, { useState, useRef, useEffect} from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices'

const TitlePanelStyle = styled.h3`
    cursor: pointer;
    text-align: center;
    border-left: 4px solid rgba(0, 0, 0, .8);
    border-right: 4px solid rgba(0, 0, 0, .8);
    margin: 0;
    padding: 0 5px;
    height: 30px;
    left: ${props => props.index === -1 ? props.normalX/2 : props.expandX/2}px;
    top: ${props => props.index === -1 ? props.y/2 : 10}px;
    transform: translate(-50%, ${props => props.index === -1 ? -50 : 0}%);
    transition: top ${props => props.transitionDuration}ms ${props => props.index === -1 ? 300 : 0}ms ease, left ${props => props.transitionDuration}ms ease;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, .7);
    position: absolute;
    display: inline;

    & > i {
        margin-right: 20px;
    }
`

const TitlePanel = ({ handleClick, icon, title, index, parentWidth, itemWidth, itemHeight, transitionDuration }) => {
    const iconRef = useRef()
    const textRef = useRef()
    
    return (
        <TitlePanelStyle 
            onClick={handleClick}
            index={index}
            normalX={+itemWidth}
            expandX={+parentWidth}
            y={+itemHeight}
            transitionDuration={transitionDuration}
        >
            <i ref={iconRef} className={`fas fa-${icon}`}></i>
            <span ref={textRef}>{title}</span>
        </TitlePanelStyle>
  )
}

export default TitlePanel