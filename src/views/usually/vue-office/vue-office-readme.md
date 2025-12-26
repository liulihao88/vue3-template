> ## 问题原因
>
> vue-office在安装时，有一个postinstall脚本，里面做的事情有一步是根据当前项目中的vue版本生成最终使用的lib/index.js文件（在[@vue-office](https://github.com/vue-office)中依赖的package.json中配置的main字段，引入的默认入口）。
>
> 在pnpm v10中，有一个[重大变化（官方称Major Changes）](https://github.com/pnpm/pnpm/releases/tag/v10.0.0)是：
>
> - 原文：Lifecycle scripts of dependencies are not executed during installation by default!
> - 译文：默认情况下，安装过程中不会执行依赖项的生命周期脚本！
>
> 所以使用pnpm v10安装依赖时，不会默认执行vue-office的postinstall脚本，所以就没有生成lib/index.js文件，然后就报出了图上的Failed to resolve entry的问题。
>
> ## 解决方式
>
> 1. 使用pnpm v9安装。
> 2. pnpm v10中，执行pnpm approve-builds命令（指定哪些包允许执行postinstall命令），选择vue-office相关的包（可能docx、excel需要分开选择），然后enter确认。执行后就可以正常导入了。 `推荐`
> 3. import VueOfficeExcel from '@vue-office/excel/lib/v3/vue-office-excel.mjs'
