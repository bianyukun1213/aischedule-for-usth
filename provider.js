async function scheduleHtmlProvider() {
    await loadTool('AIScheduleTools');
    let pageUrl = window.location.href;
    if (pageUrl.indexOf('student/teachingResources/classCurriculum/index') == -1) {
        await AIScheduleAlert('学校的课程表比较特殊，请定向至“首页>教学资源>教学资源>班级课表”页面。另外，这个提示框可能会把页面搞乱，但是为了保证兼容不得不用，定向至其他页面恢复正常。');
        return 'do not continue';
    }
    /*
        检查 mycoursetable 子节点个数，判断是否可获取课程表。
        这个方法不一定可靠，也许 mycoursetable 中没有课程，但在 other-course 里有额外课程。
        我所在的班级在 other-course 里没有额外课程，所以无法测试。
    */
    let myCourseTableDiv = document.getElementById('mycoursetable');
    if (myCourseTableDiv.childNodes.length === 0) {
        await AIScheduleAlert('无法找到当前课程表，请在查询后点击“查看”按钮。另外，这个提示框可能会把页面搞乱，但是为了保证兼容不得不用，定向至其他页面恢复正常。');
        return 'do not continue'
    }
    let tmpNode = document.createElement('div');
    let printDiv = document.getElementById('print_div');
    tmpNode.appendChild(printDiv.cloneNode(true));
    return tmpNode.innerHTML;
}
