// import "@babel/polyfill";

// import 'core-js/es6/map';
// import 'core-js/es6/set';

import 'raf/polyfill';

import React, { Component } from 'react';
import './App.css';
import './Poker.css';

import Spinner from './Spinner';
import WinScreen from './WinScreen';

import Player from './components/players/Player';
import ShowdownPlayer from './components/players/ShowdownPlayer';
import Card from './components/cards/Card';

import {
  generateDeckOfCards,
  shuffle,
  dealPrivateCards,
} from './utils/cards.js';

import { generateTable, beginNextRound, checkWin } from './utils/players.js';

import {
  determineBlindIndices,
  anteUpBlinds,
  determineMinBet,
  handleBet,
  handleFold,
} from './utils/bet.js';

import { handleAI as handleAIUtil } from './utils/ai.js';

import {
  renderShowdownMessages,
  renderActionButtonText,
  renderNetPlayerEarnings,
  renderActionMenu,
} from './utils/ui.js';

import { cloneDeep } from 'lodash';

class App extends Component {
  state = {
    loading: true,
    winnerFound: null,
    players: null,
    numPlayersActive: null,
    numPlayersFolded: null,
    numPlayersAllIn: null,
    activePlayerIndex: null,
    dealerIndex: null,
    blindIndex: null,
    deck: null,
    communityCards: [],
    pot: null,
    highBet: null,
    betInputValue: null,
    sidePots: [],
    minBet: 20,
    phase: 'loading',
    showExitModal: false,
    showExitMenu: false,
    playerHierarchy: [],
    showDownMessages: [],
    playActionMessages: [],
    playerAnimationSwitchboard: {
      0: { isAnimating: false, content: null },
      1: { isAnimating: false, content: null },
      2: { isAnimating: false, content: null },
      3: { isAnimating: false, content: null },
      4: { isAnimating: false, content: null },
      5: { isAnimating: false, content: null },
    },
  };

  cardAnimationDelay = 0;

  loadTable = () => {};

  async componentDidMount() {
    const players = await generateTable();
    console.log('THE PLAYERSSSSSSSSSS', players);
    const dealerIndex = Math.floor(Math.random() * Math.floor(players.length));
    const blindIndicies = determineBlindIndices(dealerIndex, players.length);
    const playersBoughtIn = anteUpBlinds(
      players,
      blindIndicies,
      this.state.minBet
    );

    const imageLoaderRequest = new XMLHttpRequest();

    imageLoaderRequest.addEventListener('load', (e) => {
      console.log(`${e.type}`);
      console.log(e);
      console.log('Image Loaded!');
      this.setState({
        loading: false,
      });
    });

    imageLoaderRequest.addEventListener('error', (e) => {
      console.log(`${e.type}`);
      console.log(e);
    });

    imageLoaderRequest.addEventListener('loadstart', (e) => {
      console.log(`${e.type}`);
      console.log(e);
    });

    imageLoaderRequest.addEventListener('loadend', (e) => {
      console.log(`${e.type}`);
      console.log(e);
    });

    imageLoaderRequest.addEventListener('abort', (e) => {
      console.log(`${e.type}`);
      console.log(e);
    });

    imageLoaderRequest.addEventListener('progress', (e) => {
      console.log(`${e.type}`);
      console.log(e);
    });

    imageLoaderRequest.open('GET', './assets/table-nobg-svg-01.svg');
    imageLoaderRequest.send();
    this.setState((prevState) => ({
      // loading: false,
      players: playersBoughtIn,
      numPlayersActive: players.length,
      numPlayersFolded: 0,
      numPlayersAllIn: 0,
      activePlayerIndex: dealerIndex,
      dealerIndex,
      blindIndex: {
        big: blindIndicies.bigBlindIndex,
        small: blindIndicies.smallBlindIndex,
      },

      deck: shuffle(generateDeckOfCards()),
      pot: 0,
      highBet: prevState.minBet,
      betInputValue: prevState.minBet,
      phase: 'initialDeal',
    }));
    this.runGameLoop();
  }

  handleBetInputChange = (val, min, max) => {
    if (val === '') val = min;
    if (val > max) val = max;
    this.setState({
      betInputValue: parseInt(val, 10),
    });
  };

  changeSliderInput = (val) => {
    this.setState({
      betInputValue: val[0],
    });
  };

  pushAnimationState = (index, content) => {
    const newAnimationSwitchboard = Object.assign(
      {},
      this.state.playerAnimationSwitchboard,
      { [index]: { isAnimating: true, content } }
    );
    this.setState({ playerAnimationSwitchboard: newAnimationSwitchboard });
  };

  popAnimationState = (index) => {
    const persistContent = this.state.playerAnimationSwitchboard[index].content;
    const newAnimationSwitchboard = Object.assign(
      {},
      this.state.playerAnimationSwitchboard,
      { [index]: { isAnimating: false, content: persistContent } }
    );
    this.setState({ playerAnimationSwitchboard: newAnimationSwitchboard });
  };

