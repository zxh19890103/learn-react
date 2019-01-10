import React from 'react'

export class Com extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { name, age } = this.props
    return (
    <p>
      This author's name is {name}, and his age is {age}
    </p>
    )
  }
}
