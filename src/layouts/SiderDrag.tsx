// // @see https://github.com/STRML/react-draggable/blob/master/lib/Draggable.js

// import React from 'react';
// import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
// import classNames from 'classnames';

// import {
//     DraggableCore,
//     DraggableData,
//     ControlPosition,
//     DraggableCoreProps,
//     DraggableBounds,
//     DraggableEventHandler,
//     PositionOffsetControlPosition,
// } from 'react-draggable';

// // import {
// //     createDraggableData,
// // } from 'react-draggable/build/cjs/utils/domFns';

// const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
// function getPrefix(prop: string = 'transform'): string {
//     // Checking specifically for 'window.document' is for pseudo-browser server-side
//     // environments that define 'window' as the global context.
//     // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
//     if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';

//     const style = window.document.documentElement.style;

//     if (prop in style) return '';

//     for (let i = 0; i < prefixes.length; i++) {
//         if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
//     }

//     return '';
// }
// const browserPrefix = getPrefix()
// function browserPrefixToKey(prop: string, prefix: string): string {
//     return prefix ? `${prefix}${kebabToTitleCase(prop)}` : prop;
// }
// function kebabToTitleCase(str: string): string {
//     let out = '';
//     let shouldCapitalize = true;
//     for (let i = 0; i < str.length; i++) {
//         if (shouldCapitalize) {
//             out += str[i].toUpperCase();
//             shouldCapitalize = false;
//         } else if (str[i] === '-') {
//             shouldCapitalize = true;
//         } else {
//             out += str[i];
//         }
//     }
//     return out;
// }
// function createCSSTransform(controlPos: ControlPosition, positionOffset: PositionOffsetControlPosition): Object {
//     const translation = getTranslation(controlPos, positionOffset, 'px');
//     return { [browserPrefixToKey('transform', browserPrefix)]: translation };
// }
// function getTranslation({ x, y }: ControlPosition, positionOffset: PositionOffsetControlPosition, unitSuffix: string): string {
//     let translation = `translate(${x}${unitSuffix},${y}${unitSuffix})`;
//     if (positionOffset) {
//         const defaultX = `${(typeof positionOffset.x === 'string') ? positionOffset.x : positionOffset.x + unitSuffix}`;
//         const defaultY = `${(typeof positionOffset.y === 'string') ? positionOffset.y : positionOffset.y + unitSuffix}`;
//         translation = `translate(${defaultX}, ${defaultY})` + translation;
//     }
//     return translation;
// }
// // Create an data exposed by <Draggable>'s events
// function createDraggableData(draggable: Draggable, coreData: DraggableData): DraggableData {
//   const scale = draggable.props.scale;
//   return {
//     node: coreData.node,
//     //x: draggable.state.x + (coreData.deltaX / scale),
//     y: draggable.state.y + (coreData.deltaY / scale),
//     //deltaX: (coreData.deltaX / scale),
//     deltaY: (coreData.deltaY / scale),
//     //lastX: draggable.state.x,
//     lastY: draggable.state.y,
//     x: 0,
//     deltaX: 0,
//     lastX: 0,
//   };
// }

// function getBoundPosition(draggable: Draggable, x: number, y: number): [number, number] {
//   // If no bounds, short-circuit and move on
//   if (!draggable.props.bounds) return [x, y];

//   // Clone new bounds
//   let {bounds} = draggable.props;
//   bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
//   const node = findDOMNode(draggable);

//   if (typeof bounds === 'string') {
//     const {ownerDocument} = node;
//     const ownerWindow = ownerDocument.defaultView;
//     let boundNode;
//     if (bounds === 'parent') {
//       boundNode = node.parentNode;
//     } else {
//       boundNode = ownerDocument.querySelector(bounds);
//     }
//     if (!(boundNode instanceof ownerWindow.HTMLElement)) {
//       throw new Error('Bounds selector "' + bounds + '" could not find an element.');
//     }
//     const nodeStyle = ownerWindow.getComputedStyle(node);
//     const boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
//     // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
//     bounds = {
//       left: -node.offsetLeft + int(boundNodeStyle.paddingLeft) + int(nodeStyle.marginLeft),
//       top: -node.offsetTop + int(boundNodeStyle.paddingTop) + int(nodeStyle.marginTop),
//       right: innerWidth(boundNode) - outerWidth(node) - node.offsetLeft +
//         int(boundNodeStyle.paddingRight) - int(nodeStyle.marginRight),
//       bottom: innerHeight(boundNode) - outerHeight(node) - node.offsetTop +
//         int(boundNodeStyle.paddingBottom) - int(nodeStyle.marginBottom)
//     };
//   }

