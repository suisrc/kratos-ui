```conf
allowAnyClick: boolean // 默认false，设为true非左键可实现点击拖拽
axis: string // 'x'：x轴方向拖拽、'y'：y轴方向拖拽、'none'：禁止拖拽
bounds: { left: number, top: number, right: number, bottom: number } | string 
    // 限定移动的边界，接受值：
    //（1）'parent':在移动元素的offsetParent范围内
    //（2）一个选择器，在指定的Dom节点内
    //（3）{ left: number, top: number, right: number, bottom: number }对象，限定每个方向可以移动的距离
cancel：制定给一个选择器组织drag初始化，例如'.body'
defaultClassName：string // 拖拽ui类名，默认'react-draggable'
drfaultClassNameDragging：string // 正在拖拽ui类名，默认'eact-draggable-dragging'
defaultClassNameDragged：string //拖拽后的类名，默认'react-draggable-dragged'
defaultPosition：{ x: number, y: number } // 起始x和y的位置
disabled：boolean // true禁止拖拽任何元素
grid：[number, number] // 正在拖拽的网格范围
handle：string // 初始拖拽的的选择器'.handle'
offsetParent：HTMLElement // 拖拽的offsetParent
onMouseDown: (e: MouseEvent) => void // 鼠标按下的回调
onStart: DraggableEventHandler // 开始拖拽的回调
onDrag：DraggableEventHandler // 拖拽时的回调
onStop：DraggableEventHandler // 拖拽结束的回调
position: {x: number, y: number} // 控制元素的位置
positionOffset: {x: number | string, y: number | string} // 相对于起始位置的偏移
scale：number // 定义拖拽元素的缩放

```