import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { DeviceContext } from '../App';
const logo = '/logo.png';

type NavBarProps = {
	toggle: boolean;
	setToggle: (toggle: boolean) => void;
}

const NavBarDir = () => {
	const { isMobileDevice } = useContext(DeviceContext);

	return (
		<ul className={`${isMobileDevice ? 'mobile-nav-items' : ''}`}>
			<li>
				<a href="#usecases">
					<button>Use Cases</button>
				</a>
			</li>
			{/* <li>
				<a href="#pricing">
					<button>Pricing</button>
				</a>
			</li> */}
			<li>
				<a href="#aboutus">
					<button>About Us</button>
				</a>
			</li>
			<li>
				<a href="#contact">
					<button>Contact</button>
				</a>
			</li>
		</ul>
	);
}

const NavBar = () => {

	const { toggleTheme } = useContext(ThemeContext);

	return (
		<nav className='nav'>
			<div className='left'>
				<a href="#">
					<div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
				</a>
				<div>
					<NavBarDir />
				</div>
			</div>
			<div className='right'>
				<div className='theme-toggle' onClick={toggleTheme} />
				<div style={{ width: '25px' }} />
				<Link to="/login"> {/* TODO: setup requireAuth */ }
					<button className='button'>
						Login
					</button>
				</Link>
			</div>
		</nav>
	);
}

const MobileNavBar = ({toggle, setToggle}: NavBarProps) => {

	return (
		<nav className='nav'>
			<div className='left'>
				<img 
					src={logo} 
					className="App-logo"
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				/> 
			</div>
			<div className='right'>
				<button onClick={() => setToggle(!toggle)}>
					<p className='hamburger'>☰</p>
				</button>
			</div>
			<div className={`mobile-nav ${toggle ? 'open' : 'closed'}`}>
				<NavBarDir />
			</div>
		</nav>
	);
}

const HeroSection = () => {
  return (
	<section id="hero">
		<div>
			<div style={{ height: '10vh' }}></div>
			<h1 className="title">Automate Tedious Documentation<br /> &nbsp;&nbsp;&nbsp; By Connecting All Your Tools</h1>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<div className="hero-img" />
				<div>
					<div style={{ height: '30vh' }} />
					<Link to="/projects"> {/* TODO: new account */ }
						<button className="button c2a">Try For Free</button>
					</Link>
				</div>
			</div>
		</div>
	</section>
  );
};

const UseCasesSection = () => {
  return (
	<section id="usecases">
		<div>
			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<div className="horiz-line" />
				<h2 className="section-head">&nbsp;Use Cases&nbsp;</h2>
				<div className="horiz-line" />
			</div> {/* TODO: usecase carousel */ }
		</div>
	</section>
  );
}

const LandingPage = () => {
	const { isMobileDevice } = useContext(DeviceContext);
	const [toggle, setToggle] = useState(false);

	return (
		<section id="">
			<div className="fullscreen-layout">
				{isMobileDevice ? 	<MobileNavBar {...{toggle, setToggle}} /> : 
									<NavBar />}
				<div className="box-container-main">
					<HeroSection />
					<UseCasesSection />
					{/* <PricingSection />
					<AboutUsSection />
					<ContactSection />
					<Footer /> */}
				</div>
			</div>
		</section>
		
	);
};

export default LandingPage;