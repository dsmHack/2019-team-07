import React from 'react';

import styles from './hex-grid.module.css';
import HexItem from './hex-item';

class HexGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  render() {
    return (
      <div className={styles.hexContainer}>
        <ul className={styles.hexGrid}>
          {this.state.data.map((item, index) => (
            <HexItem item={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default HexGrid;
