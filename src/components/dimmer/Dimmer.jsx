import React from "react";
import styled from "styled-components";
import DimmerContent from "./DimmerContent";
import SidenoteContent from "../sidenotes/SidenoteContent";
import { usePanelValues } from "../../context/panelContext";

const ItemDimmer = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: ${props => (props.expand ? 1 : 0)};
  background-color: rgba(0, 0, 0, 0.9);
  transition: opacity ${props => props.expandDuration}ms ease,
    z-index ${props => props.expandDuration}ms ease;
  z-index: ${props => (props.expand ? 99 : -1)};
`;

const Dimmer = () => {
  const [{ expandDuration, expand }, _] = usePanelValues();

  return (
    <ItemDimmer expandDuration={expandDuration} expand={expand}>
      <DimmerContent />
      <SidenoteContent />
    </ItemDimmer>
  );
};

export default Dimmer;
