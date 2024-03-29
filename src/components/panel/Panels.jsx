import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import devices from '../../utils/devices'
import panels from '../../utils/panels'
import Panel from './Panel';

const PanelsStyle = styled.div`
    width: 700px;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 5px;
    position: relative;
    justify-content: center;
    padding: 0;
    margin: 0;
    z-index: 2;

    @media ${devices['mobileL']} {
        width: 98%;
        height: 80%;
        margin: 10% 1%;
    }

    @media ${devices['desktop']} {
        width: 60%;
    }
`

const Panels = () => {
    const appRef = useRef()


    const [currentIndex, setIndex] = useState(-1)
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const [x, setX] = useState()
    const [y, setY] = useState()

    useEffect(() => {
        if (appRef) {
            setWidth(appRef.current.getBoundingClientRect().width)
            setHeight(appRef.current.getBoundingClientRect().height)
            setX(appRef.current.getBoundingClientRect().x)
            setY(appRef.current.getBoundingClientRect().y)
        }
    }, [appRef])

    return (
        <PanelsStyle ref={appRef}>
            {
                panels.map((panel, i) => (
                    <Panel
                        key={i}
                        index={i}
                        parentWidth={width}
                        parentHeight={height}
                        panel={panel}
                        currentIndex={currentIndex}
                        setIndex={setIndex}
                    />
                ))
            }
        </PanelsStyle>
    )
}

export default Panels
