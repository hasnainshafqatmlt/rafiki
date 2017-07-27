import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom';
import Item from './Item'

export default class Sidebar extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    navigate: PropTypes.bool,
    paddingTop: PropTypes.bool,
    active: PropTypes.string
  }

  static defaultProps = {
    navigate: false,
    paddingTop: false
  }

  state = {
    fixed: false,
    active: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({
      fixed: document.body.scrollTop > 60
    })
  }

  handleFabClick = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    const { fixed, active } = this.state

    const actions = React.Children.toArray(this.props.children)

    let navigate = ''

    return (
      <div className={`sidebar ${fixed ? 'fixed' : ''} ${active ? 'active' : ''} ${this.props.paddingTop ? paddingTop : ''}`}>
        <div className='fab' onClick={this.handleFabClick}>
          <div className='fabTriangle' />
        </div>

        <div className='menu'>
          {actions.length > 0 ?
            <div className='actions'>
              <div className='header'>
                Actions
              </div>

              <ul className='list'>
                {actions}
              </ul>
            </div>
          : <div />}


          <div className='extraLinks hidden-xs hidden-sm'>
            <div className='extraLink'>
              <div className='text'>
                <div>Need an incubator space?</div>
                <div>Join us!</div>
              </div>

              <div className='button'>
                <Link to="/incubatee-pricing" className='btn btn-primary incBtn'>Incubatee registration</Link>
              </div>
            </div>
            <div className='extraLink'>
              <div className='text'>
                Visit INSEAD Centre of Entrepreneurship (ICE) on INSEADERS
              </div>

              <div className='button'>
                <Link to="/ice" className='btn btn-primary incBtn'>ICE's portal</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Sidebar.Item = Item
