const fetchWithErrror = (f: Promise<Response>) =>
    f.then((response) => {
        if (!response.ok) {
            throw response;
        }
        return response;
    });
