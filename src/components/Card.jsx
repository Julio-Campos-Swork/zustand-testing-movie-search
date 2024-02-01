import React from 'react';
import { Card, CardMedia, CardContent, Typography, Modal } from '@mui/material';
import { GOOGLE_API_KEY } from '../services/Constantes.js';
import { useState } from 'react';
export const MovieCard = ({ movie }) => {
  const [idVideo, setidVideo] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const searchYoutube = async (titulo) => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=5&q=${
      titulo + ' official trailer'
    }&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    setidVideo(
      `https://www.youtube.com/embed/${json.items[0].id.videoId}?autoplay=1`
    );
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);
  return (
    <>
      <div>
        <Card
          onClick={() => searchYoutube(movie.title)}
          sx={{
            maxWidth: 345,
            height: 200,
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
            }}
            className="imagenCard"
          ></CardContent>
        </Card>
        <Typography variant="body2" component="h2">
          {movie.title}
        </Typography>
        <Typography variant="body3" color="textWhite" component="p">
          {movie.release_date.substring(0, 4)}
        </Typography>
      </div>
      <Modal open={openModal} onClose={handleClose}>
        <iframe
          width="560"
          height="315"
          src={idVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Modal>
    </>
  );
};
