const modifyNames = (namesObj: {string: string}) => {
    return Object.entries(namesObj).map(([abbreviation, name]) => ({
        abbreviation,
        name
    }))
};

export default modifyNames;