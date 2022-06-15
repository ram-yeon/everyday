import moment from 'moment';

export const makeComma = (val) => {
    if (!val) return val;

    const regEx = /(\d)(?=(\d\d\d)+(?!\d))/g;
    val = val + '';
    return val.replace(regEx, '$1,');
};

export const addZeroAtPrefix = (val) => {
    if (val < 10) val = '0' + val;
    return val;
};

export const makeFilterOption = (m, isNumKey = false, excludeKeys = [], isReverse = false) => {
    if (!m) {
        return [];
    }

    const filterOption = [];
    for (let k in m) {
        if (!m.hasOwnProperty(k)) {
            continue;
        }

        const key = isNumKey ? Number(k) : k;
        if (excludeKeys.indexOf(key) !== -1) {
            continue;
        }

        const v = m[k];
        filterOption.push({
            name: v,
            value: key,
        });
    }

    if (isReverse) {
        filterOption.reverse();
    }

    return filterOption;
};

export const getObjectKeys = (obj, isNumKey = false) => {
    const keys = [];
    for (let k in obj) {
        if (isNumKey) {
            keys.push(Number(k));
        } else {
            keys.push(k);
        }
    }

    return keys;
};

export const extractErrorMessage = (error) => {
    if (!error) {
        return null;
    }

    const response = error.response;
    let message;
    if (undefined !== response) {
        message = error.response.data;
        if (typeof (message) === 'object') {
            message = message.message;
        }
    } else {
        message = error.message;
    }

    return message;
};

export const convertStringToDate = (str, format = "YYYY년 MM월 DD일 HH시 mm분 ss초") => {
    if (!str) {
        return str;
    }

    return moment(str).format(format);
};

export const convertStringToYYYYMMDD = (str) => {
    return convertStringToDate(str, "YYYY년 MM월 DD일");
};

export const convertStringToYYYYMM = (str) => {
    return convertStringToDate(str, "YYYY년 MM월");
};

export const convertStringToYYYYMMDDW = (str) => {
    return convertStringToYYYYMMDD(str) + " (" + convertStringToWeek(str) + ")";
};

export const convertStringToYYYYMMDDHHMI = (str) => {
    return convertStringToDate(str, "YYYY년 MM월 DD일 HH시 mm분");
};

export const convertStringToMMDD = (str) => {
    return convertStringToDate(str, "MM월 DD일");
};
export const convertStringToMM = (str) => {
    return convertStringToDate(str, "MM월");
};


export const convertStringToHHMI = (str) => {
    return convertStringToDate(str, "HH시 mm분");
};

export const convertStringToYYYYMMDDWHHMI = (str) => {
    return convertStringToYYYYMMDDW(str) + " " + convertStringToHHMI(str);
};

export const convertStringToWeek = (str) => {
    if (!str) {
        return "";
    }

    const week = moment(str).format("e");
    return convertToWeek(week)
};

export const convertToWeek = (week) => {
    switch (week) {
        case "0":
            return "일";
        case "1":
            return "월";
        case "2":
            return "화";
        case "3":
            return "수";
        case "4":
            return "목";
        case "5":
            return "금";
        case "6":
            return "토";
        default:
            return "";
    }
}

export const koToEn = (str) => {
    const ko = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅁㄴㅇㄹㅎㅋㅌㅊㅍㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣㅛㅕㅑㅗㅓㅏㅣㅠㅜㅡ";
    const en = "rRseEfaqQtTdwWczxvgASDFGZXCVkoiOjpuPhynbmlYUIHJKLBNM";

    if (en.indexOf(str) !== -1) {
        return str;
    }

    const idx = ko.indexOf(str);
    if (idx !== -1) {
        return en.charAt(idx);
    }

    return "";
};

