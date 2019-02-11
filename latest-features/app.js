
import SuspenseTest from './suspense'
import * as React from 'react'

const App = ({}) => {
  return <div>
    <h3>Hello, World</h3>
    <React.Suspense fallback={<h4>Loading...</h4>}>
      <SuspenseTest/>
    </React.Suspense>
    </div>
}

export default App
