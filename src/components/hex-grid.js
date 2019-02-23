import React from 'react';

import styles from './hex-grid.module.css';

export default ({ data }) => (
  <div className={styles.hexContainer}>
    <ul className={styles.hexGrid}>
      {data.map((item, index) => (
        <li className={styles.hex} key={item.contentful_id}>
          <div className={styles.hexIn}>
            <div className={styles.hexLink}>
              <img alt={item.title} src={item.fixed.src} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
