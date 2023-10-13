function formatConverter(obj) {
    const timeObj = obj.split(' ');
    if (timeObj[1] === 'AM') {
        let tempTime = Number(timeObj[0].split(':')[0]);
        return + tempTime + (Math.floor(Number(timeObj[0].split(':')[1])) / 60)
    }
    let tempTime = Number(timeObj[0].split(':')[0]) + 12;
    return tempTime + (Math.floor(Number(timeObj[0].split(':')[1])) / 60);
}

function posssibleSlots(timeObj) {
    timeObj['time_difference'] = '0 min'
    let finalSlots = [];
    const {
        time_duration,
        start_time,
        end_time,
        time_difference
    } = timeObj;
    if (!(time_difference && start_time && end_time && time_difference && time_duration)) {
        return new Error('insufficient Information');
    }

    let toatalTime = formatConverter(end_time) - formatConverter(start_time);

    let divTime = (Number(time_difference.split(' ')[0]) + Number(time_duration.split(' ')[0]));

    let slots = (toatalTime * 60) / divTime;
    function genTime(last, diff) {
        let timeStr = '';
        let endTime = '';

        let mins = Number(last.split(' ')[0].split(':')[1]);
        let slot = Number(time_duration.split(' ')[0]);

        if (diff !== undefined)
            slot += Number(time_difference.split(' ')[0]);
        let toatalMins = mins + slot;
        if (toatalMins >= 60) {
            let minStr = `${toatalMins - 60}`;
            let time1 = (Number(last.split(':')[0]) + 1) % 24;
            let timeNotation = undefined;
            if (time1 > 12) {
                timeNotation = (time1 > 12) ? 'PM' : 'AM';
            } else {
                if ((time1 == 1)) {
                    timeNotation = (last.split(' ')[1] === 'AM') ? 'PM' : 'AM';
                } else {
                    timeNotation = last.split(' ')[1];
                }
            }
            time1 = time1 > 12 ? time1 % 12 : time1;
            time1 = (String(time1).length < 2) ? ('0' + time1) : time1;;
            timeStr = `${time1}:${minStr.length > 1 ? minStr : '0' + minStr} ${timeNotation}`
            endTime = ``
        } else {
            let timeNotation = (last.split(' ')[1] !== undefined) ?
                last.split(' ')[1]
                : (Number(last.split(':')[0]) < 12) ? 'AM' : 'PM';
            timeStr = `${last.split(':')[0]}:${toatalMins} ${timeNotation}`
        }

        return timeStr;
    }
    for (let x = 0; x < Math.floor(slots); x++) {
        const startTime = Number(start_time) <= 12 ? start_time + ' AM' : start_time + ' PM';
        let start = x === 0 ? startTime : genTime(finalSlots[x - 1].starts, true)
        let end = genTime(start, undefined);
        finalSlots[x] = {
            starts: start,
            ends: end
        }
    }

    return finalSlots;
}

export { posssibleSlots }