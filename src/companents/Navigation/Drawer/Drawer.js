import React, {Component} from "react";
import "./Drawer.css"
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";


class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={`${link.exact}`}
                        onClick={this.clickHandler}
                    >{link.label}</NavLink>
                </li>
            )
        })
    }
    render() {
        const cls = [
            'Drawer',
            this.props.isOpen ? true: 'close'
        ]

        const links = [
            {to: '/', label: 'List of tests', exact: true},

        ]

        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Create test', exact: false})
            links.push({to: '/logout', label: 'Exit', exact: false})
        } else {
            links.push({to: '/auth', label: 'Authorization', exact: false})
        }

        return (
            <React.Fragment>
            <nav className={cls.join(' ')}>
                <ul className={'ul'}>
                    {this.renderLinks(links)}
                </ul>
            </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/>: null }
            </React.Fragment>
        )

    }
}

export default Drawer