import { useEffect, useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ModalAdditionalInfo from './Modal';

export interface ResultsProps {
  results: string[];
}

const OrchestrasTab: React.FC<ResultsProps> = ({ results }): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedArtist, setSelectedArtist] = useState('');

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
              <Button
                size="small"
                onClick={() => {
                  handleOpen();
                  setSelectedArtist(result);
                }}
                value={result}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        );
      })}
      <ModalAdditionalInfo
        open={open}
        handleClose={handleClose}
        selectedArtist={selectedArtist}
      />
    </div>
  );
};

export default OrchestrasTab;
