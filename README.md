# learnreact
A project to learn react deeply. Know it's principle and use it later.

# Tasks
1. Complete the development environment using webpack 4.0
2. Configure eslint
3. Use Jest to test
4. Init .editorconfig
5. Configure babel rc
6. Use yarn, not npm.

## Code
```javascript
class ReactRoot
	_internalRoot
	render(children, callback): Work
	unmount(callback): Work
	legacy_renderSubtreeIntoContainer(parentComponent, children, callback): Work
	createBatch() ReactBatch

class ReactBatch
	_expirationTime
	_root: ReactRoot
	_next
	_callbacks
	_didComplete
	_hasChildren
	_children
	_defer
	render(children: ReactNodeList)
	then(onComplete)
	commit()
	_onCommit()	

class ReactWork
	_callbacks
	_didCommit
	_onCommit
	then()
	_onCommit()

object ReactDom
		render(children, container, callback)
			- legacyRenderSubtreeIntoContainer(
          parentComponent: ?React$Component<any, any>,
          children: ReactNodeList,
          container: DOMContainer,
          forceHydrate: boolean,
          callback: ?Function,
				)
          - ReactRoot.render(children, callback)
            - updateContainer(children, ReactRoot._internalRoot, null, work._onCommit)
              - updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback)
                - scheduleRootUpdate(current Fiber, element, expirationTime, callback)
                  - createUpdate(expirationTime) with payload = {element}
                  - flushPassiveEffects()
                  - enqueueUpdate(current, update) ***
                  - scheduleWork(current, expirationTime)
                    - scheduleWorkToRoot(fiber, expirationTime) ***
```

```
createUpdate()
{
    expirationTime: expirationTime,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
    nextEffect: null,
}

```

### enqueueUpdate(fiber, update)

See [enqueueUpdate.md]

### scheduleWork(fiber, expirationTime)
See [scheduleWork.md]
