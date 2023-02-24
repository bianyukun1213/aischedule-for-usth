// 所有代码最后一行不要加分号；自己抽离的函数放在小爱课程表提供的函数内，见 https://open-schedule-prod.ai.xiaomi.com/docs/#/help/?id=%e4%bb%a3%e7%a0%81%e4%bb%8b%e7%bb%8d

async function scheduleTimer({ providerRes, parserRes } = {}) {
    await loadTool('AIScheduleTools');
    // A 版本：教学主楼，B 版本：科技大厦，C 版本：科技大厦（大一）
    // 2023/2/24 更新：没有 C 版本了，但先不删，把选项去掉即可
    const sections = {
        versionA: [{
            section: 1,
            startTime: '08:30',
            endTime: '09:15',
        },
        {
            section: 2,
            startTime: '09:20',
            endTime: '10:05',
        },
        {
            section: 3,
            startTime: '10:35',
            endTime: '11:20',
        },
        {
            section: 4,
            startTime: '11:25',
            endTime: '12:10',
        },
        {
            section: 5,
            startTime: '13:30',
            endTime: '14:15',
        },
        {
            section: 6,
            startTime: '14:20',
            endTime: '15:05',
        },
        {
            section: 7,
            startTime: '15:30',
            endTime: '16:15',
        },
        {
            section: 8,
            startTime: '16:20',
            endTime: '17:05',
        },
        {
            section: 9,
            startTime: '18:30',
            endTime: '19:15',
        },
        {
            section: 10,
            startTime: '19:20',
            endTime: '20:05',
        }],
        versionB: [{
            section: 1,
            startTime: '08:30',
            endTime: '09:15',
        },
        {
            section: 2,
            startTime: '09:20',
            endTime: '10:05',
        },
        {
            section: 3,
            startTime: '10:25',
            endTime: '11:10',
        },
        {
            section: 4,
            startTime: '11:15',
            endTime: '12:00',
        },
        {
            section: 5,
            startTime: '13:30',
            endTime: '14:15',
        },
        {
            section: 6,
            startTime: '14:20',
            endTime: '15:05',
        },
        {
            section: 7,
            startTime: '15:30',
            endTime: '16:15',
        },
        {
            section: 8,
            startTime: '16:20',
            endTime: '17:05',
        },
        {
            section: 9,
            startTime: '18:30',
            endTime: '19:15',
        },
        {
            section: 10,
            startTime: '19:20',
            endTime: '20:05',
        }],
        versionC: [{
            section: 1,
            startTime: '08:20',
            endTime: '09:00',
        },
        {
            section: 2,
            startTime: '09:05',
            endTime: '09:45',
        },
        {
            section: 3,
            startTime: '10:05',
            endTime: '10:45',
        },
        {
            section: 4,
            startTime: '10:50',
            endTime: '11:30',
        },
        {
            section: 5,
            startTime: '13:30',
            endTime: '14:10',
        },
        {
            section: 6,
            startTime: '14:15',
            endTime: '14:55',
        },
        {
            section: 7,
            startTime: '15:10',
            endTime: '15:50',
        },
        {
            section: 8,
            startTime: '15:55',
            endTime: '16:35',
        },
        {
            section: 9,
            startTime: '18:30',
            endTime: '19:10',
        },
        {
            section: 10,
            startTime: '19:15',
            endTime: '19:55',
        }]
    };
    let table = '节次\t教学主楼\t科技大厦\n';
    for (let index = 0; index < 10; index++) {
        const aStartTime = sections.versionA[index].startTime;
        const aEndTime = sections.versionA[index].endTime;
        const bStartTime = sections.versionB[index].startTime;
        const bEndTime = sections.versionB[index].endTime;
        table += `${index + 1}\t${aStartTime}-${aEndTime}\t${bStartTime}-${bEndTime}\n`;
    }
    const userSelect = await AIScheduleSelect({
        titleText: '选择教学作息时间',
        contentText: `学校的教学作息时间比较灵活，受接口限制无法具体到每节课设置，只能统一设置，选择最接近的即可。\n${table}`,
        selectList: [
            '教学主楼',
            '科技大厦' //,
            // '科技大厦（大一）' 现在没有 C 版本了
        ]
    });
    let currentSections = {};
    switch (userSelect) {
        case '教学主楼':
            currentSections = sections.versionA;
            break;
        case '科技大厦':
            currentSections = sections.versionB;
            break;
        case '科技大厦（大一）':
            currentSections = sections.versionC;
            break;
    }
    return {
        totalWeek: 20,
        startSemester: '',
        startWithSunday: false,
        showWeekend: false,
        forenoon: 4,
        afternoon: 4,
        night: 2,
        sections: currentSections
    };
}
