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
      <div className={styles.heroSecondarySection}>
        <HexGrid data={secondaryImagesFirst} />
      </div>
      <div className={styles.heroPrimarySection}>
        <Img
          className={styles.heroImage}
          alt={data.name}
          fluid={data.heroImage.fluid}
        />
      </div>
      <div className={styles.heroSecondarySection}>
        <HexGrid data={secondaryImagesSecond} />
      </div>
    </div>
  );
};
