exports.updatedResult = (upsertedCount, modifiedCount) => {
    return new Promise((resolve) => {
        resolve({
            modifiedCount: modifiedCount,
            upsertedCount: upsertedCount
        });
    });
}