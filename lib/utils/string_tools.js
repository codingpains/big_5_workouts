var digits    = "0123456789",
    lowercase = "abcdefghijklmnoprstuvxuyz",
    uppercase = lowercase.toUpperCase(),
    special   = "+/";

var base64Chars,
    base62Chars,
    base32Chars,
    generateBaseString;

base64Chars = function () {
    return [digits, lowercase, uppercase, special].join('');
}

base62Chars = function () {
    return [digits, lowercase, uppercase].join('');
}

base32Chars = function () {
    return [uppercase, digits].join('')
}

generateBaseString = function (pool, length) {
    var output = '',
        i;

    for(i = 0; i < length; i += 1) {
        output += pool[Math.ceil(((Math.random() * 1000000000000) % pool.length) || 1) - 1];
    }

    return output;
}

module.exports = {

    generateBase64String : function (length) {
        return generateBaseString(base64Chars(), length);
    },

    generateBase62String : function (length) {
        return generateBaseString(base62Chars(), length);
    },

    generateBase32String : function (length) {
        return generateBaseString(base32Chars(), length);
    },

    generateBase10String : function (length) {
        return generateBaseString(digits, length);
    }
};
