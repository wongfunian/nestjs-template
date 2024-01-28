import * as colors from 'colors';
import * as dayjs from 'dayjs';
import * as morgan from 'morgan';

// Define a custom format function with colors
const format: morgan.FormatFn = (tokens, req, res): string => {
    const method = tokens.method(req, res);
    let status = tokens.status(req, res);
    let responseTime = tokens['response-time'](req, res);
    let methodColor;

    // Use colors to format the output
    switch (method) {
        case 'GET':
            methodColor = method.green;
            break;
        case 'POST':
            methodColor = method.blue;
            break;
        case 'PUT':
            methodColor = method.yellow;
            break;
        case 'DELETE':
            methodColor = method.red;
            break;
        default:
            methodColor = method;
    }

    if (!status) {
        status = '500';
    }

    if (Number(status) >= 500) {
        status = status.red;
    } else if (Number(status) >= 400) {
        status = status.yellow;
    } else if (Number(status) >= 300) {
        status = status.cyan;
    } else {
        status = status.green;
    }

    if (!responseTime) {
        responseTime = 'Unknown';
    }

    if (responseTime === 'Unknown' || Number(responseTime) > 5000) {
        responseTime = responseTime.red;
    }
    if (Number(responseTime) > 2000 && Number(responseTime) <= 5000) {
        responseTime = responseTime.yellow;
    }
    if (Number(responseTime) <= 2000) {
        responseTime = responseTime.green;
    }

    return colors.bold(
        ['[' + dayjs().format('DD MMM YYYY, hh:mm:ss a') + ']', methodColor, tokens.url(req, res), status, '-', responseTime, 'ms'].join(' '),
    );
};

export default format;
