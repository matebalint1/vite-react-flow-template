import { Link } from 'react-router-dom';

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export function TopicCard({ id, title, description, image }: TopicCardProps) {
  return (
    <Link to={`/flow/${id}`} className="topic-card">
      {image && <img src={image} alt={title} />}
      <div className="topic-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export function TopicGrid() {
  const topics = [
    {
      id: 'sdv',
      title: 'Software-Defined Vehicle',
      description: 'SDV learning path',
    //   image: '/web-dev.png',
    },
    {
      id: 'open-source',
      title: 'Open-Source Software',
      description: 'OSS learning path',
    //   image: '/ai-ml.png',
    },
    // Add more topics
  ];

  return (
    <div className="topic-grid">
      <h1>Choose Your Learning Path</h1>
      <div className="grid-container">
        {topics.map((topic) => (
          <TopicCard key={topic.id} {...topic} />
        ))}
      </div>
    </div>
  );
}
