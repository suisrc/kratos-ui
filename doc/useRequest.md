# 通信部分

### [useRequest](https://hooks.umijs.org/zh-CN/hooks/async)

``` TypeScript
export default () => {
  const { data, error, loading } = useRequest(getUsername)
  if (error) {
    return <div>failed to load</div>
  }
  if (loading) {
    return <div>loading...</div>
  }
  return <div>Username: {data}</div>
}

// 手动触发
const { loading, run } = useRequest(changeUsername, {
  manual: true,
  onSuccess: (result, params) => {
    if (result.success) {
      setState('');
      message.success(`The username was changed to "${params[0]}" !`);
    }
  }
});

```
基础API
``` TypeScript
const {
  data, // undefined / any || service 返回的数据，默认为 undefined。如果有 formatResult, 则该数据为被格式化后的数据。
  error, // undefined / Error
  loading, // boolean
  run, //(...args: any[]) => Promise
  params, // any[] || 当次执行的 service 的参数数组。比如你触发了 run(1, 2, 3)，则 params 等于 [1, 2, 3]
  cancel, // () => void
  refresh, // 	() => Promise
  mutate, // (newData) => void / ((oldData)=>newData) => void || 直接修改 data
  fetches, // {[key:string]: {loading,data,error,params,cancel,refresh,mutate,run}}
  // 默认情况下，新请求会覆盖旧请求。如果设置了 fetchKey，则可以实现多个请求并行，fetches 存储了多个请求的状态。外层的状态为最新触发的 fetches 数据。
} = useRequest(service, {
  manual, // boolean               >> false || 默认 false。 即在初始化时自动执行 service。。否则则需要手动调用 run 触发执行。
  initialData, // any              || 默认的 data
  refreshDeps, // any[]            >> [] || 在 manual = false 时，refreshDeps 变化，会触发 service 重新执行
  formatResult, // (response: any) => any
  onSuccess, // (data: any, params: any[]) => void     || service resolve 时触发，参数为 data 和 params, 如果有 formatResult ，则 data 为格式化后数据。
  onError, // (error: Error, params: any[]) => void
  fetchKey, // (...params: any[]) => string            || 根据 params，获取当前请求的 key，设置之后，我们会在 fetches 中同时维护不同 key 值的请求状态。
  cacheKey, // string              || 请求唯一标识。如果设置了 cacheKey，我们会启用缓存机制 ,缓存每次请求的 data , error , params , loading.在缓存机制下，同样的请求我们会先返回缓存中的数据，同时会在背后发送新的请求，待新数据返回后，重新触发数据更新
  defaultParams, // any[]          || 如果 manual=false ，自动执行 run 的时候，默认带上的参数
  loadingDelay, // number          ||设置显示 loading 的延迟时间，避免闪烁
  pollingInterval, // number       || 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 run
  pollingWhenHidden, // boolean     >> true || 在页面隐藏时，是否继续轮询。默认为 true，即不会停止轮询
  refreshOnWindowFocus, // boolean  >> false || 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 false，即不会重新发起请求
  focusTimespan, // number >> 5000 || 屏幕重新聚焦，如果每次都重新发起请求，不是很好，我们需要有一个时间间隔，在当前时间间隔内，不会重新发起请求, 依赖refreshOnWindowFocus 
  debounceInterval, // nubmer      || 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。
  throttleInterval, // number      || 节流间隔, 单位为毫秒，设置后，请求进入节流模式。
});
```
更多参看开发使用文档: https://hooks.umijs.org/zh-CN/hooks/async
