import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
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
};

export interface ResultsProps {
  results: string[];
}

const OrchestrasTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="results__cards-container">
      {results.map(result => {
        return (
          <Card
            sx={{ minWidth: 300, margin: '10px' }}
            key={`${`${Math.random().toString()}-${result}`}`}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Orchestra
              </Typography>
              <Typography variant="body2">{result}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleOpen}>
                Learn More
              </Button>
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
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Additional info about the result
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default OrchestrasTab;
