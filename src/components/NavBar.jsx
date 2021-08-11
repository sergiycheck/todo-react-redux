import navbarStyles from './NavBar.module.css';
import classnames from 'classnames';

export const NavBar = () => {
	
	const navBarClass = classnames(
		navbarStyles.nav, 
		"navbar navbar-expand-lg navbar-dark");
	const ulNavBar = classnames(
		navbarStyles.nav, 
		"navbar-nav me-auto mb-2 mb-lg-0");
	const divNavContainer = classnames(
		"collapse navbar-collapse",
		navbarStyles.divContainerForList
	)
	const buttonToggler = classnames(
		"navbar-toggler",
		navbarStyles.buttonToggler
	)
	return (
		<>
			<nav className={navBarClass}>
				<div className="container-fluid">
					<div >
						<button 
							className={buttonToggler} 
							type="button" data-bs-toggle="collapse" 
							data-bs-target="#navbarListItems" 
							aria-controls="navbarListItems" 
							aria-expanded="false" 
							aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
					</div>

					<div 
						className={divNavContainer} 
						id="navbarListItems">

						<ul className={ulNavBar}>
							<li className="nav-item">
								<a  href="#">All todo</a>
							</li>
							{/* <li className="nav-item">
								<a  href="#">new todo</a>
							</li>
							<li className="nav-item">
								<a  href="#">done todo</a>
							</li> */}
						</ul>
						
					</div>

				</div>
			</nav>
		</>
	)
}