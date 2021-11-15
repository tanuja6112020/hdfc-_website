import './App.css';
import { QuestionProvider } from './Context/QuestionContext';
import Routes from './routes';
function App() {
  return (
    <QuestionProvider>
      <Routes/>
    </QuestionProvider>
  );
}

export default App;
