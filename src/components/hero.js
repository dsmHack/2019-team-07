import Img from 'gatsby-image';
import React from 'react';

import styles from './hero.module.css';
import HexGrid from './hex-grid';

export default ({ data }) => {
  const secondaryImagesFirst = data.secondaryHeroImages.filter(
    (item, index) => {
      return index <= data.secondaryHeroImages.length / 2;
    }
  );
  const secondaryImagesSecond = data.secondaryHeroImages.filter(
    (item, index) => {
      return index > data.secondaryHeroImages.length / 2;
    }
  );

  return (
    <div className={styles.hero}>
      <HexGrid data={secondaryImagesFirst} />
      <div className={styles.heroMainSection}>
        <Img
          className={styles.heroImage}
          alt={data.name}
          fluid={data.heroImage.fluid}
        />
      </div>
      <HexGrid data={secondaryImagesSecond} />
    </div>
  );
};
