import React from 'react';

import styles from './hex-grid.module.css';

export default ({ data }) => (
  <div className={styles.hexContainer}>
    <ul className={styles.hexGrid}>
      {data.map((item, index) => (
        <li className={styles.flipContainer} key={item.contentful_id}>
          <div className={styles.hex}>
            <div className={styles.hexIn + " " + styles.hexFront}>
              <div className={styles.hexLink}>
                <img alt={item.title} src={item.fixed.src} />
              </div>
            </div>
            <div className={styles.hexIn + " " + styles.hexBack}>
              <div className={styles.hexLink}>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
