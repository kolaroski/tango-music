import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 2,
  p: 4,
  height: 500,
};

export interface ModalProps {
  open: boolean;
  handleClose: () => void;
  selectedArtist: string;
}

const ModalAdditionalInfo: React.FC<ModalProps> = ({
  open,
  handleClose,
  selectedArtist,
}): JSX.Element => {
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
    if (selectedArtist !== '') {
      let isLoading = true;
      const getAdditionalInfo = async () => {
        try {
          console.log('making api call');
          const { data } = await axios.get(
            `http://localhost:8000/info/artist/${selectedArtist}`
          );
          isLoading ? setInfo(data) : null;
        } catch (err) {
          console.error(err);
        }
      };
      if (open) getAdditionalInfo();
      return () => (isLoading = false);
    }
  }, [selectedArtist, open]);

  return (
    <>
      {selectedArtist && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          BackdropProps={{
            sx: { backgroundColor: 'transparent' },
          }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              ARTIST: {selectedArtist}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Category: {info.category}
            </Typography>
            <div style={{ fontSize: '18px' }}>
              <Typography variant="body2">
                Real name: {info.real_name}
              </Typography>
              <Typography variant="body2">Nickname: {info.nickname}</Typography>
              <Typography variant="body2">
                Place of birth: {info.place_of_birth}
              </Typography>
              <Typography variant="body2">Dates: {info.dates}</Typography>
              <Typography variant="body2">
                Biography:{' '}
                <a href={info.biography_link} target="blank">
                  {info.biography_link}
                </a>
              </Typography>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ModalAdditionalInfo;
