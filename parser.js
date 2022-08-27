// 所有代码最后一行不要加分号；自己抽离的函数放在小爱课程表提供的函数内，见 https://open-schedule-prod.ai.xiaomi.com/docs/#/help/?id=%e4%bb%a3%e7%a0%81%e4%bb%8b%e7%bb%8d

function scheduleHtmlParser(html) {
    const schedule = [];
    function addCourseByDay(day, data) {
        console.log('addCourse 被调用：', day, data);
        for (let item of schedule) {
            /*
                课程表中已有当前课程
                这里认为：day、name、teacher、position 相同的课程为一门课程
                实际上，如果不采用解析 HTML 的方式而是解析 API 返回数据的话，就可以更精确
            */
            if (item.day === day && item.name === data.name && item.teacher === data.teacher && item.position === data.position) {
                item.weeks = unique(item.weeks.concat(parseWeeksStr(data.weeksStr)));
                item.sections = unique(item.sections.concat(parseSectionsStr(data.sectionsStr)));
                schedule[schedule.indexOf(item)] = item;
                return;
            }
        }
        // 课程表中没有当前课程
        schedule.push({
            name: data.name,
            position: data.position,
            teacher: data.teacher,
            weeks: parseWeeksStr(data.weeksStr),
            day: day,
            sections: parseSectionsStr(data.sectionsStr),
        });
    }
    // 涵盖“第9周”“9-15周”“9-15双周”“9-15单周”“1-7,9-15周”的解析。拿采卓19-1班 2020-2021学年第二学期课程表测试
    function parseWeeksStr(weeksStr) {
        console.log('parseWeeksStr 被调用：' + weeksStr);
        const final = [];
        const weeksSplAry = weeksStr.split(',');
        for (const item of weeksSplAry) {
            const weeksStrTmp = item.replace('第', '').replace('周', '').replace('节', '');
            if (weeksStrTmp.indexOf('-') !== -1) {
                const weeksStrAry = weeksStrTmp.split('-'); // 以 - 为分隔符。
                const begin = Number(weeksStrAry[0]);
                const end = Number(weeksStrAry[1].replace('单周', '').replace('双周', ''));
                if (begin > 0 && end > begin) {
                    for (let i = begin; i <= end; i++) {
                        if ((weeksStrAry[1].indexOf('单周') !== -1 && i % 2 === 0) || (weeksStrAry[1].indexOf('双周') !== -1 && i % 2 !== 0)) { // 课程单周上但是当前循环在双周或课程双周上但是当前循环在单周
                            continue;
                        }
                        final.push(i);
                    }
                }
            }
            else {
                final.push(Number(weeksStrTmp));
            }
        }
        return final;
    }
    function parseSectionsStr(sectionsStr) {
        console.log('parseSectionsStr 被调用：' + sectionsStr);
        return parseWeeksStr(sectionsStr);
    }
    // 数组去重
    function unique(arr) {
        return Array.from(new Set(arr));
    }
    // 以下是 HTML 解析代码
    const posReg = /(科?[WE]?[NS]?[0-9]{3,4}(（高层）)?)|(操场\d+)/;
    const courses = $('.class_div');
    courses.each((key, course) => {
        console.log('正在解析：', course);
        const day = Number($(course).parent().attr('id').charAt(0));
        const data = {};
        data.name = $($(course).children()[0]).text().split('_')[0]; // 去除无用且占空间的内容
        data.teacher = $($(course).children()[1]).text().replace(' ', '').replace(' ', ''); // 有时候老师名字里有俩空格，占空间
        data.weeksStr = $($(course).children()[2]).text();
        data.sectionsStr = $($(course).children()[3]).text();
        const posTmp = $($(course).children()[4]).text();
        data.position = posReg.test(posTmp) ? posReg.exec(posTmp)[0] : posTmp; // 尽可能精简位置信息，避免占用过多空间
        addCourseByDay(day, data);
    });
    return schedule;
}
