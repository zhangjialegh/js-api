## jsa.request(OBJECT)

发起网络请求。
<table>
<thead>
<tr>
<th style="text-align:left">参数名</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">必填</th>
<th style="text-align:left">默认值</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">url</td>
<td style="text-align:left">String</td>
<td style="text-align:left">是</td>
<td style="text-align:left"></td>
<td style="text-align:left">开发者服务器接口地址</td>
</tr>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">Object/String/ArrayBuffer</td>
<td style="text-align:left">否</td>
<td style="text-align:left"></td>
<td style="text-align:left">请求的参数</td>
</tr>
<tr>
<td style="text-align:left">header</td>
<td style="text-align:left">Object</td>
<td style="text-align:left">否</td>
<td style="text-align:left"></td>
<td style="text-align:left">设置请求的 header，header 中不能设置 Referer。</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left">method</td>
<td style="text-align:left">String</td>
<td style="text-align:left">否</td>
<td style="text-align:left">GET</td>
<td style="text-align:left">有效值详见下方说明</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left">dataType</td>
<td style="text-align:left">String</td>
<td style="text-align:left">否</td>
<td style="text-align:left">json</td>
<td style="text-align:left">如果设为 json，会尝试对返回的数据做一次 JSON.parse</td>
</tr>
<tr>
<td style="text-align:left">responseType</td>
<td style="text-align:left">String</td>
<td style="text-align:left">否</td>
<td style="text-align:left">text</td>
<td style="text-align:left">设置响应的数据类型。合法值：text、arraybuffer</td>
</tr>
<tr>
<td style="text-align:left">success</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left"></td>
<td style="text-align:left">收到开发者服务成功返回的回调函数</td>
</tr>
<tr>
<td style="text-align:left">fail</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left"></td>
<td style="text-align:left">接口调用失败的回调函数</td>
</tr>
<tr>
<td style="text-align:left">complete</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left"></td>
<td style="text-align:left">接口调用结束的回调函数（调用成功、失败都会执行）</td>
</tr>
</tbody>
</table>

**method 有效值**

必须大写。

<table>
<tbody>
<tr>
<td style="text-align:center">GET</td>
<td style="text-align:center">POST</td>
<td style="text-align:center">PUT</td>
<td style="text-align:center">DELETE</td>
<td style="text-align:center">CONNECT</td>
<td style="text-align:center">HEAD</td>
<td style="text-align:center">OPTIONS</td>
<td style="text-align:center">TRACE</td>
</tr>
<tr>
</tbody>
</table>

**success 返回参数说明**

<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">Object/String/ArrayBuffer</td>
<td style="text-align:left">开发者服务器返回的数据</td>
</tr>
<tr>
<td style="text-align:left">statusCode</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">开发者服务器返回的 HTTP 状态码</td>
</tr>
<tr>
<td style="text-align:left">header</td>
<td style="text-align:left">Object</td>
<td style="text-align:left">开发者服务器返回的 HTTP Response Header</td>
</tr>
</tbody>
</table>

## jsa.uploadFile(OBJECT)

将本地资源上传到开发者服务器，客户端发起一个 POST 请求，其中 `content-type` 为 `multipart/form-data`。

如页面通过 `jsa.chooseImage` 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。

**OBJECT 参数说明**

<table>
<thead>
<tr>
<th style="text-align:left">参数名</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">必填</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">url</td>
<td style="text-align:left">String</td>
<td style="text-align:left">是</td>
<td style="text-align:left">开发者服务器 url</td>
</tr>
<tr>
<td style="text-align:left">filePath</td>
<td style="text-align:left">String</td>
<td style="text-align:left">是</td>
<td style="text-align:left">要上传文件资源的路径。</td>
</tr>
<tr>
<td style="text-align:left">name</td>
<td style="text-align:left">String</td>
<td style="text-align:left">是</td>
<td style="text-align:left">文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容</td>
</tr>
<tr>
<td style="text-align:left">header</td>
<td style="text-align:left">Object</td>
<td style="text-align:left">否</td>
<td style="text-align:left">HTTP 请求 Header, header 中不能设置 Referer。</td>
</tr>
<tr>
<td style="text-align:left">formData</td>
<td style="text-align:left">Object</td>
<td style="text-align:left">否</td>
<td style="text-align:left">HTTP 请求中其他额外的 form data</td>
</tr>
<tr>
<td style="text-align:left">success</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用成功的回调函数</td>
</tr>
<tr>
<td style="text-align:left">fail</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用失败的回调函数</td>
</tr>
<tr>
<td style="text-align:left">complete</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用结束的回调函数（调用成功、失败都会执行）</td>
</tr>
</tbody>
</table>