//   // Keep x and y below right and bottom limits...
//   if (isNum(bounds.right)) x = Math.min(x, bounds.right);
//   if (isNum(bounds.bottom)) y = Math.min(y, bounds.bottom);

//   // But above left and top limits.
//   if (isNum(bounds.left)) x = Math.max(x, bounds.left);
//   if (isNum(bounds.top)) y = Math.max(y, bounds.top);

//   return [x, y];
// }
// function isNum(num: any): boolean {
//   return typeof num === 'number' && !isNaN(num);
// }
// function int(a: string): number {
//   return parseInt(a, 10);
// }
// // A lot faster than stringify/parse
// function cloneBounds(bounds: DraggableBounds): DraggableBounds {
//   return {
//     left: bounds.left,
//     top: bounds.top,
//     right: bounds.right,
//     bottom: bounds.bottom
//   };
// }

// function findDOMNode(draggable: Draggable | DraggableCore): HTMLElement {
//   const node = draggable.findDOMNode();
//   if (!node) {
//     throw new Error('<DraggableCore>: Unmounted during event!');
//   }
//   // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME
//   return node;
// }

// type DraggableState = {
//     dragging: boolean,
//     dragged: boolean,
//     y: number,
//     slackY: number,
//     isElementSVG: boolean,
//     prevPropsPosition?: ControlPosition,
// };

// export type DraggableProps = DraggableCoreProps & {
//     bounds: DraggableBounds | string | false,
//     nodeRef?: React.ElementRef<any>,
//     defaultClassName: string,
//     defaultClassNameDragging: string,
//     defaultClassNameDragged: string,
//     defaultPosition: ControlPosition,
//     position: ControlPosition,
//     positionOffset: PositionOffsetControlPosition,
// };

// //
// // Define <Draggable>
// //

// class Draggable extends React.Component<DraggableProps, DraggableState> {

//     static defaultProps = {
//         ...DraggableCore.defaultProps,
//         bounds: false,
//         defaultClassName: 'react-draggable',
//         defaultClassNameDragging: 'react-draggable-dragging',
//         defaultClassNameDragged: 'react-draggable-dragged',
//         defaultPosition: { x: 0, y: 0 },
//         position: null,
//     };

//     // React 16.3+
//     // Arity (props, state)
//     static getDerivedStateFromProps({ position }: DraggableProps, { prevPropsPosition }: DraggableState) {
//         // Set x/y if a new position is provided in props that is different than the previous.
//         if (position && (!prevPropsPosition || position.y !== prevPropsPosition.y)) {
//             // log('Draggable: getDerivedStateFromProps %j', {position, prevPropsPosition});
//             return {
//                 y: position.y,
//                 prevPropsPosition: { ...position }
//             };
//         }
//         return null;
//     }

//     constructor(props: DraggableProps) {
//         super(props);

//         this.state = {
//             // Whether or not we are currently dragging.
//             dragging: false,

//             // Whether or not we have been dragged before.
//             dragged: false,

//             // Current transform y.
//             y: props.position ? props.position.y : props.defaultPosition.y,

//             prevPropsPosition: { ...props.position },

//             // Used for compensating for out-of-bounds drags
//             slackY: 0,

//             // Can only determine if SVG after mounting
//             isElementSVG: false
//         };

//         if (props.position && !(props.onDrag || props.onStop)) {
//             // eslint-disable-next-line no-console
//             console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' +
//                 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' +
//                 '`position` of this element.');
//         }
//     }

//     componentDidMount() {
//         // Check to see if the element passed is an instanceof SVGElement
//         if (typeof window.SVGElement !== 'undefined' && this.findDOMNode() instanceof window.SVGElement) {
//             this.setState({ isElementSVG: true });
//         }
//     }

//     componentWillUnmount() {
//         this.setState({ dragging: false }); // prevents invariant if unmounted while dragging
//     }

//     // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
//     // the underlying DOM node ourselves. See the README for more information.
//     findDOMNode(): React.ReactNode {
//         return this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
//     }

