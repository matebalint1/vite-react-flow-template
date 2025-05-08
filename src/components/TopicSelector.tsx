// components/TopicSelector.tsx
import { useNavigate } from 'react-router-dom';
import './TopicSelector.css';

const topics = [
  { id: 'sdv', title: 'SDV' },
  { id: 'open-source', title: 'Open-Source' },
  { id: 'ota', title: 'OTA Updates' },
  { id: 'sys-eng', title: 'System Engineer' },
  { id: 'dummy1', title: 'Placeholder1' },
  { id: 'dummy2', title: 'Placeholder2' },
  { id: 'dummy3', title: 'Placeholder3' },
  { id: 'dummy4', title: 'Placeholder4' },
  { id: 'dummy5', title: 'Placeholder5' },
  { id: 'dummy6', title: 'Placeholder6' },
  // Add more topics here as needed
];

export function TopicGrid() {
  const navigate = useNavigate();

  return (
    <div className="topic-grid">
      {topics.map(({ id, title }) => (
        <div
          key={id}
          className="topic-card"
          onClick={() => navigate(`/flow/${id}`)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate(`/flow/${id}`);
            }
          }}
        >
          <h3>{title}</h3>
        </div>
      ))}
    </div>
  );
}