**Tip:**
- 如果 `name` 不填或填的值相同，可能导致服务端读取文件时只能读取到一个文件。

**success 返回参数说明**
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">String</td>
<td style="text-align:left">开发者服务器返回的数据</td>
</tr>
<tr>
<td style="text-align:left">statusCode</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">开发者服务器返回的 HTTP 状态码</td>
</tr>
</tbody>
</table>

**返回值**
如果希望返回一个 `uploadTask` 对象，需要至少传入 `success / fail / complete` 参数中的一个。例如：

```javascript
var uploadTask = jsa.uploadFile({
    url: 'https://www.example.com/upload', //仅为示例，并非真实接口地址。
    complete: ()=> {}
});
uploadTask.abort();
```

如果没有传入 `success / fail / complete` 参数，则会返回封装后的 `Promise` 对象

通过 `uploadTask`，可监听上传进度变化事件，以及取消上传任务。

**uploadTask 对象的方法列表**

<table>
<thead>
<tr>
<th style="text-align:left">方法</th>
<th style="text-align:left">参数</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">abort</td>
<td style="text-align:left"></td>
<td style="text-align:left">中断上传任务</td>
</tr>
<tr>
<td style="text-align:left">onProgressUpdate</td>
<td style="text-align:left">callback</td>
<td style="text-align:left">监听上传进度变化</td>
</tr>
</tbody>
</table>

**onProgressUpdate 返回参数说明**

<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">progress</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">上传进度百分比</td>
</tr>
<tr>
<td style="text-align:left">totalBytesSent</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">已经上传的数据长度，单位 Bytes</td>
</tr>
<tr>
<td style="text-align:left">totalBytesExpectedToSend</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">预期需要上传的数据总长度，单位 Bytes</td>
</tr>
</tbody>
</table>

**示例**

```javascript
jsa.chooseImage({
    success: (chooseImageRes) => {
        const tempFilePaths = chooseImageRes.tempFilePaths;
        const uploadTask = jsa.uploadFile({
            url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
                'user': 'test'
            },
            success: (uploadFileRes) => {
                console.log(uploadFileRes.data);
            }
        });

        uploadTask.onProgressUpdate((res) => {
            console.log('上传进度' + res.progress);
            console.log('已经上传的数据长度' + res.totalBytesSent);
            console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

            // 测试条件，取消上传任务。
            if (res.progress > 50) {
                uploadTask.abort();
            }
        });
    }
});
```

## jsa.connectSocket(OBJECT)

创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 连接。

**OBJECT 参数说明**

<table>
<thead>
<tr>
<th style="text-align:left">参数名</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">必填</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">url</td>
<td style="text-align:left">String</td>
<td style="text-align:left">是</td>
<td style="text-align:left">服务器接口地址</td>
</tr>
<tr>
<td style="text-align:left">protocols</td>
<td style="text-align:left">Array&lt;String&gt;</td>
<td style="text-align:left">否</td>
<td style="text-align:left">子协议数组</td>
</tr>
<tr>
<td style="text-align:left">success</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用成功的回调函数</td>
</tr>
<tr>
<td style="text-align:left">fail</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用失败的回调函数</td>
</tr>
<tr>
<td style="text-align:left">complete</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用结束的回调函数（调用成功、失败都会执行）</td>
</tr>
</tbody>
</table>

**示例代码**

```javascript

jsa.connectSocket({
    url: 'wss://www.example.com/socket',
    data() {
        return {
            x: '',
            y: ''
        };
    },
    header: {
        'content-type': 'application/json'
    },
    protocols: ['protocol1'],
    method: 'GET'
});

```

