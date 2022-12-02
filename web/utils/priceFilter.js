const queryOperator = (req, query) => {
    let operator;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let type = req.query.type;
    // date 2 months ago
    var current = new Date();
    const month = new Date(current.setMonth(current.getMonth() - 2));

    if (minPrice || maxPrice) {
        if (minPrice && !maxPrice) {

            if (type === "new") {
                operator = { $and: [query, { price: { $gte: minPrice } }, { createdAt: { $gte: month } }] }

            } else if (type === "sale") {
                operator = { $and: [query, { price: { $gte: minPrice } }, { deletedPrice: { $exists: true } }] }

            } else {
                operator = { $and: [query, { price: { $gte: minPrice } }] }
            }
        } else if (maxPrice && !minPrice) {
            if (type === "new") {
                operator = { $and: [query, { price: { $lte: maxPrice } }, { createdAt: { $gte: month } }] }

            } else if (type === "sale") {
                operator = { $and: [query, { price: { $lte: maxPrice } }, { deletedPrice: { $exists: true } }] }

            } else {
                operator = { $and: [query, { price: { $lte: maxPrice } }] }

            }
        } else if (maxPrice && minPrice) {
            if (type === "new") {
                operator = { $and: [query, { price: { $gte: minPrice, $lte: maxPrice } }, { createdAt: { $gte: month } }] }

            } else if (type === "sale") {
                operator = { $and: [query, { price: { $gte: minPrice, $lte: maxPrice } }, { deletedPrice: { $exists: true } }] }

            } else {
                operator = { $and: [query, { price: { $gte: minPrice, $lte: maxPrice } }] }
            }
        }
    } else {
        if (type === "new") {
            operator = { $and: [query, { createdAt: { $gte: month } }] }

        } else if (type === "sale") {
            operator = { $and: [query, { deletedPrice: { $gt: 0 } }] }
        } else if (type === "free") {
            operator = { $and: [query, { price: 0 }] }
        } else {
            operator = query
        }
    }
    return operator;
}

export default queryOperator