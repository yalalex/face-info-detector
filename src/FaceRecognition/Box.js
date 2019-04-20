import React from 'react';
import './FaceRecognition.css';

const Box = ({ box }) => {
	return (
		<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
			<div className='showinfo'>
				<p className='inthebox'>{`Sex: ${box.gender}`}</p>
				<p className='inthebox'>{`Age: ${box.age}`}</p>
				<p className='inthebox'>{`Race: ${box.race}`}</p>
			</div>
		</div>

		);
}	

export default Box;