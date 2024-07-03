const nameFormat = (name: string | undefined) => {
    let result = name ? name.replace(/([A-Z])/g, ' $1') : "";
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}

export { nameFormat };