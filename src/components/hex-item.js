import React from 'react';

import styles from './hex-item.module.css';

class HexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      flipped: Math.random() > 0.75,
      color: Math.random(),
      transitionDelay: Math.round(Math.random() * 4 + 2)
    };
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    //   this.setState(state => {
    //     return { flipped: !state.flipped };
    //   });
    // }, Math.random() * 5000 + 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getColor() {
    if(this.state.color < 0.2) {
        return "";
    } else if (this.state.color < 0.6) {
        return styles.blue;
    } else {
        return styles.lightBlue;
    }
  }

  render() {
    return (
      <li
        className={`${styles.flipContainer} ${
          this.state.flipped ? styles.flip : ""
        }`}
        key={this.state.item.contentful_id}
      >
        <div className={`${styles.hex} ${styles['delay' + this.state.transitionDelay]}`}>
          <div className={styles.hexIn + " " + styles.hexFront}>
            <div className={styles.hexLink}>
              <img
                alt={this.state.item.title}
                src={this.state.item.fixed.src}
              />
            </div>
          </div>
          <div className={`${styles.hexIn} ${styles.hexBack} ${this.getColor()}`}>
            <div className={styles.hexLink}>
              &nbsp;
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default HexItem;
