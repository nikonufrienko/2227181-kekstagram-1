
function random_int(min, max) {// Результат: целое число из диапазона "[min...max)"
    // при min > max границы меняются местами
    let range_size = max - min;
    if (min > max) {
        return Math.floor(Math.random() * -range_size) + max;
    }
    return Math.floor(Math.random() * range_size) + min;
   
}

function check_string_length(str, max_length) { // Результат: true, если строка проходит по длине, и false — если не проходит
    return str.length <= max_length;
}
