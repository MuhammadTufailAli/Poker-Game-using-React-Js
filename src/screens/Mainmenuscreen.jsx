import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import '../Css/Mainmenuscreen.css';
function Mainmenuscreen() {
  const navigate = useNavigate();

  const [languageSelected, setLanguageSelected] = useState(0);
  const [gameSound, setGameSound] = useState('ON');
  const [gameMusic, setGameMusic] = useState('ON');
  const [vibration, setVibration] = useState('OFF');
  const [settingModal, setsettingModal] = useState(false);

  const languageArray = [
    { language: 'ENGLISH' },
    { language: 'PORTUGUESE' },
    { language: 'DEUTSCH' },
    { language: 'ITALIANO' },
    { language: 'ESPANOL' },
  ];

  const soundArray = [
    { language: 'GAME SOUND' },
    { language: 'GAME MUSIC' },
    { language: 'VIBRATION' },
  ];
  return (
    <div className='main-menu-top-div'>
      {settingModal && (
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
                  setsettingModal(false);
                }}
              />

              <p className='menu-text'>SETTINGS</p>
            </div>
            {/* top Div */}
            <div>
              <div className='Language-background-image'>
                <p className='Language-background-image-text'>LANGUAGE</p>
              </div>

              <div className='grid-container'>
                {languageArray.map((language, index) => (
                  <div key={index} className='grid-item'>
                    <p className='grid-item-language'>{language?.language}</p>
                    <div
                      className='dot-background-image'
                      onClick={() => {
                        setLanguageSelected(index);
                      }}
                    >
                      {languageSelected === index && (
                        <img
                          className='tick-image'
                          src='./assets/tick.png'
                          alt='backbutton'
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* bottom div */}
            <div>
              <div className='Language-background-image'>
                <p className='Language-background-image-text'>SOUND</p>
              </div>

              <div className='grid-container'>
                <div className='grid-item grid-item-sound'>
                  <p className='grid-item-language'>GAME SOUND</p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        gameSound === 'ON' ? 'flex-start' : 'flex-end',
                    }}
                    className='button-background-image'
                    onClick={() => {
                      if (gameSound === 'ON') {
                        setGameSound('OFF');
                      } else {
                        setGameSound('ON');
                      }
                    }}
                  >
                    <div
                      className={gameSound === 'ON' ? 'on-image' : 'off-image'}
                    >
                      <p className='on-text'>{gameSound}</p>
                    </div>
                  </div>
                </div>

                <div className='grid-item grid-item-sound'>
                  <p className='grid-item-language'>GAME MUSIC</p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        gameMusic === 'ON' ? 'flex-start' : 'flex-end',
                    }}
                    className='button-background-image'
                    onClick={() => {
                      if (gameMusic === 'ON') {
                        setGameMusic('OFF');
                      } else {
                        setGameMusic('ON');
                      }
                    }}
                  >
                    <div
                      className={gameMusic === 'ON' ? 'on-image' : 'off-image'}
                    >
                      <p className='on-text'>{gameMusic}</p>
                    </div>
                  </div>
                </div>

                <div className='grid-item grid-item-sound'>
                  <p className='grid-item-language'>VIBRATION</p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        vibration === 'ON' ? 'flex-start' : 'flex-end',
                    }}
                    className='button-background-image'
                    onClick={() => {
                      if (vibration === 'ON') {
                        setVibration('OFF');
                      } else {
                        setVibration('ON');
                      }
                    }}
                  >
                    <div
                      className={vibration === 'ON' ? 'on-image' : 'off-image'}
                    >
                      <p className='on-text'>{vibration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className='grid-container'>
              {soundArray.map((language, index) => (
                <div key={index} className='grid-item grid-item-sound'>
                  <p className='grid-item-language'>{language?.language}</p>
                  <div
                    className='button-background-image'
                    onClick={() => {
                      setLanguageSelected(index);
                    }}
                  >
                    <div className='on-image'>
                      <p className='on-text'>ON</p>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
            </div>

            {/* <div className='exit-modal-three-options'>
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
          </div> */}
          </div>
        </div>
      )}

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
            <img className='plus-button' src='./assets/plusbutton.png' alt='' />
          </div>

          <div className='shield-and-bar-parent-with-text'>
            <img
              style={{ marginTop: '-3px' }}
              className='shield-button'
              src='./assets/shield.png'
              alt=''
            />
            <div className='bar-parent'>
              <img className='bar-button' src='./assets/main.png' alt='' />
            </div>
            <p className='bar-parent-text-amature'>AMATEUR</p>
          </div>
        </div>
        {/* right */}
        <div className='main-menu-top-bar-right'>
          <div>
            <img
              onClick={() => {
                setsettingModal(true);
              }}
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
