// 所有代码最后一行不要加分号；自己抽离的函数放在小爱课程表提供的函数内，见 https://open-schedule-prod.ai.xiaomi.com/docs/#/help/?id=%e4%bb%a3%e7%a0%81%e4%bb%8b%e7%bb%8d

async function scheduleHtmlProvider() {
    await loadTool('AIScheduleTools');
    const pageUrl = window.location.href;
    if (pageUrl.indexOf('student/teachingResources/classCurriculum/index') === -1) {
        await AIScheduleAlert('请定向至“首页>教学资源>教学资源>班级课表”页面。');
        return 'do not continue';
    }
    const userSelection = await AIScheduleSelect({
        titleText: '选择解析方案',
        contentText: '新学期刚开始时，课程表通常还没有正式发布，你可能找不到新学期的课程表。如果是这种情况，请选择 2 号方案以尝试从接口导入课程表。正常情况请选择 1 号方案。',
        selectList: [
            '1. 解析页面 HTML',
            '2. 解析接口 JSON',
            '取消'
        ]
    });
    if (userSelection === '1. 解析页面 HTML') {
        /*
            检查 mycoursetable 子节点个数，判断是否可获取课程表
            这个方法不一定可靠，也许 mycoursetable 中没有课程，但在 other-course 里有额外课程
            我所在的班级在 other-course 里没有额外课程，所以无法测试
        */
        const myCourseTableDiv = document.getElementById('mycoursetable');
        if (myCourseTableDiv.childNodes.length === 0) {
            await AIScheduleAlert('无法找到当前课程表，请在查询后点击“查看”按钮。');
            return 'do not continue';
        }
        const tmpNode = document.createElement('div');
        const printDiv = document.getElementById('print_div');
        tmpNode.appendChild(printDiv.cloneNode(true));
        return 'HTML|' + tmpNode.innerHTML;
    } else if (userSelection === '2. 解析接口 JSON') {
        const classNumEle = document.getElementById('classNum');
        const classIndex = classNumEle.selectedIndex;
        const className = classNumEle.options[classIndex].text;
        console.log(`选择班级：${className}`);
        if (className === '全部') {
            await AIScheduleAlert('请选择你的班级。');
            return 'do not continue';
        }
        const tBodyEle = document.getElementById('Bjkbtbody'); // 班级课表 tBody
        let classNum = -1;
        if (tBodyEle.rows.length < 1) {
            await AIScheduleAlert('无法找到班级号，请先点击“查询”按钮以查询你所在班级的课程表。如果你是新生且确认操作无误，请等待课程表正式发布。');
            return 'do not continue';
        } else {
            const firstClassName = tBodyEle.rows[0].cells[3].innerHTML;
            if (firstClassName !== className) {
                await AIScheduleAlert('首行班级不匹配，请先点击“查询”按钮以查询你所在班级的课程表。');
                return 'do not continue';
            } else {
                classNum = tBodyEle.rows[0].cells[2].innerHTML;
                console.log(`班级号：${classNum}`);
            }
        }
        let planCode = await AISchedulePrompt({
            titleText: '输入学年学期',
            tipText: '2022-2023-1 代表 2022-2023 学年第一学期，2022-2023-2 代表 2022-2023 学年第二学期，以此类推。输入错误学年或对应课程表还没有编排时可能查询不到数据导致导入失败。',
            defaultText: '',
            validator: value => {
                let valid = /^20[0-9][0-9]-20[0-9][0-9]-[1,2]$/.test(value);
                if (valid) {
                    const firstYear = value.split('-')[0];
                    const secondYear = value.split('-')[1];
                    valid = (secondYear - firstYear == 1) ? true : false;
                }
                if (!valid) {
                    return '输入无效。';
                }
                return false; // 返回 false 表示输入有效
            }
        });
        planCode += '-1';
        console.log(`学年学期：${planCode}`);
        try {
            const res = await fetch(`http://${window.location.host}/student/teachingResources/classCurriculum/searchCurriculumInfo/callback?planCode=${planCode}&classCode=${classNum}`);
            const jsonData = await res.json();
            console.log('请求到接口数据：', jsonData);
            return 'JSON|' + JSON.stringify(jsonData);
        } catch (error) {
            console.error('接口数据请求错误：', error.message);
            await AIScheduleAlert(`接口数据请求错误：${error.message}`);
            return 'do not continue';
        }
    } else {
        return 'do not continue';
    }
}
