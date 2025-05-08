// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopicGrid } from './components/TopicSelector';
import FlowDiagram from './FlowDiagram';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main topic selection page */}
        <Route path="/" element={<TopicGrid />} />

        {/* Dynamic route for each topic's flow diagram */}
        <Route path="/flow/:topicId" element={<FlowDiagram />} />
      </Routes>
    </Router>
  );
}
