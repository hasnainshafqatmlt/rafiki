import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'


export default class Item extends Component {
	static propTypes = {
		text: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		href: PropTypes.string,
		to: PropTypes.string,
		handleClick: PropTypes.func,
		active: PropTypes.bool,
		tooltip: PropTypes.string
	}

	static defaultProps = {
		active: false
	}

	render() {
		const { text, icon, to, href, handleClick } = this.props

		const className = this.props.active ? styles.active : ''

		const tooltip = this.props.tooltip ? (
			<div className={styles.tooltip}>
			{this.props.tooltip}
			</div>
		) : null

		if (handleClick && typeof handleClick === 'function') {
			return (
				<li className={className}>
					<div onClick={handleClick} style={{cursor: 'pointer'}}>
						<span className={`icon icon-${icon}`} />
						<span className='text'>{text}</span>
					</div>
					{tooltip}
				</li>
			)
		}

		if (to && typeof to === 'string') {
			return (
				<li className={className}>
					<Link to={to}>
						<span className={`icon icon-${icon}`} />
						<span className='text'>{text}</span>
					</Link>
					{tooltip}
				</li>
			)
		}

		return (
			<li className={className}>
				<a href={href}>
					<span className={`icon icon-${icon}`} />
					<span className='text'>{text}</span>
				</a>
				{tooltip}
			</li>
		)
	}
}