  handleBetInputSubmit = (bet, min, max) => {
    const { playerAnimationSwitchboard, ...appState } = this.state;
    const { activePlayerIndex } = appState;
    this.pushAnimationState(
      activePlayerIndex,
      `${renderActionButtonText(
        this.state.highBet,
        this.state.betInputValue,
        this.state.players[this.state.activePlayerIndex]
      )} ${
        bet > this.state.players[this.state.activePlayerIndex].bet ? bet : ''
      }`
    );

    console.log('a na bet ki', appState);
    const newState = handleBet(
      cloneDeep(appState),
      parseInt(bet, 10),
      parseInt(min, 10),
      parseInt(max, 10)
    );
    this.setState(newState, () => {
      if (
        this.state.players[this.state.activePlayerIndex].robot &&
        this.state.phase !== 'showdown'
      ) {
        setTimeout(() => {
          this.handleAI();
        }, 1200);
      }
    });
  };

  handleFold = () => {
    const { playerAnimationSwitchboard, ...appState } = this.state;
    const newState = handleFold(cloneDeep(appState));
    this.setState(newState, () => {
      if (
        this.state.players[this.state.activePlayerIndex].robot &&
        this.state.phase !== 'showdown'
      ) {
        setTimeout(() => {
          this.handleAI();
        }, 1200);
      }
    });
  };

  handleAI = () => {
    const { playerAnimationSwitchboard, ...appState } = this.state;
    const newState = handleAIUtil(cloneDeep(appState), this.pushAnimationState);

    this.setState(
      {
        ...newState,
        betInputValue: newState.minBet,
      },
      () => {
        if (
          this.state.players[this.state.activePlayerIndex].robot &&
          this.state.phase !== 'showdown'
        ) {
          setTimeout(() => {
            this.handleAI();
          }, 1200);
        }
      }
    );
  };

  renderBoard = () => {
    const {
      players,
      activePlayerIndex,
      dealerIndex,
      clearCards,
      phase,
      playerAnimationSwitchboard,
    } = this.state;
    // Reverse Players Array for the sake of taking turns counter-clockwise.
    const reversedPlayers = players.reduce((result, player, index) => {
      const isActive = index === activePlayerIndex;
      const hasDealerChip = index === dealerIndex;

      result.unshift(
        <Player
          key={index}
          arrayIndex={index}
          isActive={isActive}
          hasDealerChip={hasDealerChip}
          player={player}
          clearCards={clearCards}
          phase={phase}
          playerAnimationSwitchboard={playerAnimationSwitchboard}
          endTransition={this.popAnimationState}
        />
      );
      return result;
    }, []);
    return reversedPlayers.map((component) => component);
  };

  renderCommunityCards = (purgeAnimation) => {
    return this.state.communityCards.map((card, index) => {
      let cardData = { ...card };
      if (purgeAnimation) {
        cardData.animationDelay = 0;
      }
      return <Card key={index} cardData={cardData} />;
    });
  };

  runGameLoop = () => {
    const newState = dealPrivateCards(cloneDeep(this.state));
    this.setState(newState, () => {
      if (
        this.state.players[this.state.activePlayerIndex].robot &&
        this.state.phase !== 'showdown'
      ) {
        setTimeout(() => {
          this.handleAI();
        }, 1200);
      }
    });
  };

  renderRankTie = (rankSnapshot) => {
    return rankSnapshot.map((player) => {
      return this.renderRankWinner(player);
    });
  };

  renderRankWinner = (player) => {
    const { name, bestHand, handRank } = player;
    const playerStateData = this.state.players.find(
      (statePlayer) => statePlayer.name === name
    );
    return (
      <div className='showdown-player--entity' key={name}>
        <ShowdownPlayer
          name={name}
          avatarURL={playerStateData.avatarURL}
          cards={playerStateData.cards}
          roundEndChips={playerStateData.roundEndChips}
          roundStartChips={playerStateData.roundStartChips}
        />
        <div className='showdown-player--besthand--container'>
          <h5 className='showdown-player--besthand--heading'>Best Hand</h5>
          <div
            className='showdown-player--besthand--cards'
            style={{ alignItems: 'center' }}
          >
            {bestHand.map((card, index) => {
              // Reset Animation Delay
              const cardData = { ...card, animationDelay: 0 };
              return <Card key={index} cardData={cardData} />;
            })}
          </div>
        </div>
        <div className='showdown--handrank'>{handRank}</div>
        {renderNetPlayerEarnings(
          playerStateData.roundEndChips,
          playerStateData.roundStartChips
        )}
      </div>
    );
  };

  renderBestHands = () => {
    const { playerHierarchy } = this.state;

    return playerHierarchy.map((rankSnapshot) => {
      const tie = Array.isArray(rankSnapshot);
      return tie
        ? this.renderRankTie(rankSnapshot)
        : this.renderRankWinner(rankSnapshot);
    });
  };

