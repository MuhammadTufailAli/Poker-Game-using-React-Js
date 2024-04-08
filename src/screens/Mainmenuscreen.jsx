import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import '../Css/Mainmenuscreen.css';
function Mainmenuscreen() {
  const navigate = useNavigate();
  return (
    <div className='main-menu-top-div'>
      <div className='Exit-modal-div'>
        <div
          style={{
            width: '100%', // adjust width and height as needed
            height: '420px', // adjust width and height as needed
            backgroundImage: "url('/assets/exit_box.png')",
            backgroundSize: '100% 100%',
            maxHeight: '420px', // adjust background size as needed
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className='exit-top-bar'>
            <img
              className='exit-button rotateIt'
              src='./assets/back_button.png'
              alt='backbutton'
              onClick={() => {
                this.setState({ showExitModal: false });
              }}
            />

            <p className='menu-text'>SETTINGS</p>
          </div>

          <div className='exit-modal-three-options'>
            <div
              style={{
                width: '200px', // adjust width and height as needed
                height: '60px', // adjust width and height as needed
                backgroundImage: "url('/assets/main.png')",
                backgroundSize: '100% 100%',
                maxHeight: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                this.setState({ showExitModal: false });
                this.setState({ showExitMenu: true });
              }}
            >
              <p className='exit-lobby-text exit-common-text'>EXIT TO LOBBY</p>
            </div>
            <div
              style={{
                width: '200px', // adjust width and height as needed
                height: '60px', // adjust width and height as needed
                backgroundImage: "url('/assets/main.png')",
                backgroundSize: '100% 100%',
                maxHeight: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <p className='table-info-text exit-common-text'>TABLE INFO</p>
            </div>
            <div
              style={{
                width: '200px', // adjust width and height as needed
                height: '60px', // adjust width and height as needed
                backgroundImage: "url('/assets/main.png')",
                backgroundSize: '100% 100%',
                maxHeight: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <p className='friends-text exit-common-text'>FRIENDS</p>
            </div>
          </div>
        </div>
      </div>
      {/* top bar */}
      <div className='main-menu-top-bar'>
        {/* left */}
        <div className='main-menu-top-bar-left'>
          <div className='main-menu-top-bar-left-images'>
            <img
              style={{ width: 60, marginTop: 33 }}
              src='/assets/personicon.png'
              alt=''
            />
            <img style={{ width: 20 }} src='/assets/hand.png' alt='' />
          </div>
          <div className='main-menu-top-bar-left-text-parent'>
            <p className='main-menu-top-bar-left-text1'>GUEST1122</p>
            <p className='main-menu-top-bar-left-text2'>LVL.1</p>
            <img style={{ width: 119 }} src='/assets/guestbar.png' alt='' />
          </div>
        </div>
        {/* Center */}
        <div className='main-menu-top-bar-center'>
          <div className='shield-and-bar-parent'>
            <img
              style={{ marginTop: '-3px', width: 48 }}
              className='shield-button'
              src='./assets/pokericon.png'
              alt=''
            />
            <div className='bar-parent'>
              <p className='bar-parent-text'>100</p>
              <div className='bar-parent-get-chip'>
                <p className='bar-parent-get-chip-text'>GET CHIPS</p>
              </div>
            </div>
            <img className='bar-button' src='./assets/plusbutton.png' alt='' />
          </div>

          <div className='shield-and-bar-parent'>
            <img
              style={{ marginTop: '-3px' }}
              className='shield-button'
              src='./assets/shield.png'
              alt=''
            />
            <div className='bar-parent'>
              <img className='bar-button' src='./assets/main.png' alt='' />
            </div>
          </div>
        </div>
        {/* right */}
        <div className='main-menu-top-bar-right'>
          <div>
            <img
              className='exit-button'
              src='./assets/settingbutton.png'
              alt='backbutton'
            />
          </div>
        </div>
      </div>
      {/* Game play option */}
      <div className='game-play-top-div'>
        <div className='game-play-selection'>
          {/* online */}
          <div
            className='game-play-selection-online'
            onClick={() => {
              navigate('/gameplay');
            }}
          >
            <div className='game-play-selection-online-image'>
              <img
                className='game-play-selection-online-image-css'
                src='/assets/pokeronline.png'
                alt=''
              />
            </div>
            <div className='game-play-selection-online-image2'>
              <p className='game-play-selection-online-image2-text'>
                POKER <span style={{ color: 'yellow' }}>ONLINE</span>
              </p>
            </div>
          </div>
          {/* offline */}
          <div
            className='game-play-selection-online'
            onClick={() => {
              navigate('/gameplay');
            }}
          >
            <div className='game-play-selection-online-image offline-image'>
              <img
                className='game-play-selection-online-image-css'
                src='/assets/pokeroffline.png'
                alt=''
              />
            </div>
            <div className='game-play-selection-online-image2'>
              <p className='game-play-selection-online-image2-text'>
                POKER OFFLINE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainmenuscreen;
