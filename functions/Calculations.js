import Moment from 'moment';
import { colorWheel } from '../themes/Themes';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import 'moment-precise-range-plugin';

const color_barUnselected = "rgba(0, 124, 146, .3)";
const color_barSelected = "rgba(234, 171, 0, .7)";
const color_barHover = "rgba(0, 124, 146, .7)";

const fmt_currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const formatCurrency = (number) => { return fmt_currency.format(number); }

const formatCurrencyNoDecimal = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

const formatNumber = (number) => { return new Intl.NumberFormat('en-US').format(number); }

const formatDate = (date, isLocalTime) => {
    if (date) {
        if (isLocalTime) {
            return Moment(date).format('M/D/YYYY');
        } else {
            return Moment.utc(date).local().format('M/D/YYYY');
        }
    }

    return '';
}

const formatDateTime = (date, isLocalTime) => {
    if (date) {
        if (isLocalTime) {
            return Moment(date).format('M/D/YYYY h:mm:ss A');
        } else {
            return Moment.utc(date).local().format('M/D/YYYY h:mm:ss A');
        }
    }

    return '';
}

const formatMonthYear = (date, isLocalTime) => {
    if (date) {
        if (isLocalTime) {
            return Moment(date).format('MMM-YY');
        } else {
            return Moment.utc(date).local().format('MMM-YY');
        }
    }

    return '';
}

const formatMonthFullYear = (date, isLocalTime) => {
    if (date) {
        if (isLocalTime) {
            return Moment.utc(date).local().format('MMM-YYYY');
        } else {
            return Moment.utc(date).format('MMM-YYYY');
        }
    }

    return '';
}

const formatQuarterYear = (date, isLocalTime) => {
    if (date) {
        if (isLocalTime) {
            return Moment.utc(date).local().format('[Q]Q-YYYY');
        } else {
            return Moment.utc(date).format('[Q]Q-YYYY');
        }
    }

    return '';
}

const formatFullYear = (date, isLocalTime) => {
    if (date) {
        if (isLocalTime) {
            return Moment.utc(date).local().format('YYYY');
        } else {
            return Moment.utc(date).format('YYYY');
        }
    }

    return '';
}

function formatDateFromNow(date, notUtc) {
    //1 hour, 5 min ago
    if (date) {
        if (notUtc) {
            return Moment(date).fromNow();
        } else {
            return Moment.utc(date).local().fromNow();
        }
    }
    return '';
}

const formatPercent = (number, places) => {
    if (number) {
        const d = places !== undefined
            ? places
            : 2;
        return number.toFixed(d) + "%";
    }

    return '';
}

const toDollars = (value) => {
    return `$${value}`;
}

const stripPhoneNumber = (string) => {
    return string.replace(/\D/g, '');
}

const formatPhoneNumber = (phone) => {
    if (phone && phone.length === 10) {
        return "(" + phone.substring(0, 3) + ") " + phone.substring(3, 6) + "-" + phone.substring(6, 11)
    } else {
        return phone;
    }
}

const sort = (array, expr, dir, sortAs) => {
    const func = sortAs === "number"
        ? numSort
        : stringSort;

    const mult = dir === "desc"
        ? -1
        : 1;

    return array.sort((a, b) => func(expr(a), expr(b)) * mult);
}

const stringSort = (a, b) => {
    const aupper = (a || "").toUpperCase();
    const bupper = (b || "").toUpperCase();

    if (aupper < bupper) return -1;
    if (aupper > bupper) return 1;
    return 0;
}

const numSort = (a, b) => {
    return a - b;
}

const sortOn = (array, expr) => {
    return array.sort((a, b) => expr(a) - expr(b));
}

const sortOnDesc = (array, expr) => {
    return array.sort((a, b) => expr(b) - expr(a));
}

