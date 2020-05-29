import React, { Component } from 'react';
import { TestComponent } from './test';
import styles from './styles.module.scss';

interface MoonBodyProps {
  title: string;
}

const MoonBody = (props: MoonBodyProps) => {
  const { title } = props;
  return <div>{title}</div>;
};

interface MoonProps {
  style: object;
  onClick: () => void;
  title: string;
  moonSize: number;
  moonColor: string
}

const Moon = (props: MoonProps) => {
  const { style, onClick, title, moonSize, moonColor } = props;
  return (
    <div onClick={onClick} className={styles.moonContainer}>
      <div className={styles.moon} style={{
        ...style,
        height: moonSize || 80,
        width: moonSize || 80,
        border: `solid 2px ${moonColor || 'grey'}`,
        color: moonColor || 'grey'
      }}>
        <MoonBody title={title} />
      </div>
    </div>
  );
};

interface OrbiterProps {
  radius: number;
  data: Array<{
    title: string,
    onClick: () => void,
  }>;
  image: string;
  moonSize: number;
  moonColor: string
}

interface OrbiterState {
  showMoons: boolean;
}

export default class Orbiter extends Component<OrbiterProps, OrbiterState> {
  state = {
    showMoons: false,
  };

  degreeToRad = (degree: number) => {
    return degree * (Math.PI / 180);
  };

  calculateCartesianCoords = (key: number) => {
    const { radius, data } = this.props;
    // We calculate the angle from the number of moons
    const theta = 360 / data.length + key * (360 / data.length);

    // We calculate the x and y cartesian coordinates (and convert to radians)
    const x = radius * Math.cos(this.degreeToRad(theta));
    const y = radius * Math.sin(this.degreeToRad(theta));

    return { x, y };
  };

  onCentralBodyClicked = () => {
    this.setState({
      showMoons: !this.state.showMoons,
    });
  };

  render() {
    const { image, data, moonSize, moonColor } = this.props;
    const { showMoons } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          className={styles.imageContainer}
          onClick={this.onCentralBodyClicked}
        >
          <img
            src={image}
            alt={'Not found'}
            className={styles.profilePicture}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className={styles.moonsContainer}>
          {showMoons &&
            data.map((m, key) => {
              const { x, y } = this.calculateCartesianCoords(key);
              return (
                <Moon
                  style={{
                    left: x,
                    top: y,
                  }}
                  key={key}
                  {...m}
                  onClick={m.onClick}
                  moonSize={moonSize}
                  moonColor={moonColor}
                />
              );
            })}
        </div>
      </div>
    );
  }
}
