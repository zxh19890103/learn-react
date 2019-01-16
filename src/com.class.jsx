import React from 'react'

export class Com extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { name, age } = this.props
    return (
      <>
      <h5>Class Component</h5>
      <p>
        This author's name is {name}, and his age is {age}
      </p>
    </>
    )
  }
}
