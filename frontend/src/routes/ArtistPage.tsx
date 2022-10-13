import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArtistPage: React.FC = (): JSX.Element => {
  const { artistId } = useParams();

  //////////////////////////////////////
  // repetitive code from modal TODO: EXTRACT IN SEPARATE CONTROLLER COMPONENT:
  // state for additional info for artist
  const [info, setInfo] = useState({
    real_name: '',
    nickname: '',
    category: '',
    dates: '',
    place_of_birth: '',
    biography_link: '',
  });

  // API call for additional info for artist
  useEffect((): void | (() => void | undefined) => {
    let isLoading = true;
    const getAdditionalInfo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/info/artist/${artistId}`
        );
        isLoading ? setInfo(data) : null;
      } catch (err) {
        console.error(err);
      }
    };
    getAdditionalInfo();
    return () => (isLoading = false);
  }, [artistId]);
  ////////////////////////////////

  return (
    <div>
      <h1>INFO ABOUT ARTIST WITH ID: {artistId}</h1>
      <p style={{ fontSize: '18px' }}>
        {info.real_name},{<br />}
        {info.nickname}, {<br />}
        {info.category}, {<br />}
        {info.place_of_birth}, {info.dates}
        <br />
        <a href={info.biography_link} target="blank">
          {info.biography_link}
        </a>
      </p>
    </div>
  );
};

export default ArtistPage;