**返回值**

如果希望返回一个 `socketTask` 对象，需要至少传入 `success / fail / complete` 参数中的一个。例如：

```javascript

var socketTask = jsa.connectSocket({
    url: 'wss://www.example.com/socket', //仅为示例，并非真实接口地址。
    complete: ()=> {}
});

```

如果没有传入 `success / fail / complete` 参数，则会返回封装后的 `Promise` 对象

## jsa.onSocketOpen(CALLBACK)

监听WebSocket连接打开事件。

**CALLBACK 返回参数**

<table>
<thead>
<tr>
<th style="text-align:left">属性</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">header</td>
<td style="text-align:left">Object</td>
<td style="text-align:left">连接成功的 HTTP 响应 Header</td>
</tr>
</tbody>
</table>

**示例代码：**

```javascript

jsa.connectSocket({
  url: 'wss://www.example.com/socket'
});
jsa.onSocketOpen(function (res) {
  console.log('WebSocket连接已打开！');
});

```

## jsa.onSocketError(CALLBACK)

监听WebSocket错误。

**示例代码**

```javascript

jsa.connectSocket({
  url: 'wss://www.example.com/socket'
});
jsa.onSocketOpen(function (res) {
  console.log('WebSocket连接已打开！');
});
jsa.onSocketError(function (res) {
  console.log('WebSocket连接打开失败，请检查！');
});

```

## jsa.sendSocketMessage(OBJECT)

通过 WebSocket 连接发送数据，需要先 jsa.connectSocket，并在 jsa.onSocketOpen 回调之后才能发送。

**OBJECT 参数说明：**

<table>
<thead>
<tr>
<th style="text-align:left">参数名</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">必填</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">String/ArrayBuffer</td>
<td style="text-align:left">是</td>
<td style="text-align:left">需要发送的内容</td>
</tr>
<tr>
<td style="text-align:left">success</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用成功的回调函数</td>
</tr>
<tr>
<td style="text-align:left">fail</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用失败的回调函数</td>
</tr>
<tr>
<td style="text-align:left">complete</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用结束的回调函数（调用成功、失败都会执行）</td>
</tr>
</tbody>
</table>

**示例代码**

```javascript

var socketOpen = false;
var socketMsgQueue = [];

jsa.connectSocket({
  url: 'wss://www.example.com/socket'
});

jsa.onSocketOpen(function (res) {
  socketOpen = true;
  for (var i = 0; i < socketMsgQueue.length; i++) {
    sendSocketMessage(socketMsgQueue[i]);
  }
  socketMsgQueue = [];
});

function sendSocketMessage(msg) {
  if (socketOpen) {
    jsa.sendSocketMessage({
      data: msg
    });
  } else {
    socketMsgQueue.push(msg);
  }
}

```

## jsa.onSocketMessage(CALLBACK)

监听WebSocket接受到服务器的消息事件。

**CALLBACK 返回参数**

<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">String/ArrayBuffer</td>
<td style="text-align:left">服务器返回的消息</td>
</tr>
</tbody>
</table>

**示例代码：**

```javascript

jsa.connectSocket({
  url: 'wss://www.example.com/socket'
});

jsa.onSocketMessage(function (res) {
  console.log('收到服务器内容：' + res.data);
});

```

## jsa.closeSocket(OBJECT)

关闭 WebSocket 连接。

**OBJECT 参数说明**

<table>
<thead>
<tr>
<th style="text-align:left">参数名</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">必填</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">code</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">否</td>
<td style="text-align:left">一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）</td>
</tr>
<tr>
<td style="text-align:left">reason</td>
<td style="text-align:left">String</td>
<td style="text-align:left">否</td>
<td style="text-align:left">一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）</td>
</tr>
<tr>
<td style="text-align:left">success</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用成功的回调函数</td>
</tr>
<tr>
<td style="text-align:left">fail</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用失败的回调函数</td>
</tr>
<tr>
<td style="text-align:left">complete</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用结束的回调函数（调用成功、失败都会执行）</td>
</tr>
</tbody>
</table>

