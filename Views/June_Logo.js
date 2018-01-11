import React from 'react';
import Svg,{
    Path, G
} from 'react-native-svg';


export default function June({
  height,
  width,
  scale,
  fill,
}) {

  return (
    <Svg  height={height} width={width}>
        <G scale={scale}>
            <Path
            d= "M145.2,88.3c7.2,7,11,15.6,11.7,26.4c0,0.2,0.1,0.5,0.1,0.9l0.3,62.5c0,8.5,2.1,15.9,6.2,21.7c4.9,7.3,12.4,11.2,21.8,11.2 c9.1-0.1,16.5-4,21.3-11.1c4.1-5.9,6.2-13.3,6.2-21.8c0-4.1-3.3-7.4-7.4-7.4c-4.1,0-7.4,3.3-7.4,7.4c0,5.5-1.2,9.8-3.6,13.4 c-2.1,3.2-5,4.6-9.1,4.6c-4.3,0-7.2-1.5-9.5-4.8c-2.4-3.4-3.6-7.8-3.6-13.3l-0.3-63.3c0-0.4-0.1-1-0.2-1.6 c-1.1-14.2-6.5-26.2-16.2-35.6C145,67.3,131.4,62,115.1,61.8c-0.1,0-0.3,0-0.4,0c-0.1,0-0.2,0-0.3,0l-0.3,0c-0.1,0-0.1,0-0.2,0h0 c0,0,0,0,0,0C97.7,61.9,84,67.3,73.4,77.7C62.5,88.3,57,102,57,118.5v66.7c0,4.1,3.3,7.4,7.4,7.4c4.1,0,7.4-3.3,7.4-7.4v-66.7 c0-12.5,3.9-22.4,11.9-30.2c8-7.8,18-11.6,30.5-11.7C127,76.6,137.1,80.5,145.2,88.3z"
            fill={fill}
            />

            <Path d="M235.2,106.8c-4.1,0-7.4,3.3-7.4,7.4V181c0,12.5-3.9,22.4-11.9,30.2c-8,7.8-18,11.6-30.5,11.7c-12.8,0-22.9-3.8-30.9-11.7 c-7.8-7.6-11.4-15.1-12.1-25.5l-0.1-64.4c0-8.5-2.1-15.9-6.2-21.7c-4.9-7.3-12.4-11.1-21.8-11.2c-9.1,0.1-16.5,4-21.3,11.1 c-4.1,5.9-6.3,13.3-6.3,21.8c0,4.1,3.3,7.4,7.4,7.4c4.1,0,7.4-3.3,7.4-7.4c0-5.5,1.2-9.8,3.6-13.4c2.1-3.2,5-4.6,9.1-4.6 c4.3,0,7.2,1.5,9.5,4.8c2.4,3.4,3.6,7.8,3.6,13.3v63.8c0,0.3,0,0.5,0,0.8l0.1,1.1c0.9,13.7,6.2,24.8,16.5,34.8 c10.8,10.5,24.6,15.8,41.1,15.9l0,0l0.5,0c0,0,0,0,0,0c16.3-0.2,29.9-5.5,40.6-15.9c10.9-10.6,16.4-24.3,16.4-40.9v-66.7 C242.7,110.2,239.3,106.8,235.2,106.8z"
            fill={fill}
            />
          </G>
    </Svg>
  );
}

// June.propTypes = {
//   height: React.PropTypes.func.isRequired,
//   width: React.PropTypes.func.isRequired,
//   scale: React.PropTypes.string,
//   fill: React.PropTypes.string,
// };
