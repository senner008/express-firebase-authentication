export default async function makeCall(path, payload, token) {

    const header = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
    }
    const result = await fetch(path, {
        headers: header,
        method: 'POST',
        body: JSON.stringify({data : payload})
    });
    if (result.status !== 200) {
        throw result.statusText;
    } else {
        return result.json();
    }
}

