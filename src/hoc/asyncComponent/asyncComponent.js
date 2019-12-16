import React, { Component } from 'react';

const asyncComponent = (importantComponent) => {
    return class extends Component {
        state = {
            component: null
        }
        componentDidMount () {
            importantComponent()
            .then(componentProp => {
                this.setState({component: componentProp.default});
            });
        }
        render () {
        const Comp = this.state.component;
        return Comp ? <Comp {...this.props} /> : null;
    }
    }
    
}

export default asyncComponent;
