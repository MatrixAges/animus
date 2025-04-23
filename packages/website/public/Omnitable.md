# Omnitable

## 上下文

> 你是一位资深全栈工程师，擅长用户体验优化、前端架构设计和从零到一闭环构建产品，现在你需要设计一个表格组件

> 具体要求如下：
> 假设 Ticket 系统已存在，请临摹 Linear 的任务管理前端设计，包含任务查询、过滤、搜索，任务更新（创建、修改、删除），以及任务属性的选择。（假设后端逻辑已存在，其相关数据 / 请求均可 Mock）
>  - 该项目在应用上心智负担低，配置简单
>  - 该项目可独立作为组件，Nextjs 应用友好
>  - 该组件设计也可用于日志系统，支持大量数据渲染与实时更新
>  - 该组件设计也可用于数据分析系统，支持数据格式化、基础统计（SUM / AVG / COUNT 等）
>  - 可基于 [shadcn-table](https://github.com/sadmann7/shadcn-table) / [data-table-filters](https://github.com/openstatusHQ/data-table-filters) 二次开发，也可自行选择合理方案

> 该组件应该达到企业级开源产品的水平，所以请按照一个企业级产品的标准来实现它。优先考虑使用开源的库进行开发（提升开发效率，降低产品认知成本）。

> 支持调用的资源：cloudflare d1（可用于数据模拟）

## 思维链

### 用户需求分析

用户的需求是要实现一个表格组件，用于渲染日志或进行数据分析，支持对记录进行查询、筛选和编辑，同时要支持对接日志系统和数据分析系统。

该组件的功能主要分为输入和数据展示两种形态：

- 输入对应的是工单管理，用户基于此表格进行工单的增删改查
- 数据展示对应的事日志管理和数据分析

用户要求该组件要达到企业级开源产品的水平，那么就应该按照商业产品的标准来实现该组件。

首先为组件取个名字，该组件需要适配多种场景，故命名为`Omnitable`（万能表格），`Omit`一词借鉴英伟达的`Omniverse`（全能的GPU渲染平台）。

用户提到可以基于`shadcn-table`或者`data-table-filters`进行二次开发，查询和研究上述两个开源项目的产品形态...

发现`shadcn-table`能够满足工单管理和数据分析的需求，而`data-table-filters`既能够满足日志管理的需求，也能满足工单管理和数据分析的需求，不过用户要求“请临摹 Linear 的任务管理前端设计”，查询和研究`Linear`的产品形态...

发现 `Linear` 的筛选样式和模式与`data-table-filters`有差别，`shadcn-table`的筛选样式和模式更符合这个描述，经过思考和衡量工作量...

选择基于`shadcn-table`进行二次开发，提供两种模式：table和log，考虑`shadcn-table`和`data-table-filters`最大的差异在于`data-table-filters`有美观的log表格样式，所以到用户可能要的是`data-table-filters`log模式下的样式，那么log模式应该借鉴`data-table-filters`的样式。

### 数据结构设计

接下来针对业务进行建模，设计出对应的数据结构。

现在已经知道了组件需要两种模式，那么`PropsOmnitable`为：

```ts
interface PropsOmnitable{
      mode:'table'|'log'
}
```

接下里开始考虑 table mode 下的业务建模...

用户需要基于 table mode 实现工单的管理和数据分析，这两种模式存在一个区别，工单管理涉及到了数据的IO，而数据分析只有数据的Input，先考虑工单管理的情况...

工单管理需要支持工单的创建、编辑和删除，以及查询和过滤，那么需要分别为这些功能提供可配置的接口，`PropsOmnitable`变更为

```ts

interface TableMode{
      mode:'table'
      api:{
            create:string
            delete:string
            update:string
            query:string
      }
}

interface LogMode{
      mode:'log'
      api:{
            query:string
      }
}

interface Common{
      // common config
}

type PropsOmnitable = TableMode&Common | LogMode&TableMode
```

接下来对表格字段进行数据建模...

用户提到需要对数据字段进行排序，那么什么样的字段支持排序是需要用户指定的（用户为提到特殊的数据类型，根据上述两个开源库支持的字段排序的例子，都为number类型，那么默认需要排序和进行数据归并的字段为number类型）：

```ts
interface Field{
      // status 用来标记logMode下哪个字段为status
      type:'string'|'number'|'date'|'status'
      // 是否开启排序
      sort?:boolean
      // 需要进行select的字段
      options?:Array<{label:string;value:string}|string>
      // YYYY-DD-MM date类型字段显示格式
      format?:string
}

interface Common{
     fields:Record<string,Field>
}
```

用户需要`Linear`那种模式的筛选，应该支持对Filter进行配置：

```ts
interface Common{
    filter: Array<string>
}
```

接下来考虑 logMode 的定义...

logMode用于日志的展示和筛选，除了不支持数据的变更，在操作逻辑上与tableMode是相似的，不过存在以下独有的点：

- 支持定时刷新和手动刷新
- status

完整的类型定义为：

```ts
interface TableMode{
      mode:'table'
      api:{
            create:string
            delete:string
            update:string
            query:string
      }
}

interface LogMode{
      mode:'log'
      api:{
            query:string
      }
      // 是否开启定时刷新，单位为秒
      live?:number
}

interface Field{
      // status 用来标记logMode下哪个字段为status
      type:'string'|'number'|'date'|'status'
      // 是否开启排序
      sort?:boolean
      // 需要进行select的字段
      options?:Array<{label:string;value:string}|string>
      // YYYY-DD-MM date类型字段显示格式
      format?:string
}

interface Common{
     fields:Record<string,Field>
}

type PropsOmnitable = TableMode&Common | LogMode&TableMode
```

应该提供一个在线配置的编辑器，用来编辑配置，编辑完成之后使用zod对配置字段进行校验。

经过研究和调试之后发现，基于曾经编写的FormTable更容易实现高性能的，可直接在row上编辑的Omnitable。

