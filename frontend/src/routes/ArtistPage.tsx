import { useParams } from 'react-router-dom';

const ArtistPage: React.FC = (): JSX.Element => {
  const { artistId } = useParams();
  return (
    <div>
      <p>artist info</p>
    </div>
  );
};

export default ArtistPage;
