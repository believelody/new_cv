import React, { useState, useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import devices from '../../utils/devices';

let bdayArray = ['birthday-cake', 'atom', 'baby', 'baby-carriage', 'child', 'skating', 'school', 'user-graduate', 'walking', 'laptop-code', 'hat-wizard', 'blind', 'bed', 'jedi']

const moveCarKeyframe = keyframes`
    {
        0% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(${window.screen.width > 1440 ? 100 : 500}px);
        }

        50% {
            transform:  rotateY(180deg);
        }

        75% {
            transform: translateX(-${window.screen.width > 1440 ? 100 : 500}px);
        }

        90% {
            transform:  rotateY(0);
        }

        100% {
            transform: translateX(0);
        }
    }
`

const stopCarKeyframe = keyframes`
    {
        to {
            transform: translateX(0);
        }
    }
`

const ListItemStyle = styled.ul`
    padding: 0;
    display: block;
    width: 100%;
    margin-top: 20px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, .2);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .4);
    // background-color: white;

    a { 
        text-decoration: none;
        color: black;
    }

    @media ${devices.mobileL} { 
        .content {font-size: .8em; }
    }

    .item {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .icon {
        width: 50px;
        height: 50px;
        border-right: 1px solid black;
        text-align: center;
        line-height: 50px;
        position: relative;
        cursor: pointer;
    }

    .user-text {
        font-size: .8em;
        background-image: linear-gradient(to right, #1E9600, #FFF200, #FF0000);
    }

    .content {
        margin-left: 5px;
    }

    #user, #birthday {
        overflow: hidden;
        width: 50px;
    }

    #user > div {  
        transform: translateY(-50px);
    }

    #birthday {
        display: flex;
        & > div {
            transform: translateX(${props => props.iconBdayIndex === 0 ? 0 : -50 * props.iconBdayIndex}px);
            display: flex;
            align-items: center;
            width: auto;

            & > i {
                width: 50px;
            }
        }
    }

    svg {
        position: absolute;
        top: -170px;
        left: -150px;
        transform: scale(.25);
    }

    #car {
        overflow: hidden;
        position: relative;
    }

    #icon-car {
        animation: ${props => props.keyframe} ${props => props.animationCarDuration}ms ease infinite;
    }

    @media ${devices.desktop} { 
        .item {
            padding: 50px 0px;
            font-size: 1.5em;
        }

        .icon {
            width: 100px;
            height: 100px;
            line-height: 100px;
        }
        
        #user, #birthday {
            width: 100px;
        }

        #user > div {  
            transform: translateY(-100px);
        }

        #birthday > div {
            transform: translateX(${props => props.iconBdayIndex === 0 ? 0 : -100 * props.iconBdayIndex}px);

            & > i {
                width: 100px;
            }
        }
    }
`

const AboutList = () => {
    let transitionDuration = 2000
    let animationDuration = 5000
    let iconDuration = 900

    const userContentRef = useRef()
    const iconBdayRef = useRef()
    const homeRef = useRef()

    const [isUserAnimate, setUserAnimate] = useState(false)
    const [iconBdayIndex, setIconBdayIndex] = useState(0)
    const [isHomeSvgAnimate, setHomeSvgAnimate] = useState(false)
    const [isCarMoving, setCarMoving] = useState(false)
    const [keyframe, setKeyframe] = useState(stopCarKeyframe)

    const animateUser = isUserAnimate => {
        if (userContentRef) {
            userContentRef.current.style.transition = `transform ${iconDuration}ms`
            userContentRef.current.style.transform = `translateY(${isUserAnimate ? 0 : (window.screen.width < 2400 ? -50 : -100)}px)`
        }
    }

    const animateBdayIcon = index => {
        iconBdayRef.current.style.transition = `transform ${iconDuration}ms`
        // iconBdayRef.current.style.transform = `translateX(${index === 0 ? 0 : -50 * index}px)`
    }

    const animateSvg = isHomeSvgAnimate => {
        homeRef.current.style.opacity = isHomeSvgAnimate ? 1 : 0
    }

    const moveCar = isCarMoving => {
        // iconCarRef.current.style.animation = `${isCarMoving ? moveCar : stopCar} ${animationDuration}ms ease-in-out infinite`
        setKeyframe(isCarMoving ? moveCarKeyframe : stopCarKeyframe)
    }

    const toogle = {
        userAnimate: () => {
            setUserAnimate(!isUserAnimate)
        },
        bdayAnimate: () => {
            if (iconBdayIndex === bdayArray.length - 1)
                setIconBdayIndex(0)
            else
                setIconBdayIndex(prevIndex => prevIndex + 1)
        },
        svgDisplay: () => {
            setHomeSvgAnimate(!isHomeSvgAnimate)
        },
        carMoving: () => {
            setCarMoving(!isCarMoving)
        }
    }

    useEffect(() => animateUser(isUserAnimate), [isUserAnimate])

    useEffect(() => animateBdayIcon(iconBdayIndex), [iconBdayIndex])

    useEffect(() => animateSvg(isHomeSvgAnimate), [isHomeSvgAnimate])

    useEffect(() => moveCar(isCarMoving), [isCarMoving])

    return (
        <ListItemStyle 
            iconBdayIndex={iconBdayIndex} 
            keyframe={keyframe} 
            animationCarDuration={animationDuration}
        >
            <li className='item'>
                <span id='user' onClick={toogle.userAnimate} className='icon'>
                    <div ref={userContentRef}>
                        <span className='user-text'>KITOKO</span>
                        <i id='icon-user' className='fas fa-user'></i>
                    </div>
                </span>
                <span className='content'>
                    Believe LODY
                </span>
            </li>
            <li className='item'>
                <a className='icon' href='mailto:believelody@gmail.com'>
                    <i className='fas fa-at'></i>
                </a>
                <span className='content'>believelody@gmail.com</span>
            </li>
            <li className='item'>
                <span id='birthday' onClick={toogle.bdayAnimate} className='icon'>
                    <div ref={iconBdayRef}>
                        {
                            bdayArray.map(elt => <i key={elt} className={`fas fa-${elt}`}></i>)
                        }
                    </div>
                </span>
                <span className='content'>06/04/1992 in Pointe Noire (Rep. of Congo)</span>
            </li>
            <li className='item'>
                <span onClick={toogle.svgDisplay} className='icon'>
                    <i className='fas fa-home'></i>
                    <svg ref={homeRef} width="500" height="300">
                        <g fill="none" stroke="none" strokeWidth="2" className='svg__path'>
                            <path id='motionPath' d='M 0 300 Q 250 250 50 120 Q 0 0 300 0' />
                        </g>
                        <g fill="none" stroke="black" strokeWidth="6" className='svg__text'>
                            <path id='motionPath' d='M 30 30 L 0 30 L 30 0 L 0 0 ' />
                            <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
                            <animateMotion dur="2s" repeatCount="indefinite">
                                <mpath xlinkHref="#motionPath" />
                            </animateMotion>
                        </g>
                        <g fill="none" stroke="black" strokeWidth="6" className='svg__text'>
                            <path id='motionPath' d='M 30 30 L 0 30 L 30 0 L 0 0 ' />
                            <animate attributeName="opacity" begin="1s" from="1" to="0" dur="2s" repeatCount="indefinite" />
                            <animateMotion begin="1s" dur="2s" repeatCount="indefinite">
                                <mpath xlinkHref="#motionPath" />
                            </animateMotion>
                        </g>
                    </svg>
                </span>
                <span className='content'>4 rue de la Mare Huguet 93110 Rosny-sous-Bois</span>
            </li>
            <li className='item'>
                <span id='car' onClick={toogle.carMoving} className='icon'>
                    <i id='icon-car' className='fas fa-car-side'></i>
                </span>
                <span className='content'>Permis B</span>
            </li>
        </ListItemStyle>
    )
}

export default AboutList
