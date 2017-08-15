import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<div className='container'>
					<div className='left col-100'>
						<div className='col-sm-12 float-left social-icons'>
							<i>
								<img
									src='/images/facebook-logo.png'
									width='12'
								/>
							</i>
							<i>
								<img
									src='/images/twitter-logo-silhouette.png'
									width='12'
								/>
							</i>
							<i>
								<img
									src='/images/google-plus-logo.png'
									width='12'
								/>
							</i>
							<i>
								<img
									src='/images/pinterest.png'
									width='17'
								/>
							</i>							
						</div>
						<div className='col-sm-12 float-left nav-links'>
							<a href='#'>
								{'Home'}
							</a>
							<a href='#'>
								{'Crea tu cuenta'}
							</a>
							<a href='#'>
								{'Como funciona'}
							</a>
							<a href='#'>
								{'Contacto'}
							</a>
						</div>
						<div className='col-sm-12 float-left info'>{'Términos y Privacidad'}</div>
						<div className='col-sm-12 float-left info bottom'>{'© kogno 2017'}</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;