## jsa.onSocketClose(CALLBACK)

监听WebSocket关闭。

```javascript

jsa.connectSocket({
  url: 'wss://www.example.com/socket'
});

// 注意这里有时序问题，
// 如果 jsa.connectSocket 还没回调 jsa.onSocketOpen，而先调用 jsa.closeSocket，那么就做不到关闭 WebSocket 的目的。
// 必须在 WebSocket 打开期间调用 jsa.closeSocket 才能关闭。
jsa.onSocketOpen(function () {
  jsa.closeSocket();
});

jsa.onSocketClose(function (res) {
  console.log('WebSocket 已关闭！');
});

```

**SocketTask**

### SocketTask.onMessage(CALLBACK)

监听 WebSocket 接受到服务器的消息事件

**回调函数**

`Function`

WebSocket 接受到服务器的消息事件的回调函数

**回调函数中的参数**

`Object`

<table>
<thead>
<tr>
<th style="text-align:left">属性</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">String/ArrayBuffer</td>
<td style="text-align:left">服务器返回的消息</td>
</tr>
</tbody>
</table>

### SocketTask.send(OBJECT)

通过 WebSocket 连接发送数据

**参数**

<table>
<thead>
<tr>
<th style="text-align:left">属性</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">是否必填</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">String/ArrayBuffer</td>
<td style="text-align:left">是</td>
<td style="text-align:left">需要发送的内容</td>
</tr>
<tr>
<td style="text-align:left">success</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用成功的回调函数</td>
</tr>
<tr>
<td style="text-align:left">fail</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用失败的回调函数</td>
</tr>
<tr>
<td style="text-align:left">complete</td>
<td style="text-align:left">Function</td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用结束的回调函数（调用成功、失败都会执行）</td>
</tr>
</tbody>
</table>

### SocketTask.close(OBJECT)

关闭 WebSocket 连接

**参数**

<table>
<thead>
<tr>
<th style="text-align:left">属性</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">默认值</th>
<th style="text-align:left">是否必填</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">code</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">1000（表示正常关闭连接）</td>
<td style="text-align:left">否</td>
<td style="text-align:left">一个数字值表示关闭连接的状态号，表示连接被关闭的原因。</td>
</tr>
<tr>
<td style="text-align:left">reason</td>
<td style="text-align:left">String</td>
<td style="text-align:left"></td>
<td style="text-align:left">否</td>
<td style="text-align:left">一个可读的字符串，表示连接被关闭的原因。</td>
</tr>
<tr>
<td style="text-align:left">success</td>
<td style="text-align:left">Function</td>
<td style="text-align:left"></td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用成功的回调函数</td>
</tr>
<tr>
<td style="text-align:left">fail</td>
<td style="text-align:left">Function</td>
<td style="text-align:left"></td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用失败的回调函数</td>
</tr>
<tr>
<td style="text-align:left">complete</td>
<td style="text-align:left">Function</td>
<td style="text-align:left"></td>
<td style="text-align:left">否</td>
<td style="text-align:left">接口调用结束的回调函数（调用成功、失败都会执行）</td>
</tr>
</tbody>
</table>

### SocketTask.onOpen(CALLBACK)

监听 WebSocket 连接打开事件

**回调函数**

`Function`

WebSocket 连接打开事件的回调函数

**回调函数中的参数**

`Object`

<table>
<thead>
<tr>
<th style="text-align:left">属性</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">data</td>
<td style="text-align:left">String/ArrayBuffer</td>
<td style="text-align:left">服务器返回的消息</td>
</tr>
</tbody>
</table>

### SocketTask.onClose(CALLBACK)

监听 WebSocket 连接关闭事件

**回调函数**

`Function`

WebSocket 连接关闭事件的回调函数

### SocketTask.onError(CALLBACK)

监听 WebSocket 错误事件

**回调函数**

`Function`

WebSocket 错误事件的回调函数

**回调函数中的参数**

`Object`

<table>
<thead>
<tr>
<th style="text-align:left">属性</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">errMsg</td>
<td style="text-align:left">String</td>
<td style="text-align:left">错误信息</td>
</tr>
</tbody>
</table>