import Dexie from 'dexie';

const db = new Dexie('local_storage');
db.version(1).stores({
    user_info : '++id,userName,passWord,token,isAuthenticated,userIndex'


});

export default db;