  handleNextRound = () => {
    this.setState({ clearCards: true });
    const newState = beginNextRound(cloneDeep(this.state));
    // Check win condition
    if (checkWin(newState.players)) {
      this.setState({ winnerFound: true });
      return;
    }
    this.setState(newState, () => {
      if (
        this.state.players[this.state.activePlayerIndex].robot &&
        this.state.phase !== 'showdown'
      ) {
        setTimeout(() => this.handleAI(), 1200);
      }
    });
  };

  renderActionButtons = () => {
    const { highBet, players, activePlayerIndex, phase, betInputValue } =
      this.state;
    const min = determineMinBet(
      highBet,
      players[activePlayerIndex].chips,
      players[activePlayerIndex].bet
    );
    const max =
      players[activePlayerIndex].chips + players[activePlayerIndex].bet;
    return players[activePlayerIndex].robot || phase === 'showdown' ? null : (
      <React.Fragment>
        <button
          className='action-button'
          onClick={() => this.handleBetInputSubmit(betInputValue, min, max)}
        >
          {renderActionButtonText(
            highBet,
            betInputValue,
            players[activePlayerIndex]
          )}
        </button>
        <button className='fold-button' onClick={() => this.handleFold()}>
          Fold
        </button>
      </React.Fragment>
    );
  };

  renderShowdown = () => {
    return (
      <div className='showdown-container--wrapper'>
        <h5 className='showdown-container--title'>Round Complete!</h5>
        <div className='showdown-container--messages'>
          {renderShowdownMessages(this.state.showDownMessages)}
        </div>
        <h5 className='showdown-container--community-card-label'>
          Community Cards
        </h5>
        <div className='showdown-container--community-cards'>
          {this.renderCommunityCards(true)}
        </div>
        <button
          className='showdown--nextRound--button'
          onClick={() => this.handleNextRound()}
        >
          {' '}
          Next Round{' '}
        </button>
        {this.renderBestHands()}
      </div>
    );
  };

  renderGame = () => {
    const { highBet, players, activePlayerIndex, phase } = this.state;
    return (
      <div className='poker-app--background'>
        {/* THis is exit modal */}

        {this.state.showExitModal && (
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

                <p className='menu-text'>MENU</p>
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
                  <p className='exit-lobby-text exit-common-text'>
                    EXIT TO LOBBY
                  </p>
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
        )}

        {this.state.showExitMenu && (
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
                <p className='menu-text menu-text-quit'>QUIT?</p>
              </div>

              <div className='exit-modal-three-options more-gap'>
                <div
                  style={{
                    width: '150px', // adjust width and height as needed
                    height: '60px', // adjust width and height as needed
                    backgroundImage: "url('/assets/yes.png')",
                    backgroundSize: '100% 100%',
                    maxHeight: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    alert('Coming soon');
                  }}
                >
                  <p className='yes-text exit-common-text'>YES</p>
                </div>
                <div
                  style={{
                    width: '150px', // adjust width and height as needed
                    height: '60px', // adjust width and height as needed
                    backgroundImage: "url('/assets/no.png')",
                    backgroundSize: '100% 100%',
                    maxHeight: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    this.setState({ showExitMenu: false });
                  }}
                >
                  <p className='yes-text exit-common-text'>NO</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className='poker-table--container'>
          {/* <img
            className='poker-table--table-image'
            src={'./assets/table-nobg-svg-01.svg'}
            alt='Poker Table'
          /> */}
          <img
            className='poker-table--table-image'
            src={'./assets/table.png'}
            alt='Poker Table'
          />
          {this.renderBoard()}
          <div className='community-card-container'>
            {this.renderCommunityCards()}
          </div>
          <div className='pot-container'>
            <img
              style={{ height: 55, width: 55 }}
              src={'./assets/pot.svg'}
              alt='Pot Value'
            />
            <h4> {`${this.state.pot}`} </h4>
          </div>
        </div>
        {this.state.phase === 'showdown' && this.renderShowdown()}

        {/* this top bar */}
        <div className='top-div-bar'>
          <div className='top-div-bar-left-side'>
            <div>
              <img
                className='exit-button'
                src='./assets/back_button.png'
                alt='backbutton'
                onClick={() => {
                  this.setState({ showExitModal: true });
                }}
              />
            </div>
            <div className='shield-and-bar-parent'>
              <img className='shield-button' src='./assets/shield.png' alt='' />
              <div className='bar-parent'>
                <img className='bar-button' src='./assets/main.png' alt='' />
                <p className='bar-text'>0/100k</p>
              </div>
            </div>
          </div>

          <div className='top-div-bar-right-side'></div>
        </div>
        <div className='game-action-bar'>
          <div className='action-buttons'>{this.renderActionButtons()}</div>
          <div className='slider-boi'>
            {!this.state.loading &&
              renderActionMenu(
                highBet,
                players,
                activePlayerIndex,
                phase,
                this.handleBetInputChange
              )}
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className='App'>
        <div className='poker-table--wrapper'>
          {this.state.loading ? (
            <Spinner />
          ) : this.state.winnerFound ? (
            <WinScreen />
          ) : (
            this.renderGame()
          )}
        </div>
      </div>
    );
  }
}

export default App;
