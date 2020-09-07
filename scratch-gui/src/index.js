import GUI from './containers/gui.jsx';
import AppStateHOC from './lib/app-state-hoc.jsx';
import GuiReducer, {guiInitialState, guiMiddleware, initEmbedded, initFullScreen, initPlayer} from './reducers/gui';
import LocalesReducer, {localesInitialState, initLocale} from './reducers/locales';
import {ScratchPaintReducer} from 'scratch-paint';
import {setFullScreen, setPlayer} from './reducers/mode';
import {remixProject} from './reducers/project-state';
import {setAppElement} from 'react-modal';

const guiReducers = {
    locales: LocalesReducer,
    scratchGui: GuiReducer,
    scratchPaint: ScratchPaintReducer
};

export {
    GUI as default,
    AppStateHOC,
    setAppElement,
    guiReducers,
    guiInitialState,
    guiMiddleware,
    initEmbedded,
    initPlayer,
    initFullScreen,
    initLocale,
    localesInitialState,
    remixProject,
    setFullScreen,
    setPlayer
};

// In your index.js
const firestoreService = require('firestore-export-import');
const serviceAccount = require('./serviceAccountKey.json');

// Initiate Firebase App
// appName is optional, you can omit it.
const appName = '[DEFAULT]';
firestoreService.initializeApp(serviceAccount,  "https://ai-scratch-log.firebaseio.com", appName);

// Start exporting your data
firestoreService
  .backup('test')
  .then((data) => console.log(JSON.stringify(data)));