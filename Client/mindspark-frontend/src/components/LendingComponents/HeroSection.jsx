import React from 'react';
import image from '../../assets/Hero.jpg'; // Ensure this path is correct
import style from './Hero.module.css';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return (
    <div className={style.heroContainer}>
      <div className={style.imageContainer}>
        <img className={style.heroImage} src={image} alt="MindSpark" />
      </div>
      <div className={style.textContainer}>
        <p className={style.heroText}>
          MindSpark is your go-to app for enhancing your learning experience.
          Join us today to unlock your potential with engaging content, quizzes, and a supportive community.
        </p>
        <Link to="/register"> 
        <button className={style.heroButton}>Join Now</button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
