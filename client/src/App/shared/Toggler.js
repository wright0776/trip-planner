import  { Component } from 'react'

export default class Toggler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggled: props.toggled || false
        }
    }

    toggle = () => {
        this.setState(prevState => ({ isToggled: !prevState.isToggled }))
    }

    render() {
        const { isToggled } = this.state;
        return this.props.render({ toggle: this.toggle, isToggled })
    }
}