export const queryStringToJson = (str, typeObj = {}) => {
    if (!str) {
        return {};
    }

    if (str.indexOf('?') === 0) {
        str = str.substring(1)
    }

    let json;
    try {
        json = JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    } catch (e) {
        return {};
    }

    for (let key in typeObj) {
        if (!typeObj.hasOwnProperty(key)) {
            continue;
        }

        if (!json.hasOwnProperty(key)) {
            continue;
        }

        const t = typeObj[key];
        const val = json[key];
        if (t.type === 'number') {
            if (!isNaN(val)) {
                const _val = Number(val);
                if (t.hasOwnProperty('values')) {
                    if (t.values.indexOf(_val) !== -1) {
                        json[key] = _val;
                        continue;
                    }
                } else {
                    json[key] = _val;
                    continue;
                }
            }

            if (t.hasOwnProperty('defaultValue')) {
                json[key] = t.defaultValue;
            } else {
                delete json[key];
            }
        } else if (t.type === 'boolean') {
            json[key] = val === "true"
        } else if (t.type === 'date') {
            try {
                if ("Invalid Date" === new Date(val)) {
                    delete json[key];
                } else {
                    json[key] = moment(val, 'YYYY-MM-DD');
                }
            } catch (e) {
                delete json[key];
            }
        } else {
            if (t.hasOwnProperty('values')) {
                if (t.values.indexOf(val) === -1) {
                    if (t.hasOwnProperty('defaultValue')) {
                        json[key] = t.defaultValue;
                    } else {
                        delete json[key];
                    }
                }
            }
        }
    }

    return json;
};

export const jsonToQueryString = (json) => {
    if (!json) {
        return '';
    }

    const keys = Object.keys(json);
    if (0 >= keys.length) {
        return '';
    }

    keys.sort();
    let queryString = '';
    for (let i = 0, len = keys.length; i < len; ++i) {
        const key = keys[i];
        const val = json[key];
        if (val === undefined || val === "" || val === null) {
            continue;
        }

        if (queryString.length <= 0) {
            queryString += "?";
        } else {
            queryString += "&";
        }
        queryString += key + "=" + encodeURI(val);
    }

    return queryString;
};

export const convertMinutesToHHMM = (minutes) => {
    if (!minutes) {
        return '';
    }

    const minutesPerOneHour = 60;
    const hours = Math.floor(minutes / minutesPerOneHour);
    const other = Math.floor(minutes % minutesPerOneHour);

    let str = '';
    if (hours > 0) {
        str = makeComma(hours) + "시간";
    }

    if (other > 0) {
        if (str.length > 0) {
            str += " ";
        }
        str += makeComma(other) + "분";
    }

    return str;
};

export const convertSecondsToHHMM = (seconds) => {
    if (!seconds) {
        return '0시간';
    }

    const secondsPerOneHour = 60 * 60;
    const hours = Math.floor(seconds / secondsPerOneHour);
    const other = seconds % secondsPerOneHour;

    let str = '';
    if (hours > 0) {
        str = makeComma(hours) + "시간";
    }

    if (other > 0) {
        if (str.length > 0) {
            str += " ";
        }

        const secondsPerOneMinutes = 60;
        const minutes = Math.floor(other / secondsPerOneMinutes);

        if (minutes > 0) {
            str += makeComma(minutes) + "분";
        }
    }

    if (0 >= str.length) {
        return '0시간';
    }

    return str;
};

export const convertSecondsToString = (seconds, isDay, isHour, isMinute, isSecond) => {
    if (typeof seconds !== "number" || 0 > seconds) {
        return '';
    }

    if (0 === seconds) {
        if (isSecond) {
            return "0초";
        }
        return '';
    }

    const day = Math.floor(seconds / 86400);
    let dayRemainder;
    let hourRemainder;
    let minuteRemainder;

    if (isDay) {
        dayRemainder = seconds % 86400;
    } else {
        dayRemainder = seconds;
    }

    const hour = Math.floor(dayRemainder / 3600);
    if (isHour) {
        hourRemainder = dayRemainder % 3600;
    } else {
        hourRemainder = dayRemainder;
    }

    const minute = Math.floor(hourRemainder / 60);
    if (isMinute) {
        minuteRemainder = hourRemainder % 60;
    } else {
        minuteRemainder = hourRemainder;
    }
    const second = minuteRemainder;

    let str = '';
    if (isDay && 0 < day) {
        str += day + '일'
    }

    if (isHour && 0 < hour) {
        if (str.length > 0) {
            str += ' ';
        }
        str += (hour + '시간')
    }

    if (isMinute && 0 < minute) {
        if (str.length > 0) {
            str += ' ';
        }
        str += (minute + '분')
    }

    if (isSecond && 0 < second) {
        if (str.length > 0) {
            str += ' ';
        }
        str += (second + '초')
    }

    return str;
};