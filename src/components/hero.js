import Img from 'gatsby-image';
import React from 'react';

import styles from './hero.module.css';

export default ({ data }) => (
  <div className={styles.hero}>
    <div className={styles.heroSecondarySection} />
    <div className={styles.heroMainSection}>
      <Img
        className={styles.heroImage}
        alt={data.name}
        sizes={data.heroImage.sizes}
      />
      <div className={styles.heroDetails}>
        <h3 className={styles.heroHeadline}>{data.name}</h3>
        <p className={styles.heroTitle}>{data.title}</p>
      </div>
    </div>
    <div className={styles.heroSecondarySection} />
  </div>
);
