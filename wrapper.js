// THIS IS TO MAKE A DYNAMIC KEYBOARD RESPONSE FOR NAVIGATION BAR
// The navigation bar will be hidden if the keyboard is shown and it will be shown again when the keyboard is hidden
// this function is to make the navigation bar responsive to keyboard activity


import React from 'react'
import { Keyboard } from 'react-native'
import { TabNavigator,TabBarBottom } from 'react-navigation'

export class TabBarComponent extends React.PureComponent {

  constructor(props) {
    super(props)

    this.keyboardWillShow = this.keyboardWillShow.bind(this)
    this.keyboardWillHide = this.keyboardWillHide.bind(this)

    this.state = {
      isVisible: true
    }
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = event => {
    this.setState({
      isVisible: false
    })
  }

  keyboardWillHide = event => {
    this.setState({
      isVisible: true
    })
  }

  render() {
    return this.state.isVisible ?
      <TabBarBottom {...this.props} />
      :
      null
  }
}
