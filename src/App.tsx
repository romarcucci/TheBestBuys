// import React from 'react';

// // Components
// import Header from './components/Header';
// import ChatbotInterface from './components/chatbot/ChatbotInterface';
// import Footer from './components/Footer';

// // Assets
// import backgroundVideo from './assets/videos/background.mp4';

// // Styles
// import './App.scss';

// const App = () => {
//   return (
//     <div className="app">
//       <Header />
//       <video
//         className="background-video"
//         autoPlay
//         loop
//         muted
//         playsInline
//         src={backgroundVideo}
//       />
//       <div className="content">
//         <ChatbotInterface />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";

import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Header />
      </Router>
    </div>
  );
};

export default App;
