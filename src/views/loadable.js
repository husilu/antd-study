import React, { Component } from 'react'

const Loadable = ({
  loader,
  loading: Loading
}) => {
  return class LoadableComponent extends Component {
    state = {
      LoadedComponent: null
    }
    componentDidMount() {
      loader().then(res=>{
        this.setState({
          LoadedComponent: res.default
        })
      })
    }
    render() {
      const {
        LoadedComponent
      } = this.state
      return (
        LoadedComponent
        ?
        <LoadedComponent />
        :
        <Loading></Loading>
      )
    }
  }
}

export default Loadable