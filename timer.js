// A 版本：教学主楼，B 版本：科技大厦（2018—2020 级），C 版本：科技大厦（2021 级）。
let sections = {
    versionA: [{
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
        startTime: '10:40',
        endTime: '11:20',
    },
    {
        section: 4,
        startTime: '11:25',
        endTime: '12:05',
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
        startTime: '15:30',
        endTime: '16:10',
    },
    {
        section: 8,
        startTime: '16:15',
        endTime: '16:55',
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
    }],
    versionB: [{
        section: 1,
        startTime: '08:30',
        endTime: '09:10',
    },
    {
        section: 2,
        startTime: '09:15',
        endTime: '09:55',
    },
    {
        section: 3,
        startTime: '10:25',
        endTime: '11:05',
    },
    {
        section: 4,
        startTime: '11:10',
        endTime: '11:50',
    },
    {
        section: 5,
        startTime: '13:40',
        endTime: '14:20',
    },
    {
        section: 6,
        startTime: '14:25',
        endTime: '15:05',
    },
    {
        section: 7,
        startTime: '15:20',
        endTime: '16:00',
    },
    {
        section: 8,
        startTime: '16:05',
        endTime: '16:45',
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
    }],
};

async function scheduleTimer({ providerRes, parserRes } = {}) {
    await loadTool('AIScheduleTools');
    const userSelect = await AIScheduleSelect({
        titleText: '选择教学作息时间',
        contentText: '学校的教学作息时间比较灵活，受接口限制无法具体到每节课，只能统一设置，选择最接近的即可。另外，这个提示框可能会把页面搞乱，但是为了保证兼容不得不用，反正到这步了也不影响。',
        selectList: [
            '教学主楼',
            '科技大厦（2018—2020 级）',
            '科技大厦（2021 级）'
        ]
    });
    let currentSections = {};
    switch (userSelect) {
        case '教学主楼':
            currentSections = sections.versionA;
            break;
        case '科技大厦（2018—2020 级）':
            currentSections = sections.versionB;
            break;
        case '科技大厦（2021 级）':
            currentSections = sections.versionC;
            break;
    }
    return {
        totalWeek: 20,
        startSemester: '',
        startWithSunday: false,
        showWeekend: true,
        forenoon: 4,
        afternoon: 4,
        night: 2,
        sections: currentSections
    };
}
