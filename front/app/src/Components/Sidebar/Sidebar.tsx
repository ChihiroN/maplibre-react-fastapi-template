import React,{useState} from 'react';
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import {
  BiHomeAlt,
  BiMedal,
  BiColor,
  BiMailSend
} from "react-icons/bi";
import ModalWindow from "../Modal/Modal"

type SidemenuProps = {
  pageWrapId: string;
  outerContainerId: string;
};

export const Sidebar = ({ pageWrapId, outerContainerId }: SidemenuProps) => {
  //control home button
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    console.log("Close side menu.")
  };
  const handleStateChange = (state:any) => {
    setIsMenuOpen(state.isOpen);
  };

  //control processor modal windown
  const [isModalWindowShown, setIsModalWindowShown] = useState(false)
  
  const closeModalHandler = () => {
    setIsModalWindowShown(false)
  }
  return (
    <Menu isOpen={isMenuOpen} onStateChange={handleStateChange}>
      <p className="memu-title">Menu</p>
      <a className="menu-item" onClick = {()=>handleCloseMenu()}>
        <BiHomeAlt />
        Home
      </a>
      <a className="menu-item" onClick={() => setIsModalWindowShown(true)}>
        <BiColor />
        Processor
        <ModalWindow isShown={isModalWindowShown} title={'Modal Window'} closeModal={closeModalHandler}>
          <div className='h-[2000px]'>
            ModalWindow
          </div>
        </ModalWindow>
      </a>
      <a className="menu-item" href="/result">
        <BiMedal />
        Result
      </a>
      <a className="menu-item" href="/contact">
        <BiMailSend />
        Contuct
      </a>
      {/* <a className="menu-item logout" href="/logout">
        <BiLogOutCircle />
        Log out
      </a> */}
    </Menu>
  );
};