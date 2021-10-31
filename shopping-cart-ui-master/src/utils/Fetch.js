

export const fetchData = async (url) => {
    const res = await fetch(url);
    return await {status:res.status, data: await res.json()};
};
