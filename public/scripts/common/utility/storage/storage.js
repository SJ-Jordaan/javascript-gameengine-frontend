class Storage {
    constructor(dbName, storeKey) {
        if (!window.indexedDB) {
            throw new Error("Browser does not support a stable version of IndexedDB");
        }
        this.iDBRequest = window.indexedDB(dbName, 1);
        this.dbName = dbName;
        this.storeKey = storekey;
        this.db;
        this.iDBRequest.onupgradeneeded = (event) => {
            let db = this.iDBRequest.result;
            event.target.result.createObjectStore(this.dbName);
        };

        this.iDBRequest.onsuccess = (event) => {
            this.db = event.target.result;
            this.restore();
        };

        this.results = undefined;
    }

    restore() {
        var transaction = this.db.transaction(this.dbName);
        var objectStore = transaction.objectStore(this.dbName);
        var self = this;
        var request = objectStore.get(this.storekey);
        request.onerror = (event) => {
            console.log(this.dbName + ": error reading from database, " + request.error.name);
        };

        request.onsuccess = (event) => {
            if (!request.result) {
                console.log(this.dbName + ": no saved game for " + this.storekey);
            } else {
                this.results = request.result;
            }
        };
    }

    save(data) {
        new Promise((resolve, reject) => {
            if (!this.db) {
                reject("Db not initialized");
            }

            var transaction = this.db.transaction(this.dbName, "readwrite");
            var objectStore = transaction.objectStore(this.dbName);
            var request = objectStore.put(data, this.storekey);
            request.onerror = (event) => {
                console.log(this.dbName + ": error writing to database, " + request.error.name);
            };

            request.onsuccess = (event) => {
                resolve(true);
            };
        });
    }
}

export default Storage;
