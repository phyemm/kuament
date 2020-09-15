# NoteBoo
* 实际上，如果Vue仅仅依赖getter与setter，是无法做到在数组调用push,pop等方法时候触发数据响应的，因此Vue实际上是通过劫持这些方法，对这些方法进行包装变异来实现的。
```
var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    // 将 arguments 转换为数组
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var result = original.apply(this, args);
    // 这儿的用法同dependArray(value)，就是为了取得dep
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    // 如果有新的数据插入，则插入的数据也要进行一个响应式
    if (inserted) { ob.observeArray(inserted); }
   // 通知依赖进行更新
    ob.dep.notify();
    return result
  });
```
