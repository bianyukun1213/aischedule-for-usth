# 黑龙江科技大学小爱课程表导入方案

GitHub 仓库：[https://github.com/bianyukun1213/ai-schedule-for-usth](https://github.com/bianyukun1213/ai-schedule-for-usth)

Gitee 仓库：[https://gitee.com/bianyukun1213/ai-schedule-for-usth](https://gitee.com/bianyukun1213/ai-schedule-for-usth)

&emsp;&emsp;Gitee 仓库仅存放帮助文档，如需提交 Issue、Pull Request 等，请使用 GitHub。

## 帮助文档

&emsp;&emsp;如有无法解决的问题，请联系 `bianyukun1213@outlook.com`。

### 使用

&emsp;&emsp;该课程表导入方案有两种解析课程表的方案：“解析页面 HTML”和“解析接口 JSON”。通常情况下选择前者即可，这种方案操作起来更加直观、方便。新学期刚开始时，课程表通常还没有正式发布，在教务系统中找不到新学期的课程表，在这种情况下，可以选择后者，手动输入学年学期，尝试导入。

&emsp;&emsp;无论采取哪种方案，首先都需要登录教务系统并定向至 `首页>教学资源>教学资源>班级课表` 页面，筛选出你所在班级的课程表，并点击 `查询` 按钮。

---

解析页面 HTML：

&emsp;&emsp;点击对应课程表的 `查看` 按钮，然后点击 `一键导入` 按钮，选择 `1. 解析页面 HTML` 并确认，最后选择教学作息时间并确认。

---

解析接口 JSON：

&emsp;&emsp;在这种方案中，教务系统的“学年学期”选项选择哪个都无所谓（因为我们要用自己的参数覆盖它），只要能筛选出你所在班级的课程表即可。

&emsp;&emsp;筛选出你所在班级的课程表后，点击 `一键导入` 按钮，选择 `2. 解析接口 JSON` 并确认，输入学年学期——格式是 `年份-年份-学期`，其中学期使用数字表示，`1` 代表第一学期，`2` 代表第二学期，例如 `2022-2023-2` 代表“2022-2023 学年第二学期”——确认后稍加等待（此时方案在调用接口请求 JSON 数据），最后选择教学作息时间并确认。

---

&emsp;&emsp;你的课程表应该已经导入完成。如果没有成功，先查看 `已知问题` 和 `疑问解答` 是否提供了问题描述。

### 已知问题

- “解析接口 JSON”的解析方案中，输入错误学年或对应课程表还没有编排时可能查询不到数据导致导入失败；
- “解析接口 JSON”的解析方案中，长时间不操作导致登陆状态过期，接口调用发生错误，重新登录导入即可；
- 在新学期课程表正式发布前，新生无法使用本方案导入课程表（即使采取“解析接口 JSON”的解析方案），因为没有过往课程表，无法获知调用接口所需的参数“班级号”；
- 教学作息时间只能选择其中一种，无法具体地根据上课地点灵活安排。小爱课程表只能为每个课表设置统一的教学作息时间，这是接口限制；
- 课程冲突，这属于教务系统排课问题，小爱课程表及本方案不负责解决课程冲突问题；
- 提示框、输入框、选择框等把页面样式弄坏，这是小爱课程表工具集（为保证兼容不得不用）导致的问题，实测不影响使用；
- 登录后页面导航显示为 `首页>教学资源>教学资源>班级课表`，但实际并不是 `班级课表` 页面，实测不影响使用；
- 无法导入课程表且无任何错误信息或提示，我也不知道是什么原因，可尝试先导入其他课程表，然后再导入出问题的课程表并覆盖，可能会成功。我向小爱课程表的官方人员反映过这个问题，他们后来没再回复，此 bug 可能已经修复；
- 遇到其他无法解决的问题可发邮件给我，地址在页面上方。最好附带班级、学期及 vConsole 输出结果等信息。

### 疑问解答

- 使用该方案登录教务系统并导入课程表，安全吗？

  是否安全取决于你的操作环境。我只能保证本方案不会以任何形式收集个人信息，代码公开且经过小爱课程表的官方人员审核。

- 本方案会持续维护吗？

  会维护至我（2020 级）毕业。后续更新需要有人接力，Fork 或提交 Pull Request 等。

- 有开发适用于其他品牌手机或 App 的课程表导入方案的计划吗？

  暂时没有。
