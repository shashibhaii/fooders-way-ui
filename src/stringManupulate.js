export const CategoryConvention = (category) => {
    let finalCategory = '';
    category = category.trim().toLowerCase();
    let splitedCategory = category.split('');
    let specialCharacter = [
        ' ', '`', '~', '!', '@', '#', '$',
        '%', '^', '&', '*', '(', ')', '-',
        '=', '+', '[', ']', '{', '}', ';',
        ':', '"', '\'', '<', '>', ',', '.', '?', '/', '\\', '_'
    ];

    splitedCategory.forEach((element, index) => {
        if (!specialCharacter.includes(element)) {
            if (
                splitedCategory[index - 1] === ' ' ||
                splitedCategory[index - 1] === undefined ||
                specialCharacter.includes(splitedCategory[index - 1])
            )
                finalCategory += (' ' + element.toUpperCase());
            else
                finalCategory += element;
        } else if (specialCharacter.includes(element))
            finalCategory += '';
    });

    return finalCategory.trimStart();
};