const groupBy = (array, prop) => {
    return array.reduce((groups, item) => {
        const val = item[prop];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
}

const sum = (array, func) => {
    if (func === undefined) func = x => x;
    return array.reduce((total, item) => total + func(item), 0);
}

const max = (array, func) => {
    if (func === undefined) func = x => x;
    const temp = array.map(a => func(a));
    const result = Math.max(...temp);
    return result;
}

const selectMany = (array, arrFunc) => {
    let result = [];
    array.map(a => arrFunc(a).map(i => result.push(i)));
    return result;
}

const distinctValues = (array, prop) => {
    if (array === undefined) return [];
    const values = array.map(i => prop(i));
    return [...new Set(values)];
}


const hilite = (input, terms) => {
    const suggestion = input;
    const query = terms.searchText;
    const matches = match(suggestion, query)
    const parts = parse(suggestion, matches)
    const result = parts.map(
        (part, i) => !part.highlight
            ? <span key={i} >{part.text}</span>
            : <span key={i} style={{ backgroundColor: colorWheel.transYellow }}>{part.text}</span>
    )
    return result;
}

const filterOnProps = (list, terms) => {
    let result = list;
    const propNames = findPropNames(list[0]);

    for (let t = 0; t < terms.length; t++) {
        result = filterOnTerm(result, propNames, terms[t]);
    }

    return result;
}

const filterOnTerm = (list, propNames, term) => {
    //do any of the props contain the term
    const result = [];
    if (list.length === 0) return [];
    for (let i = 0; i < list.length; i++) {
        for (let p = 0; p < propNames.length; p++) {
            const compare = list[i][propNames[p]] || "";

            const includes = compare
                .toString()
                .toLowerCase()
                .includes(term.toLowerCase());

            if (includes) {
                result.push(list[i]);
                break;
            }
        }
    }

    return result;
}

const findPropNames = (obj) => {
    const propNames = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            propNames.push(prop);
        }
    }

    return propNames;
}

const emptyObject = (obj) => {
    if (obj === null) return true;
    if (obj === undefined) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

const safeProp = (obj, func) => {
    if (emptyObject(obj)) return "";
    return func(obj);
}

const emptyIfNull = (array) => {
    if (array === undefined) return [];
    return array.slice();
}

// eslint-disable-next-line
const createGuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

const withLineBreaks = (text) => {
    //test1\ntest2
    const terms = text.split("\n");
    const result = [];

    for (let i = 0; i < terms.length; i++) {
        result.push(<p key={i}>{terms[i]}</p>);
    }

    return result;
}

const countTextLines = (text, charsPerLine) => {
    text = (text || '').toString();
    const cache = localStorage.getItem(text + "/" + charsPerLine);
    if (cache !== null) return cache;

    if (text.length <= charsPerLine) return 1;

    const atext = text.split(" ");

    let lines = 1;
    let currentLineLen = 0;

    for (let i = 0; i < atext.length; i++) {
        const word = atext[i];
        if (currentLineLen + (word.length + 1) > charsPerLine) {
            console.log("---");
            lines++;
            currentLineLen = word.length;
            console.log(word + ": " + currentLineLen);
        } else {
            currentLineLen += word.length + 1;
            console.log(word + ": " + currentLineLen);
        }
    }

    localStorage.setItem(text + "/" + charsPerLine, lines);
    return lines;

}

const numericOnlyRegex = new RegExp('^\\d*$');

const checkIfObjectIsEmpty = obj => !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);

const getObjectValueFromPath = (object, path) => {
    //Path will be . delimitted
    const splitPath = path.split('.');
    const pathSegment = splitPath[0];

    if (!pathSegment || object === undefined) {
        //End condition
        return object;
    } else {
        object = object[pathSegment];
        return getObjectValueFromPath(object, splitPath.slice(1).join('.'));
    }
};

const buildObjectToPath = (object, path, value) => {
    //Path will be .delimited
    const splitPath = path.split('.');
    const pathSegment = splitPath[0];

    if (!pathSegment) {
        //All done
        return;
    }

    //If this is the last path segment then we want the value assigned to the object
    const pathValue = splitPath.length === 1 ? value : {};

    //Formik puts arrays in array[index].property format, see if there is an array value
    const arrayIndexStartPosition = pathSegment.indexOf('[');
    let nextObject = {};
    if (arrayIndexStartPosition > -1) {
        const arrayIndexEndPosition = pathSegment.indexOf(']');
        const key = pathSegment.substring(0, arrayIndexStartPosition);
        const index = pathSegment.substring(arrayIndexStartPosition + 1, arrayIndexEndPosition);

        //Push on object
        object[key] = object[key] || {};
        object[key][index] = object[key][index] || pathValue;
        nextObject = object[key][index];
    } else {
        object[pathSegment] = pathValue;
        nextObject = object[pathSegment];
    }

    //Recurse down path
    buildObjectToPath(nextObject, splitPath.slice(1).join('.'), value);
};

