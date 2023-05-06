export const camelTo_ = function(str) {
    let res = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= "A" && str[i] <= "Z") {
            if (i == 0) res += str[i].toLowerCase();
            else {
                res += "-" + str[i].toLowerCase();
            }
        } else {
            res += str[i];
        }
    }
    return res;
};
