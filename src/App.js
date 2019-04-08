import React, {useState} from 'react';
import {useTransition, animated} from 'react-spring';
import {Transition} from 'react-transition-group';
import GithubCorner from 'react-github-corner';
import './App.css';

const duration = 3000;

// react-transition-group data
// ----------------------------
const defaultStyle = {
	transition: `
		opacity ${duration}ms cubic-bezier(.4,0,.6,1),
		left ${duration}ms cubic-bezier(.4,0,.6,1)
	`,
	position: 'relative',
};
const transitionStyles = {
	entering: {opacity: 1, left: '50px'},
	exiting: {opacity: 0, left: '-50px'},
};
transitionStyles.entered = transitionStyles.entering;
transitionStyles.exited = transitionStyles.exiting;
// ----------------------------

const DummyComponent = () => <span className={'toggledElement'}>Whatever</span>;

const App = () => {
	// react-spring data
	// -----------------------
	const [showSpringComponent, toggleSpringComponent] = useState(false);
	const [showTGComponent, toggleTGComponent] = useState(false);
	const transitionSpring = useTransition(showSpringComponent, null, {
		from: {opacity: 0, left: '-50px'},
		enter: {opacity: 1, left: '50px'},
		leave: {opacity: 0, left: '-50px'},
		config: {duration},
	});
	// -----------------------

	return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
			<div className="App">
				<GithubCorner href="https://github.com/s-h-a-d-o-w/react-spring-comparison" />
				<p style={{margin: '40px'}}>
					Buttons should toggle the visibility of a single element. Try quickly
					pressing it multiple times while the element appears.
				</p>

				<div className="reactSpring">
					<button onClick={() => toggleSpringComponent(!showSpringComponent)}>
						react-spring
					</button>
					{transitionSpring.map(
						({item, key, props}) =>
							item && (
								<animated.div style={{...props, position: 'relative'}}>
									<DummyComponent />
								</animated.div>
							)
					)}
				</div>

				<div className="reactTG">
					<button onClick={() => toggleTGComponent(!showTGComponent)}>
						react-transition-group
					</button>
					<Transition in={showTGComponent} timeout={duration}>
						{(transitionState) => {
							return (
								<div
									style={{
										...defaultStyle,
										...transitionStyles[transitionState],
									}}
								>
									<DummyComponent />
								</div>
							);
						}}
					</Transition>
				</div>
			</div>
		</div>
	);
};

export default App;
