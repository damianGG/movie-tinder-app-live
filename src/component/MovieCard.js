import React,{ useState, useMemo, useRef } from "react";
import TinderCard from 'react-tinder-card'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';


import './moviecard.css'



function MovieCard() {

    const [movies,setMovies] = useState([
        {
            id: '1and3011',
            imageURL: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
            title: 'Avengers Endgame',
            summary: 'Lorem ipsum….',
            rating: 5.3
            },
            {
            id: '2301abc',
            imageURL:'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg',
            title: 'Star Wars: Episode VII - The Force Awakens',
            summary: 'Lorem ipsum….',
            rating: 8.2
            },
            {
            id: '1andz011',
            imageURL: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
            title: 'Avengers Endgame',
            summary: 'Lorem ipsum….',
            rating: 5.3
            }
        ]
    )
    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
      }

  const [currentIndex, setCurrentIndex] = useState(movies.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(movies.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    console.log(direction)
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < movies.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  const onCardLeftScreen = () => {
    console.log( 'Card left the screen')
  }

    return (
        <div className="cards-conteiner">
            {movies.map((movie,index) =>(
                <TinderCard 
                    key={movie.id} className="movie-card"
                    ref={childRefs[index]}
                    onSwipe={(dir) => swiped(dir, movies.id, index)}
                    onCardLeftScreen={() => onCardLeftScreen()}
                >
                <Card sx={{ maxWidth: 455 }}>
                    <CardHeader         
                        title={movie.title}
                        subheader={`${movie.rating}/10`}
                        sx={{height:100 }}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={`${movie.imageURL}`}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {movie.summary}
                        </Typography>
                    </CardContent>
                        <IconButton onClick={() => swipe('right')}>
                            <CheckIcon fontSize="large"/>
                        </IconButton>
                        <IconButton onClick={() => swipe('left')}>
                            <ClearIcon  fontSize="large"/>
                        </IconButton>                      
                    </Card>
                 </TinderCard>
                 ))};
        </div>
    )
    
}

export default MovieCard;