//     onDragStart: DraggableEventHandler = (e, coreData) => {
//         // log('Draggable: onDragStart: %j', coreData);

//         // Short-circuit if user's callback killed it.
//         const shouldStart = this.props.onStart(e, createDraggableData(this, coreData));
//         // Kills start event on core as well, so move handlers are never bound.
//         if (shouldStart === false) return false;

//         this.setState({ dragging: true, dragged: true });
//     };

//     onDrag: DraggableEventHandler = (e, coreData) => {
//         if (!this.state.dragging) return false;
//         //log('Draggable: onDrag: %j', coreData);

//         const uiData = createDraggableData(this, coreData);

//         const newState = <DraggableState>{}

//         //</DraggableState>    y: uiData.y
//         //};

//         // Keep within bounds.
//         if (this.props.bounds) {
//             // Save original x and y.
//             const { x, y } = newState;

//             // Add slack to the values used to calculate bound position. This will ensure that if
//             // we start removing slack, the element won't react to it right away until it's been
//             // completely removed.
//             newState.y += this.state.slackY;

//             // Get bound position. This will ceil/floor the x and y within the boundaries.
//             const [newStateX, newStateY] = getBoundPosition(this, newState.x, newState.y);
//             newState.y = newStateY;

//             // Recalculate slack by noting how much was shaved by the boundPosition handler.
//             newState.slackY = this.state.slackY + (y - newState.y);

//             // Update the event we fire to reflect what really happened after bounds took effect.
//             uiData.y = newState.y;
//             uiData.deltaY = newState.y - this.state.y;
//         }

//         // Short-circuit if user's callback killed it.
//         const shouldUpdate = this.props.onDrag(e, uiData);
//         if (shouldUpdate === false) return false;

//         this.setState(newState);
//     };

//     onDragStop: DraggableEventHandler = (e, coreData) => {
//         if (!this.state.dragging) return false;

//         // Short-circuit if user's callback killed it.
//         const shouldContinue = this.props.onStop(e, createDraggableData(this, coreData));
//         if (shouldContinue === false) return false;

//         //log('Draggable: onDragStop: %j', coreData);

//         const newState: $Shape<DraggableState> = {
//             dragging: false,
//             slackY: 0
//         };

//         // If this is a controlled component, the result of this operation will be to
//         // revert back to the old position. We expect a handler on `onDragStop`, at the least.
//         const controlled = Boolean(this.props.position);
//         if (controlled) {
//             const { x, y } = this.props.position;
//             newState.x = x;
//             newState.y = y;
//         }

//         this.setState(newState);
//     };

//     render(): React.ReactElement<any> {
//         const {
//             bounds,
//             children,
//             defaultPosition,
//             defaultClassName,
//             defaultClassNameDragging,
//             defaultClassNameDragged,
//             position,
//             positionOffset,
//             scale,
//             ...draggableCoreProps
//         } = this.props;

//         let style = {};

//         // If this is controlled, we don't want to move it - unless it's dragging.
//         const controlled = Boolean(position);
//         const draggable = !controlled || this.state.dragging;

//         const validPosition = position || defaultPosition;
//         const transformOpts = {
//             // Set left if horizontal drag is enabled

//             // Set top if vertical drag is enabled
//             y: canDragY(this) && draggable ?
//                 this.state.y :
//                 validPosition.y
//         };

//         // Add a CSS transform to move the element around. This allows us to move the element around
//         // without worrying about whether or not it is relatively or absolutely positioned.
//         // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
//         // has a clean slate.
//         style = createCSSTransform(transformOpts, positionOffset);

//         // Mark with class while dragging
//         const className = classNames((children.props.className || ''), defaultClassName, {
//             [defaultClassNameDragging]: this.state.dragging,
//             [defaultClassNameDragged]: this.state.dragged
//         });

//         // Reuse the child provided
//         // This makes it flexible to use whatever element is wanted (div, ul, etc)
//         return (
//             <DraggableCore {...draggableCoreProps} onStart={this.onDragStart} onDrag={this.onDrag} onStop={this.onDragStop}>
//                 {React.cloneElement(React.Children.only(children), {
//                     className: className,
//                     style: { ...children.props.style, ...style },
//                 })}
//             </DraggableCore>
//         );
//     }
// }

// export { Draggable as default };
