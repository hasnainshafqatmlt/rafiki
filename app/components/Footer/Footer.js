import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<div className='container'>
					<div className='left col-100'>
						<div className='col-sm-12 float-left social-icons'>
							<a target='_blank' href='https://www.facebook.com/sharer.php?u=http://rafiki.co'>
								<img
									src='/images/facebook-logo.png'
									width='12'
								/>
							</a>
							<a target='_blank' href='https://twitter.com/share?url=http://rafiki.co'>
								<img
									src='/images/twitter-logo-silhouette.png'
									width='12'
								/>
							</a>
							<a target='_blank' href='https://plus.google.com/share?url=h;p://rafiki.co'>
								<img
									src='/images/google-plus-logo.png'
									width='12'
								/>
							</a>
							<a target='_blank' href='https://pinterest.com/pin/create/button/?url=http://rafiki.co'>
								<img
									src='/images/pinterest.png'
									width='17'
								/>
							</a>							
						</div>
						<div className='col-sm-12 float-left nav-links'>
							<Link to='/'>
								{'Home'}
							</Link>
							<Link to='/signup'>
								{'Crea tu cuenta'}
							</Link>
							<a target='_blank' href='www.rafiki.kogno.co/como-funciona'>
								{'Como funciona'}
							</a>
							<Link to='#zbwid-84b7d69f'>
								{'Contacto'}
							</Link>
						</div>
						<div className='col-sm-12 float-left info'>
							<a target='_blank' href='http://www.rafiki.kogno.co/terminos'>
								{'Términos y Privacidad'}
							</a>
						</div>
						<div className='col-sm-12 float-left info bottom'>{'© RAFIKI 2017'}</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;

