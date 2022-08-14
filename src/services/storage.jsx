function SetStore(item, value) {
    localStorage.setItem(item, value);
};

function GetStore(item) {
    return localStorage.getItem(item);
};

function RemoveStore(item) {
    localStorage.removeItem(item);
};

const Storage = { SetStore, GetStore, RemoveStore };
export default Storage;