const includes = (obj, item) => {
    if (!obj) return false;
    if (obj.has) return obj.has(item);
    if (obj.includes) return obj.includes(item);
    return false;
}

const any = (obj) => {
    if (!obj) return false;
    if (obj.length) return obj.length > 0;
    if (obj.size) return obj.size > 0;
    return false;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const capitalizeFirstLetter = str => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateUrl = (url) => {
    // eslint-disable-next-line no-useless-escape
    var re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return re.test(String(url).toLowerCase());
}

const validatePhoneFormat = (phone) => {
    var re = /((\(\d{3}\)?)|(\d{3}-))?\d{3}-\d{4}/;
    return re.test(phone);
}

const truncateString = (input, length = 100) => {
    if (input && input.length > length)
        return input.substring(0, length);
    else
        return input;
};

const addExtension = (name, filename) => {
    const extension = filename.split(".").pop();
    if (!name) {
        return filename;
    } else if (!name.endsWith(extension)) {
        return name + "." + extension;
    } else {
        return name;
    }
};

const convertMinutes = (min) => {
    const h = min / 60 | 0;
    const m = min % 60 | 0;
    const hours = h !== 0 ? `${h} hours  ` : "";
    const minutes = m !== 0 ? `${m} minutes ` : "";

    return hours + minutes;
};

const getEndOfDayDateTime = () => {
    var start_date = Moment();
    var end_date = Moment(17, "HH"); //5:00 PM - made up end of work day time - need to make this user specific some day
    return Moment.preciseDiff(end_date, start_date, true);
}

function getDate() {
    //March 15th 2019
    return Moment().format('MMMM Do YYYY')
}

const makeCancelable = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            val => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val),
            error => hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};

const calculateEncounterTime = workOrder => {
    const { activities } = workOrder;
    const activity = activities.length ? activities[0] : null; //Cheat and only take first activity, ITS has a 1:1 relationship between work order and activity

    if (!activity || !activity.encounters.length) {
        return '';
    }

    let totalMinutes = activity.encounters.reduce((total, e) => {
        //Take entered time if it exists
        if (e.enteredTime) {
            return total + e.enteredTime;
        }

        //Ensure both start and end dates are set
        if (!e.startDate || !e.endDate) {
            return total;
        }

        //Otherwise take minutes between start and end dates
        var milliseconds = Moment(e.endDate).diff(Moment(e.startDate));
        var minutes = Math.round(Moment.duration(milliseconds).asMinutes());

        return total + minutes;
    }, 0);

    //Round to nearest 15 minutes
    totalMinutes = Math.round(totalMinutes / 15) * 15;

    //Convert to hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    //If hours and minutes are both 0 round minutes up to 15
    if (hours === 0 && minutes === 0) {
        minutes = 15;
    }

    const minuteFraction = minutes / 60;

    //Return formatted string
    return `${hours}h ${minutes}m (${hours + minuteFraction} hrs)`;
}

export {
    color_barSelected,
    color_barUnselected,
    color_barHover,
    countTextLines,
    formatDate,
    formatDateTime,
    formatCurrency,
    formatCurrencyNoDecimal,
    formatNumber,
    formatPercent,
    sortOn,
    sortOnDesc,
    groupBy,
    distinctValues,
    formatMonthYear,
    formatMonthFullYear,
    formatQuarterYear,
    formatFullYear,
    formatDateFromNow,
    toDollars,
    stripPhoneNumber,
    formatPhoneNumber,
    sum,
    max,
    hilite,
    filterOnProps,
    emptyObject,
    emptyIfNull,
    sort,
    safeProp,
    selectMany,
    createGuid,
    withLineBreaks,
    numericOnlyRegex,
    checkIfObjectIsEmpty,
    findPropNames,
    getObjectValueFromPath,
    buildObjectToPath,
    includes,
    any,
    renderCustomizedLabel,
    capitalizeFirstLetter,
    validateEmail,
    validateUrl,
    validatePhoneFormat,
    truncateString,
    addExtension,
    convertMinutes,
    getEndOfDayDateTime,
    getDate,
    makeCancelable,
    calculateEncounterTime,
};
