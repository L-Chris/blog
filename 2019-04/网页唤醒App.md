# 网页唤醒App方案

## 方案

目前统一通过集成MobLink Web Sdk完成

## 使用方法

```
// 集成web sdk，appkey见下表
<script type="text/javascript" src="//f.moblink.mob.com/3.0.1/moblink.js?appkey=4e6d124ab07c">    </script>

// html
<a id="download_down" class="link">查看我的孩子</a>

// js调用moblink
MobLink({
	el: '#download_down"',
	path: '/situation/transcript',
	params: {}
})
```

参数说明：

| 参数 | 类型 | 含义 |
| ------------ | ------------ | ------------ |
| el | String | 触发行为的元素class或id |
| path | String | 跳转所在的功能模块，由Native端决定 |
| params | Object | 跟业务有关的键值对对象，供本地使用 |

## 应用Appkey

应用跳转配置在开发者后台配置
- [MobLink开发者后台](http://dashboard.mob.com)
