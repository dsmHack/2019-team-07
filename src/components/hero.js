import Img from 'gatsby-image';
import React from 'react';

import styles from './hero.module.css';

export default ({ data }) => (
  <div className={styles.hero}>
    <ul className={styles.heroSecondarySection + " " + styles.hexGrid}>
      {Array.apply(0, Array(25)).map((x, i) => {
        return (
          <li className={styles.hex}>
            <div className={styles.hexIn}>
              <a className={styles.hexLink} href="#">
                <img
                  src="https://farm9.staticflickr.com/8461/8048823381_0fbc2d8efb.jpg"
                  alt=""
                />
              </a>
            </div>
          </li>
        );
      })}
    </ul>
    <div className={styles.heroMainSection}>
      <Img
        className={styles.heroImage}
        alt={data.name}
        sizes={data.heroImage.sizes}
      />
    </div>
    <ul className={styles.heroSecondarySection + " " + styles.hexGrid}>
      {Array.apply(0, Array(25)).map((x, i) => {
        return (
          <li className={styles.hex}>
            <div className={styles.hexIn}>
              <a className={styles.hexLink} href="#">
                <img
                  src="https://farm9.staticflickr.com/8461/8048823381_0fbc2d8efb.jpg"
                  alt=""
                />
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);
