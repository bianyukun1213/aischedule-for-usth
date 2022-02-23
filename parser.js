let schedule = [];

function addCourseByDay(day, data) {
    console.log('addCourse 被调用：', day, data)
    for (let item of schedule) {
        /*
            这里认为：day、name、teacher、position 相同的课程为一门课程。
            实际上，如果不采用解析 HTML 的方式而是解析 API 返回数据的话，就可以更精确。
        */
        if (item.day === day && item.name === data.name && item.teacher === data.teacher && item.position === data.position) {
            let tmp = item;
            tmp.weeks = unique(tmp.weeks.concat(parseWeeksStr(data.weeksStr)));
            tmp.sections = unique(tmp.sections.concat(parseSectionsStr(data.sectionsStr)));
            schedule[schedule.indexOf(item)] = tmp;
            return;
        }
    }
    schedule.push({
        name: data.name,
        position: data.position,
        teacher: data.teacher,
        weeks: parseWeeksStr(data.weeksStr),
        day: day,
        sections: parseSectionsStr(data.sectionsStr),
    });
}

// 这里没有考虑非连续周的情况，因为我还没见过非连续周在课程表里怎么写。
function parseWeeksStr(weeksStr) {
    console.log('parseWeeksStr 被调用：' + weeksStr);
    let final = [];
    weeksStr = weeksStr.replace('周', '').replace('节', '');
    if (weeksStr.indexOf('-') !== -1) {
        let weeksStrAry = weeksStr.split('-');
        let begin = Number(weeksStrAry[0]);
        let end = Number(weeksStrAry[1]);
        if (begin > 0 && end > begin) {
            for (let i = begin; i <= end; i++) {
                final.push(i);
            }
        }
    }
    else {
        final.push(Number(weeksStr));
    }
    return final;
}

function parseSectionsStr(sectionsStr) {
    return parseWeeksStr(sectionsStr);
}

// 数组去重。
function unique(arr) {
    return Array.from(new Set(arr));
}

function scheduleHtmlParser(html) {
    let courses = $('.class_div');
    courses.each(function (key, course) {
        let day = Number($(course).parent().attr('id').charAt(0));
        let data = {};
        data.name = $($(course).children()[0]).text();
        data.teacher = $($(course).children()[1]).text();
        data.weeksStr = $($(course).children()[2]).text();
        data.sectionsStr = $($(course).children()[3]).text();
        data.position = $($(course).children()[4]).text();
        addCourseByDay(day, data);
    });
    return schedule;
}
